import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { STEEL } from './materials.js'

/**
 * Combination wrench: open-end head on top, ring end (hex hole) at the bottom.
 * The silhouette is drawn as a single 2D outline and extruded.
 */
export function buildWrenchGeometry() {
  const r1 = 0.36 // open-end head radius
  const c1y = 0.75
  const w = 0.11 // half width of handle and jaw opening
  const r2 = 0.3 // ring end radius
  const c2y = -0.95

  const dy1 = Math.sqrt(r1 * r1 - w * w)
  const dy2 = Math.sqrt(r2 * r2 - w * w)
  const a1 = Math.atan2(dy1, w)
  const a2 = Math.atan2(dy2, w)

  const s = new THREE.Shape()
  s.moveTo(-w, c1y + dy1) // top-left of the jaw opening
  s.lineTo(-w, c1y + 0.05) // jaw bottom
  s.lineTo(w, c1y + 0.05)
  s.lineTo(w, c1y + dy1)
  s.absarc(0, c1y, r1, a1, -a1, true) // right side of the head
  s.lineTo(w, c2y + dy2) // right edge of the handle
  s.absarc(0, c2y, r2, a2, Math.PI - a2, true) // around the ring end
  s.lineTo(-w, c1y - dy1) // left edge of the handle
  s.absarc(0, c1y, r1, Math.PI + a1, Math.PI - a1, true) // left side of the head
  s.closePath()

  // hexagonal hole in the ring end
  const hole = new THREE.Path()
  const hr = 0.16
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6
    const x = Math.cos(a) * hr
    const y = c2y + Math.sin(a) * hr
    if (i === 0) hole.moveTo(x, y)
    else hole.lineTo(x, y)
  }
  hole.closePath()
  s.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 24,
  })
  geo.center()
  return geo
}

export function Wrench(props) {
  const geometry = useMemo(() => buildWrenchGeometry(), [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return (
    <mesh geometry={geometry} {...props}>
      <meshStandardMaterial {...STEEL} />
    </mesh>
  )
}
