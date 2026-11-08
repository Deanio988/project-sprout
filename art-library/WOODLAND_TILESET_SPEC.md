# Woodland tileset — production specification (planning only)

## Objective
Produce an **original** woodland tileset for Project Sprout inspired by the mood and craftsmanship of the approved references, without copying third-party images. Existing main game is preserved until visual and gameplay acceptance.

## Scale and architecture
- World uses 32px logical tiles; current terrain renderer also stamps 16px subtiles.
- Base atlas currently 256×128, divided into 32×32 source tiles.
- Keep pixel edges crisp; nearest-neighbour display.
- Larger scenery (trees, cottage, props) may occupy multiple tiles.
- Keep visual footprint, collision footprint and canopy occlusion as separate data.

## Asset batches

| Batch | Content | Target |
|---|---|---|
| A | Grass base, 3–4 sparse variants, earth path centre/edges/corners, worn transition | Seamless ground and path readability |
| B | Canopy clusters, trunks, roots, forest edge, leaf-shadow overlays | Organic woodland boundary and navigable gaps |
| C | Cottage roofing, wall trim, window, door, steps, chimney | Clear entrance silhouette at native resolution |
| D | Mushrooms, stones, log piles, ferns, flowers, signposts, stumps | Environmental detail without visual noise |
| E | Weather, light, fireflies, interaction cues and creature occlusion | Cohesive day/night polish |

## Visual rules
- Muted sage and teal greens; blue-lavender roof; warm earthen paths; deep purple-grey outlines.
- Prefer stepped, asymmetrical clusters of pixel shapes to smooth circles.
- Limit each material to a small coherent value ramp (typically 3–5 tones).
- Avoid repeated checkerboard grass, evenly spaced trees and hard rectangular paths.
- Keep a clear playable foreground and readable Spriglet silhouette.

## Validation
- Verify source file dimensions, transparency, pixel alignment, and atlas indexing.
- Screenshot day/night, pond approach, cottage door, indoor/outdoor transition and camera explore.
- Confirm that large trees cannot visually or physically trap Spriglet.
- Record each produced sprite's authorship, file, licence, tile size, collision bounds and integration state in the manifest.
- Only switch main game rendering after a separate approved preview and passing regressions.

## Rights
ArtStation work is visual reference only. Do not download or commit third-party portfolio art without explicit licence or permission.
