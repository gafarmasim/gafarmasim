import { RUBBER, STEEL, DARK_STEEL } from './materials.js'

const TREADS = Array.from({ length: 28 }, (_, i) => (i / 28) * Math.PI * 2)
const SPOKES = Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2)

/** Wheel with tyre, rim, spokes and tread blocks. Axis = Z. */
export function Tire(props) {
  return (
    <group {...props}>
      <mesh>
        <torusGeometry args={[0.82, 0.3, 16, 40]} />
        <meshStandardMaterial {...RUBBER} />
      </mesh>
      {TREADS.map((a) => (
        <mesh key={a} position={[Math.cos(a) * 1.1, Math.sin(a) * 1.1, 0]} rotation={[0, 0, a]}>
          <boxGeometry args={[0.06, 0.1, 0.42]} />
          <meshStandardMaterial color="#202326" roughness={0.9} />
        </mesh>
      ))}
      {/* rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.34, 32]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      {/* recess behind the spokes */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.36, 32]} />
        <meshStandardMaterial color="#0f1114" roughness={0.8} />
      </mesh>
      {SPOKES.map((a) => (
        <mesh key={a} rotation={[0, 0, a]} position={[Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0]}>
          <boxGeometry args={[0.5, 0.12, 0.42]} />
          <meshStandardMaterial {...STEEL} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.44, 24]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
    </group>
  )
}
