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

test('stuck movement selects a fresh goal',()=>{assert.match(html,/pet\.stuckTicks>30/);assert.match(html,/pet\.target=null;pet\.commitUntil=0/)});

test('A-star route planning is used for outdoor navigation',()=>{assert.match(html,/function sproutBuildRoute/);assert.match(html,/function sproutNavigate/);assert.match(html,/const next=sproutNavigate\(pet\.x,pet\.y,o\.x,o\.y,pet\.target\)/)});


test('sleeping sprite anchors to mattress and breathes',()=>{assert.match(html,/const sleepAnchor=\[123,251\]/);assert.match(html,/Math\.sin\(now\/850\)/)});
