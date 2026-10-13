import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { ORANGE, STEEL, DARK_STEEL } from './materials.js'

class Helix extends THREE.Curve {
  constructor(radius, height, turns) {
    super()
    this.radius = radius
    this.height = height
    this.turns = turns
  }
  getPoint(t, target = new THREE.Vector3()) {
    const a = t * this.turns * Math.PI * 2
    return target.set(Math.cos(a) * this.radius, (t - 0.5) * this.height, Math.sin(a) * this.radius)
  }
}

/** Coil-over shock absorber: orange spring wrapped around a steel damper. */
export function Shock(props) {
  const spring = useMemo(() => new THREE.TubeGeometry(new Helix(0.36, 1.3, 6), 200, 0.055, 10, false), [])
  useEffect(() => () => spring.dispose(), [spring])
  return (
    <group {...props}>
      <mesh geometry={spring}>
        <meshStandardMaterial {...ORANGE} />
      </mesh>
      {/* piston rod */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 1.0, 20]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      {/* damper body */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.95, 20]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      {/* spring seats */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.44, 0.44, 0.08, 24]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.44, 0.44, 0.08, 24]} />
        <meshStandardMaterial {...DARK_STEEL} />
      </mesh>
      {/* mounting eyes */}
      <mesh position={[0, 0.86, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.12, 0.05, 8, 20]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
      <mesh position={[0, -0.86, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.12, 0.05, 8, 20]} />
        <meshStandardMaterial {...STEEL} />
      </mesh>
    </group>
  )
}
