import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Studio } from './Lights.jsx'

function Spinner({ hovered, reducedMotion, axis = 'y', children }) {
  const ref = useRef()
  const speed = useRef(0.45)
  const phase = useRef(Math.random() * Math.PI * 2)

  useFrame((state, dt) => {
    const g = ref.current
    if (!g) return
    const target = reducedMotion ? 0 : hovered ? 2.6 : 0.45
    speed.current += (target - speed.current) * 0.08
    g.rotation[axis] += speed.current * dt

    const s = hovered ? 1.12 : 1
    const next = g.scale.x + (s - g.scale.x) * 0.1
    g.scale.setScalar(next)

    g.position.y = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.4 + phase.current) * 0.05
  })

  return <group ref={ref}>{children}</group>
}

/**
 * Small studio scene for a service card icon. The object slowly turns and
 * speeds up / grows when the card is hovered.
 */
export function IconScene({ hovered, reducedMotion, axis = 'y', tilt = [0, 0, 0], scale = 1, children }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.9, 4.4]} fov={32} onUpdate={(cam) => cam.lookAt(0, 0, 0)} />
      <Studio resolution={64} intensity={0.9} />
      <group rotation={tilt} scale={scale}>
        <Spinner hovered={hovered} reducedMotion={reducedMotion} axis={axis}>
          {children}
        </Spinner>
      </group>
    </>
  )
}
