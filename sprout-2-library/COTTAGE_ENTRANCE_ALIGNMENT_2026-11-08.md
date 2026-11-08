# Approved cottage entrance and sprite-grid review — 2026-11-08

Actual uploaded source sprites inspected at native resolution. **No gameplay or map built.**

- Cute Fantasy `House_1_Wood_Base_Blue.png`: 96×128 px. The visible door is approximately x=33..47, y=85..112 px within the source image. **Visual estimate, not a tested hitbox.** Proposed foot-level entry anchor (40,112) px.
- Wooden Interior House `wooden_interior_tileset.png`: 224×112 px (14×7 16px cells).
- Wooden Interior House `wooden_furnitures.png`: 272×192 px (17×12 16px cells).
- 16px source-grid works for sheets; multi-cell sprites require separate bounds and floor-contact anchors.
- Design proposal: doorway trigger independent of house collision; on entry, switch to indoor scene and explicit spawn/camera target, then release controls. Avoid old camera freeze/snap. Must validate in prototype after build approval.
- Private visual inspection `Project_Sprout_2_Entrance_Alignment_Review.zip` contains source-only grid sheet and measurements JSON. Do not publish art on public GitHub.
- Cute Fantasy Free's non-commercial/no-redistribution restrictions remain unresolved for public deployment. Wooden Interior House EULA is separate.

Next: establish interior spawn anchor and object footprints from original source art; gameplay and map still require explicit user approval.
