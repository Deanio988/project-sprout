# Canonical asset categories

Use these categories for every file, recording **source archive and exact internal path**. Archive entries are not necessarily unique sprites.

| ID | Category | Scope | First-priority |
|---|---|---|---|
| 01 | Terrain & Tilesets | Grass, ground, path, shore, cliff, water, tile atlases | Yes |
| 02 | Buildings & Structures | Cottage, roof, wall, doors, windows, fences, bridges | Yes |
| 03 | Trees & Vegetation | Trees, canopy, shrubs, flowers, mushrooms, reeds | Yes |
| 04 | Crops & Farming | Plots, plants, crops, harvest animations | Later |
| 05 | Animals & Wildlife | Birds, waterfowl, animals, idle and walk loops | Later |
| 06 | Effects & Animation | Fireflies, water, weather, environmental effects | Later |
| 07 | Props & Objects | Rocks, logs, signs, furniture, decorations | Yes |
| 08 | UI & Icons | Buttons, HUD, inventory, indicators | Later |
| 09 | Characters | Human/other character animations | Later |
| 10 | Editable Source Files | Aseprite, PSD and layered project art | Source only |
| 11 | GameMaker Project Files | .yy/.yyp scaffolding and references | Exclude from game assets |
| 12 | Other Images | Unclassified sprites; manually triage | Review |
| 13 | Other / Metadata | .DS_Store, platform metadata, documentation | Exclude |

## Important classification limitation
The historical audit used filename/path heuristics, so many sprites appear in **Other Images** and **Terrain & Tilesets**. A complete *semantic* audit still requires examining sprite content, not just counting files.

## Per-asset approval record
For each selected sprite record: archive, internal path, pixel dimensions, frame dimensions/count, sprite coordinates, transparency/background, intended layer, collision footprint, license/provenance, approved yes/no.

## Required environment rendering layers
1. Ground base
2. Ground transitions and paths
3. Water / shoreline
4. Low foliage and props
5. Solid trunks / walls / collisions
6. Spriglet and wildlife
7. Upper canopies / foreground occlusion
8. Ambient animation and lighting (only if sourced or implemented as non-art rendering)
