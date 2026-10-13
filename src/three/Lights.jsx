import { Environment, Lightformer } from '@react-three/drei'

/**
 * A small "studio" light rig: a few direct lights plus a procedural
 * environment map built from light panels (no HDR download needed),
 * so metallic materials get believable reflections offline.
 */
export function Studio({ intensity = 1, resolution = 128 }) {
  return (
    <>
      <ambientLight intensity={0.35 * intensity} />
      <directionalLight position={[4, 6, 3]} intensity={1.6 * intensity} />
      <directionalLight position={[-5, 3, -4]} intensity={0.5 * intensity} color="#ffb070" />
      <Environment resolution={resolution} frames={1}>
        <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
        <Lightformer intensity={1.5} rotation-y={-Math.PI / 2} position={[5, -1, -1]} scale={[10, 2, 1]} />
        <Lightformer intensity={0.8} color="#ff8a2a" rotation-y={Math.PI} position={[0, 2, 6]} scale={[6, 3, 1]} />
      </Environment>
    </>
  )
}
