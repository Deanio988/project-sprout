# Project Sprout 2.0 — Asset Library Handoff

**START HERE for the new ChatGPT project.** This is a dedicated staging branch, not the live game's main branch.

## Current locations
- GitHub branch: https://github.com/Deanio988/project-sprout/tree/sprout-2-asset-library/sprout-2-library
- Existing asset catalogue: [../art-library/](../art-library/)
- Sunnyside World source/creator: https://danieldiggle.itch.io/sunnyside
- Original game: https://github.com/Deanio988/project-sprout (do not reuse gameplay or environment code)

## What is ready
1. Historical audit documents, asset categories and asset source paths are preserved in `art-library/`.
2. This new library provides a strict project handoff, category taxonomy, licensing notes and a reproducible audit/gallery generator.
3. A new clean project must start with the **source ZIP files**, which are **not stored in this public repository**.

## Required input archives for new chat
- `Sunnyside_World_ASSET_PACK_V2.1.zip`
- `Sunnyside_World_ARCHIVED_ASSETS.zip`
- `sunnyside_world_chatacter_anim_human_v1.0.aseprite`

The user already supplied these in the earlier chat. **A new chat may not automatically have access to those uploaded binaries**. Upload them again or attach the generated audit bundle there. GitHub currently contains catalogue documents, **not** the full source artwork.

## Workflow
1. Run `python sprout-2-library/tools/audit_assets.py --input-dir <directory-with-archives> --output-dir <local-output>`.
2. Inspect the generated CSV and thumbnail gallery, starting with terrain and forest sprites.
3. Record tile coordinates, alpha masks, sprite sheets and intended use in `SPRITE_SELECTION.md` before constructing any map.
4. Get user approval of a contact sheet and a single small scene.
5. Build the new map strictly from actual source assets. No AI-generated substitute art, procedurally drawn scenery or fabricated structures.

## Privacy and licensing
The creator's free-use terms permit game use; a complete public redistribution mirror of the raw packs has **not** been established as permitted. Keep source archives and derived full-pack thumbnail galleries private. The staging branch is public and contains only text, instructions and metadata. Credit: **Sunnyside World by Daniel Diggle**.

## Audit status
A previous local audit indexed 10,664 file entries and generated 9,614 image previews across V2.1, nested archived ZIPs and standalone source. These counts include duplicates and development files. The previous gallery was delivered as a local ZIP, **not published to GitHub**. The new project should rerun the included script on the source archives for independently reproducible results.
