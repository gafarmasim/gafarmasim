import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { ORANGE, RUBBER, STEEL, DARK_STEEL, GLASS } from './materials.js'

function Wheel({ position, speed = 1.2 }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y -= speed * dt
  })
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <group ref={ref}>
        {/* tyre */}
        <mesh>
          <cylinderGeometry args={[0.38, 0.38, 0.3, 28]} />
          <meshStandardMaterial {...RUBBER} />
        </mesh>
        {/* rim */}
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.32, 24]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
        {/* dark recess + spokes */}
        <mesh>
          <cylinderGeometry args={[0.21, 0.21, 0.33, 24]} />
          <meshStandardMaterial color="#0f1114" roughness={0.8} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} rotation={[0, (i / 5) * Math.PI, 0]}>
            <boxGeometry args={[0.42, 0.34, 0.06]} />
            <meshStandardMaterial {...STEEL} />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.36, 12]} />
          <meshStandardMaterial {...DARK_STEEL} />
        </mesh>
      </group>
    </group>
  )
}

/** Side profile of the cabin (slanted windshield + rear window), extruded along Z. */
function useCabinGeometry() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1.08, 0)
    shape.lineTo(0.88, 0)
    shape.lineTo(0.42, 0.62)
    shape.lineTo(-0.8, 0.62)
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 1.28,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    })
    geo.translate(0, 0, -0.64)
    return geo
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return geometry
}

export function Car({ color = ORANGE.color, wheelSpeed = 1.2 }) {
  const cabin = useCabinGeometry()
  const body = { ...ORANGE, color }

  return (
    <group>
      {/* chassis */}
      <RoundedBox args={[3.3, 0.55, 1.55]} radius={0.1} smoothness={4} position={[0, 0.62, 0]}>
        <meshStandardMaterial {...body} />
      </RoundedBox>
      {/* cabin (glass) */}
      <mesh geometry={cabin} position={[-0.05, 0.86, 0]}>
        <meshStandardMaterial {...GLASS} />
      </mesh>
      {/* roof */}
      <RoundedBox args={[1.2, 0.08, 1.34]} radius={0.03} smoothness={2} position={[-0.24, 1.5, 0]}>
        <meshStandardMaterial {...body} />
      </RoundedBox>
      {/* bumpers */}
      <mesh position={[1.62, 0.5, 0]}>
        <boxGeometry args={[0.16, 0.3, 1.5]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      <mesh position={[-1.62, 0.5, 0]}>
        <boxGeometry args={[0.16, 0.3, 1.5]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      {/* grille */}
      <mesh position={[1.67, 0.72, 0]}>
        <boxGeometry args={[0.04, 0.18, 0.7]} />
        <meshStandardMaterial color="#0d0f12" roughness={0.8} />
      </mesh>
      {/* headlights */}
      {[-0.55, 0.55].map((z) => (
        <mesh key={`h${z}`} position={[1.67, 0.74, z]}>
          <boxGeometry args={[0.04, 0.16, 0.28]} />
          <meshStandardMaterial color="#fff6d8" emissive="#ffe6a8" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}
      {/* tail lights */}
      {[-0.55, 0.55].map((z) => (
        <mesh key={`t${z}`} position={[-1.67, 0.74, z]}>
          <boxGeometry args={[0.04, 0.14, 0.3]} />
          <meshStandardMaterial color="#ff2a2a" emissive="#ff1a1a" emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
      ))}
      {/* side mirrors */}
      {[-0.8, 0.8].map((z) => (
        <mesh key={`m${z}`} position={[0.72, 1.02, z]}>
          <boxGeometry args={[0.14, 0.1, 0.14]} />
          <meshStandardMaterial {...body} />
        </mesh>
      ))}
      {/* exhaust */}
      <mesh position={[-1.68, 0.32, -0.45]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 12]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      {/* underbody */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[2.6, 0.14, 1.3]} />
        <meshStandardMaterial color="#111317" roughness={0.9} />
      </mesh>
      {/* wheels */}
      <Wheel position={[1.05, 0.38, 0.72]} speed={wheelSpeed} />
      <Wheel position={[1.05, 0.38, -0.72]} speed={wheelSpeed} />
      <Wheel position={[-1.05, 0.38, 0.72]} speed={wheelSpeed} />
      <Wheel position={[-1.05, 0.38, -0.72]} speed={wheelSpeed} />
    </group>
  )
}
