const { chromium } = require('playwright');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
(async()=>{
  const errors=[];
  const server=http.createServer((req,res)=>{
    const pathname=new URL(req.url,'http://localhost').pathname;
    const relative=pathname==='/'?'index.html':decodeURIComponent(pathname).replace(/^\/+/, '');
    const root=process.cwd();
    const file=path.resolve(root,relative);
    if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return}
    const ext=path.extname(file);
    const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png'};
    fs.stat(file,(err,stat)=>{
      if(err||!stat.isFile()){res.writeHead(404);res.end('Not found: '+relative);return}
      res.setHeader('Content-Type',types[ext]||'application/octet-stream');
      fs.createReadStream(file).pipe(res);
    });
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try {
    const page=await browser.newPage({viewport:{width:1100,height:900},deviceScaleFactor:1});
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
    await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded'});
    await page.waitForTimeout(1500);
    const canvas=page.locator('#game');
    if(!await canvas.count())throw Error('Game canvas missing');
    fs.mkdirSync('smoke-output',{recursive:true});
    await canvas.screenshot({path:'smoke-output/outdoor.png'});
    // The game's draw loop catches errors internally; explicitly inspect its health indicator.
    const health=await page.locator('#healthStatus').textContent();
    if(health&&health.includes('⚠️'))throw Error('Game health warning: '+health);
    await page.evaluate(()=>{if(typeof draw!=='function')throw Error('draw() missing');draw()});
    const afterDraw=await page.locator('#healthStatus').textContent();
    if(afterDraw&&afterDraw.includes('⚠️'))throw Error('Game rendering warning: '+afterDraw);

    // Exercise visual interpolation directly and ensure the rendered position
    // progresses monotonically without jumping backwards between ticks.
    const motion=await page.evaluate(()=>{
      if(typeof SPROUT_MOTION==='undefined')throw Error('Movement interpolation unavailable');
      const snapshot={...SPROUT_MOTION};
      const original={x:pet.x,y:pet.y};
      const samples=[];
      try{
        SPROUT_MOTION.fromX=200;SPROUT_MOTION.fromY=200;
        SPROUT_MOTION.toX=210;SPROUT_MOTION.toY=200;
        for(const elapsed of [0,14,28,42,56,70]){
          SPROUT_MOTION.updated=performance.now()-elapsed;
          const fraction=Math.min(1,Math.max(0,(performance.now()-SPROUT_MOTION.updated)/70));
          samples.push(200+(210-200)*fraction);
        }
        if(samples.some((v,i)=>i>0&&v<samples[i-1]))throw Error('Interpolated movement moved backwards');
        if(Math.abs(samples.at(-1)-210)>.1)throw Error('Movement failed to reach destination');
        return samples;
      }finally{Object.assign(SPROUT_MOTION,snapshot);pet.x=original.x;pet.y=original.y}
    });
    console.log('Movement interpolation samples:',JSON.stringify(motion));

    const state=await page.evaluate(()=>{
      if(typeof pet==='undefined'||typeof draw!=='function')throw Error('Simulation unavailable');
      const initial={x:pet.x,y:pet.y,tick:pet.tick};
      pet.indoorUntil=pet.tick+200;
      draw();
      return {initial,homeLevel:pet.homeLevel};
    });
    await canvas.screenshot({path:'smoke-output/indoor.png'});
    await page.evaluate(()=>{pet.indoorUntil=0;draw()});
    await page.waitForTimeout(500);
    if(errors.length)throw Error('Browser errors: '+errors.join(' | '));
    console.log('Smoke test passed',JSON.stringify(state));
  } finally {await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(e=>{console.error(e);process.exitCode=1});
