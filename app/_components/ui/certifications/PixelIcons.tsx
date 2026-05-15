import type { CertificatePixelIcon } from '@/types'

type Rect = readonly [x: number, y: number, w?: number, h?: number]

const TROPHY_RECTS: readonly Rect[] = [
  [2, 1, 8, 1], [2, 2, 8, 1],
  [0, 2, 2, 1], [10, 2, 2, 1],
  [2, 3, 8, 1],
  [0, 3, 1, 2], [11, 3, 1, 2],
  [3, 4, 6, 1], [3, 5, 6, 1], [4, 6, 4, 1],
  [5, 7, 2, 1], [5, 8, 2, 1],
  [3, 9, 6, 1], [3, 10, 6, 1],
]

const CROWN_RECTS: readonly Rect[] = [
  [1, 2, 1, 1], [5, 1, 2, 1], [10, 2, 1, 1],
  [2, 3, 1, 1], [4, 3, 4, 1], [9, 3, 1, 1],
  [1, 4, 10, 1], [1, 5, 10, 1],
  [2, 6, 1, 1], [4, 6, 1, 1], [7, 6, 1, 1], [9, 6, 1, 1],
  [1, 7, 10, 1], [1, 8, 10, 1],
]

const GLOBE_RECTS: readonly Rect[] = [
  [4, 1, 4, 1],
  [2, 2, 2, 1], [8, 2, 2, 1],
  [1, 3, 2, 1], [5, 3, 2, 1], [9, 3, 2, 1],
  [1, 4, 1, 1], [11, 4, 1, 1], [5, 4, 2, 1],
  [0, 5, 12, 1],
  [1, 6, 1, 1], [11, 6, 1, 1], [5, 6, 2, 1],
  [1, 7, 2, 1], [5, 7, 2, 1], [9, 7, 2, 1],
  [2, 8, 2, 1], [8, 8, 2, 1],
  [4, 9, 4, 1],
]

const SCROLL_RECTS: readonly Rect[] = [
  [2, 1, 8, 1],
  [1, 2, 1, 8], [10, 2, 1, 8],
  [2, 3, 8, 1], [2, 5, 8, 1], [2, 7, 8, 1],
  [2, 10, 8, 1],
]

const ICON_RECTS: Record<CertificatePixelIcon, readonly Rect[]> = {
  trophy: TROPHY_RECTS,
  crown: CROWN_RECTS,
  globe: GLOBE_RECTS,
  scroll: SCROLL_RECTS,
}

interface PixelIconProps {
  name: CertificatePixelIcon
  size?: number
}

export function PixelIcon({ name, size = 60 }: PixelIconProps) {
  const rects = ICON_RECTS[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {rects.map(([x, y, w = 1, h = 1], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} />
        ))}
      </g>
    </svg>
  )
}

export function PixelRune({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block' }}
    >
      <g fill="currentColor">
        <rect x="0" y="0" width="4" height="1" />
        <rect x="0" y="1" width="1" height="4" />
        <rect x="2" y="2" width="1" height="1" />
        <rect x="3" y="3" width="1" height="1" />
        <rect x="2" y="4" width="1" height="1" />
        <rect x="1" y="3" width="1" height="1" />
      </g>
    </svg>
  )
}
