# Project Sprout 2.0 — additional source inspection

**Status:** approval pending. No map/gameplay code created.

Nine **source atlas-region panels** (Land, Paths 01–03, River, Forest, Building 01–02, Inner Walls) have been generated privately from the exact uploaded GameMaker source PNGs. These preserve original pixels and show contiguous source-atlas regions, **not proven assembled autotile joins**. The private ZIP is supplied in the conversation and intentionally not uploaded to public GitHub.

## Newly identified named sprites
In `BETA Sunnyside World - Tileset_GameMaker.zip`, under `Sunnyside World - Tileset/sprites/`:
- `spr_deco_bird_01/` — bird animation/frame candidates
- `fish/` — fish sprite candidate
- `spr_deco_chair_01/` — chair furniture candidate
- `spr_deco_sidetable_01/` — side table furniture candidate
- `water/` — separate water sprite candidate

These **correct earlier statements** that wildlife and furniture were wholly unconfirmed. They demonstrate available *individual* animal/furniture assets, not a complete wildlife system or a complete furnished cottage interior.

## Outstanding quality gate
- Decode the GameMaker 16-mask auto-tiling bit order and construct small **technical join swatches** (not a map) to verify inner/outer corners, bends, banks, and forest edges.
- Inspect the named bird/fish/chair/table PNG frames and animation metadata visually before approving.
- Determine whether River autotiles can close into a large pond; do not assume so.
- Determine whether all cottage interior furnishings, floors and walls are present; a chair and side table are insufficient.
- All asset choices remain unapproved by the user.
