# Sunnyside World — comprehensive inventory index

The uploaded Sunnyside World archives and standalone Aseprite file were scanned on 2026-11-08, including ZIP files nested inside the archived collection.

## Inventory results
- **10,642 file entries** catalogued (including nested archives; entries are not all distinct art assets).
- **9,505 PNG**, **109 GIF**, **17 Aseprite**, **7 PSD**, **992 GameMaker .yy**, **3 .yyp**, and **9 nested ZIP** entries.
- Image dimensions were extracted where possible; paths and uncompressed sizes were recorded.
- A full searchable CSV catalogue was generated for the user separately; this repository index does not contain the uploaded binary sprites.

## Rights and publication status
The user reports the files were distributed as free-to-use and that they donated to the artist. **The actual licence text has not yet been provided or verified.** Permission to use sprites in a game is not necessarily permission to redistribute all original sprites as a public standalone asset library.

For that reason, **none of the third-party binary files have been uploaded to this public GitHub repository**. This is an inventory and staging record, not a completed import.

## Proposed library structure once redistribution rights are confirmed
- `art-library/vendor/sunnyside/v2.1/tilesets/`
- `art-library/vendor/sunnyside/v2.1/elements/`
- `art-library/vendor/sunnyside/v2.1/characters/`
- `art-library/vendor/sunnyside/v2.1/ui/`
- `art-library/vendor/sunnyside/v2.1/vfx/`
- `art-library/vendor/sunnyside/archive/`
- `art-library/vendor/sunnyside/sources/`

Do not include macOS `__MACOSX` resource forks or GameMaker project scaffolding unless explicitly needed. Preserve attribution, version and licence files with any future permitted imports.

## Next gate
Obtain the creator's original download page or licence terms and verify whether redistributing raw art in a public GitHub repository is permitted. If it is not, keep the source packs private and only commit permitted derivative/game-bundled assets.
