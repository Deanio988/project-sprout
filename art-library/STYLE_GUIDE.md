# Project Sprout — Woodland visual style guide

## Art direction

Cosy, storybook, top-down pixel-art woodland. The reference artist is inspiration only; all production sprites should be original. Preserve the game's 32px tile system while allowing larger multi-tile trees and buildings.

## Working palette (hex; proposed, not mandatory)

| Role | Hex |
|---|---|
| Dark outline | `#443955` |
| Deep foliage | `#1B6874` |
| Teal foliage | `#267E83` |
| Sage canopy | `#8C9F85` |
| Canopy highlight | `#AEB69A` |
| Clearing grass | `#79A99B` |
| Warm path | `#CF927F` |
| Path shadow | `#AE756F` |
| Roof blue | `#769DBB` |
| Roof shadow | `#60547C` |
| Timber | `#B77F70` |

## Technical constraints

- World logical tile: 32 × 32 px; scenery may span multiple tiles.
- Nearest-neighbour scaling only; no bilinear smoothing.
- Distinguish render footprint from collision footprint for tall canopies and roofs.
- Maintain player visibility at tree bases, doors and narrow paths.
- Trees: asymmetric canopy clusters, 2–4 tonal layers, readable trunks.
- Paths: tileable edges with irregular border overlays, without breaking traversal.
- Props: sparse, clustered and intentionally placed; avoid uniform noise.
- Cottage: keep the existing entrance coordinate and indoor transition unless intentionally migrated.
- Check camera follow, free exploration, cottage occlusion and interior exit after each visual change.

## Suggested implementation order

1. Tileable ground, paths and edge transitions.
2. Large layered trees, canopy occlusion and woodland boundary.
3. Cottage roof, walls, entrance and exterior props.
4. Small vegetation, stones, mushrooms and logs.
5. Interior, creature scaling, weather and animation polish.

## Acceptance criteria

The map reads clearly at native resolution, tile seams are hidden, Spriglet remains visible, movement and camera are unchanged, and all new files have recorded provenance.
