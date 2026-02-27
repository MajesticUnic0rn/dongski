import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function CinnamonRoll({
  position = [0, 0.3, 0],
  scale = 1,
  speed = 0.15,
  phase = 0,
}) {
  const outerRef = useRef()
  const spinRef = useRef()
  const { scene } = useGLTF('/models/cinnamon.glb')
  const cloned = useMemo(() => scene.clone(true), [scene])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Gentle hover on outer group (no rotation here)
    if (outerRef.current) {
      outerRef.current.position.y = position[1] + Math.sin(t * 0.5 + phase) * 0.05
    }
    // Spin on the model's own up-axis, inside the tilt, so the bottom never faces the camera
    if (spinRef.current) {
      spinRef.current.rotation.y = t * speed + phase
    }
  })

  return (
    <group ref={outerRef} position={position}>
      {/* Static tilt so the swirl faces the camera */}
      <group scale={0.01 * scale} position={[0, 0.57 * scale, 0]} rotation={[-Math.PI / 2.5, 0, Math.PI]}>
        {/* Spin happens here, in the model's local space */}
        <group ref={spinRef}>
          <primitive object={cloned} />
        </group>
      </group>
      <pointLight
        position={[0, -0.3, 0]}
        color="#ff9933"
        intensity={2}
        distance={3}
        decay={2}
      />
    </group>
  )
}
