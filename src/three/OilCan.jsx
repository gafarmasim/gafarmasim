import { RoundedBox } from '@react-three/drei'
import { ORANGE, PLASTIC } from './materials.js'

/** Motor-oil canister with cap, spout and a drop of oil. */
export function OilCan(props) {
  return (
    <group {...props}>
      <RoundedBox args={[0.95, 1.3, 0.55]} radius={0.08} smoothness={4}>
        <meshStandardMaterial {...PLASTIC} />
      </RoundedBox>
      {/* label */}
      <RoundedBox args={[0.8, 0.5, 0.58]} radius={0.03} smoothness={2} position={[0, -0.12, 0]}>
        <meshStandardMaterial {...ORANGE} metalness={0.2} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, -0.12, 0.3]}>
        <boxGeometry args={[0.5, 0.08, 0.01]} />
        <meshStandardMaterial color="#fff3e6" roughness={0.6} />
      </mesh>
      {/* neck + cap */}
      <mesh position={[-0.25, 0.73, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.18, 20]} />
        <meshStandardMaterial {...PLASTIC} />
      </mesh>
      <mesh position={[-0.25, 0.88, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.14, 20]} />
        <meshStandardMaterial {...ORANGE} />
      </mesh>
      {/* spout */}
      <mesh position={[0.32, 0.8, 0]} rotation={[0, 0, -0.65]}>
        <cylinderGeometry args={[0.06, 0.1, 0.52, 14]} />
        <meshStandardMaterial {...PLASTIC} />
      </mesh>
      {/* oil drop */}
      <mesh position={[0.5, 0.92, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#c47a1c" metalness={0.3} roughness={0.15} />
      </mesh>
    </group>
  )
}
