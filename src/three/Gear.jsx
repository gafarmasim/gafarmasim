import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { ORANGE } from './materials.js'

export function buildGearGeometry({ teeth = 12, outer = 1, inner = 0.82, depth = 0.28, hole = 0.28 } = {}) {
  const s = new THREE.Shape()
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    const pts = [
      [inner, a],
      [outer, a + step * 0.18],
      [outer, a + step * 0.42],
      [inner, a + step * 0.6],
    ]
    pts.forEach(([rad, ang], j) => {
      const x = Math.cos(ang) * rad
      const y = Math.sin(ang) * rad
      if (i === 0 && j === 0) s.moveTo(x, y)
      else s.lineTo(x, y)
    })
  }
  s.closePath()

  const hub = new THREE.Path()
  hub.absarc(0, 0, hole, 0, Math.PI * 2, false)
  s.holes.push(hub)
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2
    const p = new THREE.Path()
    p.absarc(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0.12, 0, Math.PI * 2, false)
    s.holes.push(p)
  }

  const geo = new THREE.ExtrudeGeometry(s, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 12,
  })
  geo.center()
  return geo
}

export function Gear({ color = ORANGE.color, spin = 0, ...props }) {
  const geometry = useMemo(() => buildGearGeometry(), [])
  const ref = useRef()
  useEffect(() => () => geometry.dispose(), [geometry])
  useFrame((_, dt) => {
    if (spin && ref.current) ref.current.rotation.z += spin * dt
  })
  return (
    <mesh ref={ref} geometry={geometry} {...props}>
      <meshStandardMaterial {...ORANGE} color={color} />
    </mesh>
  )
}
