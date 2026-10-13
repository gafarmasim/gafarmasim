import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, ContactShadows, Float } from '@react-three/drei'
import { Car } from './Car.jsx'
import { Wrench } from './Wrench.jsx'
import { Gear } from './Gear.jsx'
import { Nut } from './Nut.jsx'
import { Studio } from './Lights.jsx'

/**
 * Rotating platform. `control` is a mutable ref written by the DOM pointer
 * handlers in Hero.jsx: { dragging, rotation, velocity, px, py }.
 * When the user is not dragging the platform idles slowly and keeps the
 * inertia of the last drag.
 */
function Turntable({ control, reducedMotion, children }) {
  const group = useRef()
  useFrame((_, dt) => {
    const g = group.current
    const c = control.current
    if (!g || !c) return
    if (!c.dragging) {
      c.velocity *= 0.94
      c.rotation += c.velocity + (reducedMotion ? 0 : dt * 0.25)
    }
    g.rotation.y += (c.rotation - g.rotation.y) * 0.18
    g.rotation.x += (c.py * 0.06 - g.rotation.x) * 0.05
    g.rotation.z += (-c.px * 0.03 - g.rotation.z) * 0.05
  })
  return <group ref={group}>{children}</group>
}

export function HeroScene({ control, quality }) {
  const { reducedMotion, mobile } = quality
  const floatProps = reducedMotion
    ? { speed: 0, rotationIntensity: 0, floatIntensity: 0 }
    : { speed: 1.6, rotationIntensity: 0.6, floatIntensity: 1.2 }

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 2.0, mobile ? 8.4 : 8.8]}
        fov={34}
        onUpdate={(cam) => cam.lookAt(0, 0.1, 0)}
      />
      <Studio resolution={128} />

      <group scale={mobile ? 0.82 : 0.96}>
        <Turntable control={control} reducedMotion={reducedMotion}>
          <group position={[0, -0.95, 0]}>
            <Car wheelSpeed={reducedMotion ? 0 : 1.2} />
            {/* platform */}
            <mesh position={[0, -0.08, 0]}>
              <cylinderGeometry args={[2.5, 2.75, 0.16, 56]} />
              <meshStandardMaterial color="#1a1e25" metalness={0.6} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2.3, 2.42, 72]} />
              <meshStandardMaterial color="#ff7a1a" emissive="#ff7a1a" emissiveIntensity={1.6} toneMapped={false} />
            </mesh>
            {!mobile && <ContactShadows position={[0, 0.01, 0]} opacity={0.65} scale={7} blur={2.2} far={2.2} frames={1} />}
          </group>
        </Turntable>

        {/* floating tools around the car */}
        <Float {...floatProps}>
          <group position={[-2.35, 1.35, -0.4]} rotation={[0.35, 0.4, -0.55]} scale={0.75}>
            <Wrench />
          </group>
        </Float>
        <Float {...floatProps} speed={1.2}>
          <group position={[2.3, 1.55, -1.0]} rotation={[0.5, -0.4, 0]} scale={0.55}>
            <Gear spin={reducedMotion ? 0 : 0.5} />
          </group>
        </Float>
        <Float {...floatProps} speed={2}>
          <group position={[2.05, -1.0, 1.3]} rotation={[0.6, 0.2, 0.4]} scale={0.8}>
            <Nut />
          </group>
        </Float>
        <Float {...floatProps} speed={1.4}>
          <group position={[-2.05, -0.75, 1.2]} rotation={[0.2, 0.8, 1.2]} scale={0.45}>
            <Gear color="#c9ced6" spin={reducedMotion ? 0 : -0.7} />
          </group>
        </Float>
      </group>
    </>
  )
}
