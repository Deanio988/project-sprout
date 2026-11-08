# Project Sprout 2.0 — final asset validation review (2026-11-08)

**Status: candidates only; user approval pending. No map or gameplay code created.**

## Deliverable
Private conversation download: `Project_Sprout_2_Final_Asset_Validation.zip`. Contains 12 original-source mask-order contact sheets, 12 5×5 repeated-tile seam stress-test swatches, exact source tile coordinate CSV, seam-difference measurements, 10 named-sprite source-frame contact sheets, sprite metadata CSV and findings. **No copyrighted asset PNGs are committed to this public repo.**

## Verified source
`BETA Sunnyside World - Tileset_GameMaker.zip`, root `Sunnyside World - Tileset/`. Main atlas 1024×1024, 16px tiles, 64 columns. Forest atlas 320×576, 32px tiles, 10 columns. Nonzero source ID uses 1-based indexing. GameMaker autotile mask sheets preserve the source order; they are **not proof of correct adjacency**. Repeat-test seam difference is diagnostic, not a pass/fail test.

## Named source sprite evidence
| Sprite | Frames | Native frame size | Use |
|---|---:|---|---|
| `spr_deco_bird_01` | 4 | 16×16 | woodland bird candidate |
| `fish` | 1 | 11×11 | pond fish candidate (static) |
| `spr_deco_chair_01` | 1 | 10×14 | cottage chair |
| `spr_deco_sidetable_01` | 1 | 12×26 | cottage table |
| `spr_deco_rug_01` | 1 | 10×12 | interior rug |
| `water` | 1 | 13×13 | water effect candidate |
| `spr_deco_waterbowl` | 1 | 8×11 | decorative prop |
| `spr_deco_barrel_water` | 1 | 13×16 | decorative prop |
| `chimneysmoke_01` | 30 | 15×37 | ambient smoke |
| `chimneysmoke_03` | 30 | 18×21 | ambient smoke |

## Recommended approval candidates
Forest `forest_01`, Land, Paths 01–03, River, Building 01–02, Inner Walls, bird, fish, rug, chair, side table and chimney smoke. **All remain pending user approval.**

## Outstanding blockers
- 16-mask autotile **assembled adjacency** (outer/inner corners and turns) has not been fully validated. Source-order and repeated-tile tests are not sufficient.
- River tile set does not prove complete large closed pond shoreline.
- Chair/rug/table and interior walls do not prove a complete furnished cottage.
- Fish is one static source frame; wider wildlife animations not established.
- V2.1 master packs remain unavailable; licence/redistribution permission for raw art not verified.

**No map construction until the user approves the final selection and any scope adjustments.**
