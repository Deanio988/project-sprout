# Sunnyside game-ready source index — V2.1

This index identifies **430 usable-format source entries** in `Sunnyside_World_Assets/` after excluding macOS resource forks and GameMaker project metadata. These are **not** 430 distinct finished game sprites. The detailed CSV was produced from the user's upload separately.

## Asset categories
- Terrain: `Tileset/spr_tileset_sunnysideworld_16px.png` and `Tileset/spr_tileset_sunnysideworld_forest_32px.png`
- Woodland trees and mushrooms: `Elements/Plants/` (6 animated PNG strips)
- Ambient animals: `Elements/Animals/` (7 strips including bird, duck and farm animals)
- Other props: `Elements/Other/` (5)
- Environmental effects: `Elements/VFX/` (14)
- Crops: `Elements/Crops/` (78)
- Human, goblin and skeleton animation: `Characters/` (215+)
- UI: `UI/` (100+ images)

## Prioritised integration plan
1. Inspect the forest 32px sheet against Project Sprout's existing 32px tile scale; create a **separate preview**.
2. Evaluate tree and mushroom sprite strips, including animation frame layout and transparency.
3. Evaluate VFX and animal loops for ambient woodland life.
4. Integrate only approved, game-needed sprites, with credit and source link, after visual QA and collision/camera checks.
5. Keep raw asset-pack archives out of the public repository. The creator's terms allow game use but do not clearly authorise publishing a standalone mirror.

**Attribution:** Sunnyside World by Daniel Diggle — https://danieldiggle.itch.io/sunnyside

## Current state
Metadata catalogue prepared. **No third-party binary sprite files committed**, and no live gameplay files modified.
