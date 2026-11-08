# Project Sprout — verified asset inventory

Inventory date: 2026-11-08. File presence and sizes were checked against the GitHub repository tree; dimensions below were checked by automated PNG-header tests where noted. **No new game-ready artwork is claimed here.**

| Asset | Path | Bytes | Dimensions | Role | Status |
|---|---|---:|---|---|---|
| Woodland tile atlas | [woodland_tiles_32px.png](../sprites/woodland_tiles_32px.png) | 2,020 | 256×128 PNG (test verified) | Existing terrain atlas | Existing; rights metadata pending |
| Firefly frame 0 | [firefly_0.png](../sprites/firefly_0.png) | 182 | 32×32 PNG (test verified) | Ambient animation | Existing; rights metadata pending |
| Firefly frame 1 | [firefly_1.png](../sprites/firefly_1.png) | 183 | 32×32 PNG (test verified) | Ambient animation | Existing; rights metadata pending |
| Firefly frame 2 | [firefly_2.png](../sprites/firefly_2.png) | 183 | 32×32 PNG (test verified) | Ambient animation | Existing; rights metadata pending |
| Firefly frame 3 | [firefly_3.png](../sprites/firefly_3.png) | 183 | 32×32 PNG (test verified) | Ambient animation | Existing; rights metadata pending |
| Cottage approved exterior | [cottage_approved_640x400.png](../assets/cottage_approved_640x400.png) | 209,245 | 640×400 PNG (test verified) | Cottage art used by current game | Existing; rights metadata pending |
| Cottage SVG | [cottage-interior.svg](../assets/cottage-interior.svg) | 4,486 | 320×200 SVG (source dimensions) | Historical interior approximation | **Not referenced by current index.html** |
| Woodland study | [woodland-preview.html](../woodland-preview.html) | — | 640×400 canvas | Standalone palette/layout study | Not production atlas |
| Original prototype | [woodland-original-preview](../assets/woodland-original-preview/) | — | — | Historical design record | Not current renderer |

## Integration and rights

- The main game currently references `sprites/woodland_tiles_32px.png` and `assets/cottage_approved_640x400.png`.
- The current woodland preview draws foliage with canvas arcs, not authored pixel tiles; it must not be presented as a completed production tileset.
- No ArtStation/angrysnail artwork is included or licensed for redistribution. See [references](REFERENCES.md).
- Asset authors, licences, exact in-game draw coordinates, collision polygons, occlusion masks and source project files still need confirmation. **Pending** does not imply infringement.
- Nintendo ROM material must remain outside this public library without appropriate rights.

## Acceptance gates for replacement assets

1. Original art source and authorship recorded.
2. Pixel dimensions and tile footprints recorded.
3. Correct rendering at 640×400 and on Android.
4. Movement, collision, camera follow/explore, cottage entry/exit, pond navigation and saves tested.
5. GitHub Actions browser and deployment workflows pass.

See [woodland production specification](WOODLAND_TILESET_SPEC.md).
