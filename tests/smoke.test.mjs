import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('index.html','utf8');
const brain=readFileSync('ai/brain.js','utf8');
const worker=readFileSync('backend/worker.js','utf8');
const chat=readFileSync('chat.js','utf8');
test('visible version matches document title',()=>{const title=html.match(/<title>Project Sprout v([^<]+)/)?.[1];const heading=html.match(/<h1>[^<]*<small>v([^<]+)/)?.[1];assert.equal(title,heading)});
test('AI requests guard against stale completions',()=>{assert.match(html,/generation!==\(this\.generation\|\|0\)/);assert.match(html,/Decision could not be executed/)});
test('mobile model preflight is disabled',()=>assert.match(brain,/Local AI is paused on mobile/));
test('location-specific decisions enforced',()=>assert.match(brain,/validateForState/));
test('cloud worker requires rate limit binding',()=>assert.match(worker,/!env\.RATE_LIMITER/));
test('save export and import are present',()=>{assert.match(html,/exportSave/);assert.match(html,/importSave/)});
test('speech bubble anchor clamped',()=>assert.match(chat,/Math\.max\(125,Math\.min\(515,a\.x\)\)/));

test('live AI decisions are rechecked against current location',()=>assert.match(html,/Decision outdated after location change/));
test('Worker exports a single valid handler closure',()=>assert.match(worker,/\}\};\s*$/));
test('saved state is checked for finite coordinates and tick',()=>assert.match(html,/Invalid saved state/));
test('AI decision adapter rejects mismatched locations',()=>assert.match(brain,/Action unavailable in current location/));

test('outdoor movement uses conservative tree avoidance',()=>{assert.match(html,/function sproutNavigate/);assert.match(html,/const next=sproutNavigate\(pet\.x,pet\.y/)});

test('collision uses the same forest positions as renderer',()=>assert.match(html,/for\(const \[tx,ty\] of SPROUT_FOREST_POSITIONS\)/));
test('sleeping creature snaps to bed station',()=>assert.match(html,/if\(sleeping\)\{motion\.x=sleepAnchor\[0\]/));

test('stuck movement selects a fresh goal',()=>{assert.match(html,/pet\.stuckTicks>20/);assert.match(html,/pet\.target=null;pet\.commitUntil=0/)});

test('A-star route planning is used for outdoor navigation',()=>{assert.match(html,/function sproutBuildRoute/);assert.match(html,/function sproutNavigate/);assert.match(html,/const next=sproutNavigate\(pet\.x,pet\.y,destination\.x,destination\.y,pet\.target\)/)});


test('sleeping sprite anchors to mattress and breathes',()=>{assert.match(html,/const sleepAnchor=\[125,251\]/);assert.match(html,/Math\.sin\(now\/850\)/)});

test('indoor route recovers from mattress collision and stalled walking',()=>{assert.match(html,/if\(!sleeping&&blocked\(motion\.x,motion\.y\)\)/);assert.match(html,/motion\.still>45/);assert.match(html,/bed:\[205,320\]/)});

test('approved cottage never draws standing Spriglet while sleeping',()=>{assert.match(html,/else if\(!sleeping\)\{/);assert.match(html,/if\(sleeping && !cottageAsset\.ready\)/);assert.doesNotMatch(html,/ctx\.rotate\(-Math\.PI\/2\)/)});

test('cottage uses reusable native pixel tile atlas',()=>{assert.match(html,/atlas\.width=64;atlas\.height=16/);assert.match(html,/const tile=\(id,x,y\)=>g\.drawImage\(atlas/)});

test('cottage furniture uses a unified pixel sprite atlas',()=>{assert.match(html,/furniture\.width=256;furniture\.height=160/);assert.match(html,/const stamp=\(sx,sy,w,h,x,y\)=>g\.drawImage\(furniture/);assert.match(html,/stamp\(64,0,64,80,29,76\)/)});

test('approved cottage layout has central rug, dining stools and bottom doorway',()=>{assert.match(html,/Alpha 56: composition based on the approved cosy cabin concept/);assert.match(html,/Four stools and a central oak table/);assert.match(html,/Bottom doorway and mat/)});

test('indoor stuck recovery chooses a nearby walkable grid cell rather than teleporting to the bed',()=>{
 assert.match(html,/if\(!sleeping&&blocked\(motion\.x,motion\.y\)\)\{const safe=nearest\(motion\.x,motion\.y\)/);
 assert.match(html,/if\(motion\.still>45\)\{motion\.routeKey='';motion\.route=\[\];motion\.still=0;const safe=nearest\(motion\.x,motion\.y\)/);
 assert.doesNotMatch(html,/motion\.still=0;motion\.x=205;motion\.y=320/);
});

test('indoor activity destinations are projected to walkable cells',()=>{
 assert.match(html,/const targetCell=nearest\(destination\[0\],destination\[1\]\)/);
 assert.match(html,/if\(targetCell>=0\)destination=\[px\(targetCell%cols\),py\(Math\.floor\(targetCell\/cols\)\)\]/);
});
test('indoor route is recalculated only when the goal changes or recovery clears it',()=>{
 assert.match(html,/if\(!sleeping&&\(motion\.routeKey!==indoorRouteKey\)\)\{/);
 assert.doesNotMatch(html,/motion\.routeKey!==indoorRouteKey\|\|!motion\.route/);
});

test('restored original woodland sprites are referenced by the outdoor renderer',()=>{
 assert.match(html,/sprites\/woodland_tiles_32px\.png/);
 assert.match(html,/sprites\/firefly_'\+i\+'\.png/);
 assert.match(html,/if\(night\)\{const frame=SPROUT_FIREFLY_FRAMES/);
 assert.match(html,/frame\.complete&&frame\.naturalWidth===32/);
});

test('alpha 72 outdoor terrain uses restored original atlas with fallback and cache refresh',()=>{
 assert.match(html,/SPROUT_WOODLAND_ATLAS\.naturalWidth===256&&SPROUT_WOODLAND_ATLAS\.naturalHeight===128/);
 assert.match(html,/ctx\.drawImage\(SPROUT_WOODLAND_ATLAS,0,0,32,32,x,y,16,16\)/);
 assert.match(html,/else ctx\.drawImage\(sproutArtTile\(h%9===0\?'grassDetail':'grass',night\),x,y\)/);
 assert.match(html,/SPROUT_WOODLAND_ATLAS\.onload=\(\)=>\{SPROUT_TERRAIN_CACHE\.day=null;SPROUT_TERRAIN_CACHE\.night=null\}/);
});

test('alpha 73 avoids checkerboard by using a single grass base tile',()=>{
 assert.doesNotMatch(html,/const atlasTile=woodlandTileHash\(Math\.floor\(tx\/2\),Math\.floor\(ty\/2\)\)%4/);
 assert.match(html,/if\(h%17===0&&woodlandPathDistance\(x\+8,y\+8\)>32\)/);
});

test('alpha 74 woodland expansion keeps world, camera and navigation bounds aligned',()=>{
 assert.match(html,/WOOD_TILE=16,WOOD_COLS=80,WOOD_ROWS=50/);
 assert.match(html,/SPROUT_NAV_CELL=20,SPROUT_NAV_COLS=60,SPROUT_NAV_ROWS=35/);
 assert.match(html,/x>1245\|\|y<48\|\|y>765/);
 assert.match(html,/WOOD_COLS\*WOOD_TILE-640,visualX-320/);
 assert.match(html,/WOOD_ROWS\*WOOD_TILE-400,visualY-200/);
 assert.match(html,/layer\.width=WOOD_COLS\*WOOD_TILE;layer\.height=WOOD_ROWS\*WOOD_TILE/);
 assert.match(html,/for\(let x=-25;x<=1300;x\+=45\)/);
});





test('alpha 77 minimap is collapsible and displays world markers without changing simulation state',()=>{
 assert.match(html,/id="toggleMinimap"/);
 assert.match(html,/id="woodlandMinimap" hidden/);
 assert.match(html,/function sproutDrawMinimap\(\)/);
 assert.match(html,/o\.type==='large pond'/);
 assert.match(html,/SPROUT_CAMERA\.x\?\?/);
 assert.match(html,/sproutDrawMinimap\(\);\}function animationFrame/);
});





test('alpha 80 encourages pond discovery without overriding survival needs',()=>{
 assert.match(html,/o\.type==='large pond'&&pet\.hunger>=65&&pet\.energy>=65&&pet\.curiosity>=45/);
 assert.match(html,/visits===0\?Math\.min\(75,28\+pet\.curiosity\*\.47\):visits<3\?18:0/);
 assert.match(html,/'large pond':'Exploring the pond shoreline'/);
 assert.match(html,/let destination=o\.type==='large pond'\?sproutPondApproach/);
});



// Removed minor water landmarks must not silently return during woodland changes.
test('woodland retains only the main wildlife pond',()=>{
 const landmarks=html.match(/const objects=\[([\s\S]*?)\],key=/)?.[1];
 assert.ok(landmarks,'woodland landmark definitions found');
 assert.equal((landmarks.match(/type:'large pond'/g)||[]).length,1);
 assert.doesNotMatch(landmarks,/type:'(?:pond|spring)'/);
});





test('alpha 86 shoreline rendering and collision share one tile mask',()=>{
 assert.match(html,/function sproutPondWaterTile\(tx,ty\)/);
 assert.match(html,/function sproutPondNavigationWater\(x,y\)/);
 assert.match(html,/const water=\(cx,cy\)=>sproutPondWaterAt\(cx,cy\)/);
 assert.match(html,/if\(sproutPondNavigationWater\(x,y\)\)return true/);
});
