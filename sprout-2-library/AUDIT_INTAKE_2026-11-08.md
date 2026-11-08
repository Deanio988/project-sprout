# Project Sprout 2.0 — Phase 1 Audit Intake (2026-11-08)

**Status: inventory generated locally; visual approval pending. No map/gameplay work authorised.**

## Audit scope
The new chat supplied 9 ZIP archives plus 1 PSD and 1 GIF. The audit captured 4,403 file entries, including 3,748 readable PNG/GIF/etc images and 1,544 distinct readable image-content hashes. Some entries represent exported GameMaker sprite frames, duplicates, or development metadata. Archive directory names, SHA-256, dimensions, preliminary categories and inferred animation frames were captured in a local CSV.

The **private downloadable audit bundle** supplied in the conversation contains `inventory.csv`, `audit_summary.json`, and 43 complete visual contact sheets covering all 1,544 distinct images. **It is intentionally not committed to this public repository**, because licensing for redistributing full third-party sprite previews has not been verified.

## Sources examined
- `BETA Sunnyside World - Tileset_GameMaker.zip`
- `Sunnyside World_Tileset_Beta (1).zip`
- `SUNNYSIDE_WORLD_ASSETS_V0.2.zip`
- `SUNNYSIDE_WORLD_BUILDINGS_V0.01.zip`
- `SUNNYSIDE_WORLD_CHARACTERS_PARTS_V0.3.1.zip`
- `SUNNYSIDE_WORLD_CHARACTERS_V0.3.1.zip`
- `SUNNYSIDE_WORLD_CHIMNEYSMOKE_v1.0.zip`
- `SUNNYSIDE_WORLD_CROPS_V0.01 (1).zip`
- `SUNNYSIDE_WORLD_GOBLIN_V0.1 (1).zip`
- `SunnysideWorld_TILESET_V0.2_WORK-IN-PROGRESS-NOT-COMPLETE.psd`
- `leaves_hit (1).gif`

## Critical source gap
Previous handoff describes `Sunnyside_World_ASSET_PACK_V2.1.zip`, `Sunnyside_World_ARCHIVED_ASSETS.zip`, and `sunnyside_world_chatacter_anim_human_v1.0.aseprite`. These were **not** among the uploaded files in this chat. Therefore these counts are not a full V2.1-master-pack audit.

## Known atlas candidates
- Beta GameMaker: `sprites/spr_tileset_sunnysideworld/...png` (1024×1024); `tilesets/tileset_sunnysideworld/output_tileset.png` (1280×1280)
- Beta standalone: `Sunnyside World/spr_tileset_sunnysideworld.png` (1024×1024)
- Older v0.1: `TILESET/SunnysideWorld_Tileset_V0.1.png` (1024×1024)
- Buildings v0.01: `SUNNYSIDE_WORLD_BUILDINGS_V0.01.png` (640×640)

## Audit follow-up before approval
1. Refine category assignments manually, especially UUID-named GameMaker frames and unclassified files.
2. Verify the atlas grid from GameMaker tileset metadata, precise sprite rectangles, edge joins, transparent margins, and animation timelines.
3. Confirm licence/redistribution scope from the creator.
4. Review the actual contact sheets and record approval in `SPRITE_SELECTION.md`.
5. Obtain the missing V2.1 master and archived packs if complete coverage is required.

**Do not generate a map or reuse the old game's sprite rendering code.**
