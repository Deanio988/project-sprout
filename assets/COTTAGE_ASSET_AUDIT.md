# Cottage art asset audit — alpha.58 preparation

This file records the actual available source resources and prevents future claims that placeholder drawings are extracted assets.

## Verified local inputs (not yet uploaded to this repository)
- `SoulSilver_environment_texture_review.zip`: 227 decoded Nintendo texture previews, with `inventory.csv`, 230 archive entries total. The README explicitly warns that categories are heuristic, and the files are **not** complete furniture sprites or licensed for redistribution.
- `SoulSilver_model_texture_atlas.zip`: additional extracted model/texture references, not verified as ready-to-place room tiles.
- `Project_Sprout_original_woodland_assets.zip`: original project artwork, including `sprites/woodland_tiles_32px.png` and four firefly frames.
- `pixel_art_top_down_pokémon_style_interior_like_so.png`: user-approved cottage concept illustration, 1448×1086. This is the **approved** target art, not the simplified `assets/cottage-interior.svg`.

## Current published implementation
- `assets/cottage-interior.svg` is a hand-authored vector approximation. It is **not** sourced from the ROM or approved illustration.
- The game loads that SVG for the cottage in alpha.57; the old procedural room remains as fallback.
- No extracted SoulSilver texture is loaded by the public game. Do not claim otherwise.

## Integration requirements
1. Produce a game-resolution background image from the **approved illustration**, preserving proportions and visible layout; publish it as a separate image asset.
2. Separate foreground occlusion layers and collision polygons from background artwork.
3. Map sleeping pose and indoor waypoints to the actual asset coordinates.
4. Verify the game loads the published image via browser network requests and compare screenshots against the approved illustration.
5. Do not distribute Nintendo-owned texture files in this public repository without permission. Use them only as visual and technical references.
