import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'
import { ORANGE, PLASTIC, STEEL } from './materials.js'

function useBoltGeometry() {
  const geometry = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0.06, 0.32)
    s.lineTo(-0.14, 0.02)
    s.lineTo(-0.01, 0.02)
    s.lineTo(-0.07, -0.32)
    s.lineTo(0.14, 0.05)
    s.lineTo(0.01, 0.05)
    s.closePath()
    return new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: false })
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return geometry
}

/** Car battery with terminals, +/- markers and a lightning bolt badge. */
export function Battery(props) {
  const bolt = useBoltGeometry()
  return (
    <group {...props}>
      <RoundedBox args={[1.3, 0.85, 0.75]} radius={0.05} smoothness={3} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#1c2026" metalness={0.3} roughness={0.6} />
      </RoundedBox>
      <RoundedBox args={[1.32, 0.12, 0.77]} radius={0.03} smoothness={2} position={[0, 0.28, 0]}>
        <meshStandardMaterial {...PLASTIC} />
      </RoundedBox>
      {/* terminals */}
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.45, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.22, 16]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
      ))}
      {/* + marker */}
      <mesh position={[-0.42, 0.35, 0.24]}>
        <boxGeometry args={[0.16, 0.03, 0.04]} />
        <meshStandardMaterial color="#ff3b3b" emissive="#ff1f1f" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.42, 0.35, 0.24]}>
        <boxGeometry args={[0.04, 0.03, 0.16]} />
        <meshStandardMaterial color="#ff3b3b" emissive="#ff1f1f" emissiveIntensity={0.6} />
      </mesh>
      {/* - marker */}
      <mesh position={[0.42, 0.35, 0.24]}>
        <boxGeometry args={[0.16, 0.03, 0.04]} />
        <meshStandardMaterial color="#4da3ff" emissive="#2b7fff" emissiveIntensity={0.6} />
      </mesh>
      {/* front stripe + bolt badge */}
      <mesh position={[0, -0.1, 0.375]}>
        <boxGeometry args={[1.3, 0.24, 0.02]} />
        <meshStandardMaterial {...ORANGE} metalness={0.2} roughness={0.5} />
      </mesh>
      <mesh geometry={bolt} position={[0, -0.1, 0.385]} scale={0.55}>
        <meshStandardMaterial color="#fff2cc" emissive="#ffd36b" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}
