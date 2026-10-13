import { STEEL } from './materials.js'

/** Hex nut used as a floating accent in the hero scene. */
export function Nut({ size = 0.3, ...props }) {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[size, size, size * 0.7, 6]} />
        <meshStandardMaterial {...STEEL} flatShading />
      </mesh>
      <mesh>
        <cylinderGeometry args={[size * 0.45, size * 0.45, size * 0.72, 16]} />
        <meshStandardMaterial color="#111317" roughness={0.8} />
      </mesh>
    </group>
  )
}
