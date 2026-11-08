# Project Sprout — Art & Asset Library

Central catalogue for the game's original artwork, reusable assets, visual direction and third-party references. Existing game paths remain unchanged to avoid breaking the application.

## Quick links

| Category | Current source | Status |
|---|---|---|
| Woodland tile atlas | [woodland_tiles_32px.png](../sprites/woodland_tiles_32px.png) | Existing game asset; provenance to verify |
| Cottage exterior | [cottage_approved_640x400.png](../assets/cottage_approved_640x400.png) | Existing approved concept; provenance to verify |
| Cottage interior | [cottage-interior.svg](../assets/cottage-interior.svg) | Existing artwork; provenance to verify |
| Firefly animation | [sprites](../sprites/) (firefly_0–3.png) | Existing animation; provenance to verify |
| Woodland art study | [woodland-preview.html](../woodland-preview.html) | Original code-based style experiment |
| Historic woodland prototype | [woodland-original-preview](../assets/woodland-original-preview/) | Archived reference |
| Cottage audit | [COTTAGE_ASSET_AUDIT.md](../assets/COTTAGE_ASSET_AUDIT.md) | Existing asset notes |
| Main game | [index.html](../index.html) | Live application; do not replace blindly |

## Library sections

- [Visual style guide](STYLE_GUIDE.md): palette, scale, terrain, architecture and quality rules.
- [Reference catalogue](REFERENCES.md): external artists and inspiration, with licensing cautions.
- [Asset manifest](ASSET_MANIFEST.md): verified paths, dimensions, file sizes and verification status.
- [Woodland tileset specification](WOODLAND_TILESET_SPEC.md): original production asset batches and acceptance criteria.

## Working rules

1. Keep game-ready assets separate from third-party inspiration.
2. Do not download, trace, extract, or commit third-party portfolio artwork without permission or a compatible licence.
3. Record author, source, licence, dimensions, tile scale and usage for every new asset.
4. Build original tiles and sprites at a consistent logical pixel grid; keep nearest-neighbour rendering.
5. Preserve movement, camera, collision, indoor transitions and saved progress when replacing art.
6. Add new approved artwork under `assets/` or `sprites/` and update the manifest. Use the library as a catalogue rather than duplicating binaries.

## Planned collections

Woodland terrain; canopy and trunks; pathways; undergrowth; cottage exterior and interior; props; creatures; particles and weather; UI and speech bubbles. These are planned categories, **not** claims that finished assets already exist.
