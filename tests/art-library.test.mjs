import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');
const html=read('index.html'),preview=read('woodland-preview.html');
const manifest=read('art-library/ASSET_MANIFEST.md');
const references=read('art-library/REFERENCES.md');
const style=read('art-library/STYLE_GUIDE.md');
test('art library and original game assets exist',()=>{
 for(const p of ['art-library/README.md','art-library/REFERENCES.md','art-library/STYLE_GUIDE.md','art-library/ASSET_MANIFEST.md','sprites/woodland_tiles_32px.png','sprites/firefly_0.png','sprites/firefly_1.png','sprites/firefly_2.png','sprites/firefly_3.png','assets/cottage_approved_640x400.png','assets/cottage-interior.svg','woodland-preview.html'])assert.ok(existsSync(p),p);
});
test('woodland atlas has expected PNG dimensions 256x128',()=>{
 const b=readFileSync('sprites/woodland_tiles_32px.png');
 assert.equal(b.subarray(1,4).toString(),'PNG');
 assert.equal(b.readUInt32BE(16),256);assert.equal(b.readUInt32BE(20),128);
});
test('firefly animation frames are 32px PNG images',()=>{
 for(let i=0;i<4;i++){const b=readFileSync('sprites/firefly_'+i+'.png');assert.equal(b.readUInt32BE(16),32);assert.equal(b.readUInt32BE(20),32)}
});
test('cottage artwork PNG is 640x400',()=>{
 const b=readFileSync('assets/cottage_approved_640x400.png');
 assert.equal(b.readUInt32BE(16),640);assert.equal(b.readUInt32BE(20),400);
});
test('library references are documented without embedding third-party art',()=>{
 assert.match(references,/angrysnail\.artstation\.com/);
 assert.match(references,/reference only/i);
 assert.match(manifest,/Rights verification/);
 assert.match(style,/32 × 32 px/);
});
test('preview keeps a 640x400 canvas and accessible interior return',()=>{
 assert.match(preview,/id="world" width="640" height="400"/);
 assert.match(preview,/if\(inside\)\{inside=false;draw\(\)\}/);
 assert.match(preview,/x\.imageSmoothingEnabled=false/);
});
test('main game still references original atlas and approved cottage image',()=>{
 assert.match(html,/sprites\/woodland_tiles_32px\.png/);
 assert.match(html,/assets\/cottage_approved_640x400\.png/);
 assert.match(html,/ctx\.imageSmoothingEnabled=false/);
});
test('main game preserves camera, save, cottage and route controls',()=>{
 for(const id of ['cameraExplore','cameraFollow','cameraPond','exportSave','importSave'])assert.ok(html.includes('id="'+id+'"'),id);
 for(const term of ['function sproutNavigate','function sproutBuildRoute','indoorUntil'])assert.ok(html.includes(term),term);
});
