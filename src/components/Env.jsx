import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { easing } from 'maath'

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 2,
        state.pointer.y * 1.5 + 1,
        8 + Math.cos(state.pointer.x) * 2,
      ],
      0.5,
      delta
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Env() {
  return (
    <>
      <CameraRig />

      {/* Key light - warm golden */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#ffcc66"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Fill light - warm amber */}
      <directionalLight
        position={[-3, 3, -3]}
        intensity={0.3}
        color="#ff8844"
      />

      {/* Ambient warmth */}
      <ambientLight intensity={0.15} color="#ffddaa" />

      <Environment resolution={256}>
        {/* Top warm glow */}
        <Lightformer
          form="ring"
          intensity={2}
          color="#ffaa33"
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[4, 4, 1]}
        />
        {/* Side golden accent */}
        <Lightformer
          form="ring"
          intensity={1.5}
          color="#ff8822"
          position={[-5, 1, -1]}
          scale={[3, 3, 1]}
        />
        {/* Back warm fill */}
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#ffcc55"
          position={[3, 2, -5]}
          scale={[5, 3, 1]}
        />
        {/* Bottom warm bounce */}
        <Lightformer
          form="ring"
          intensity={1}
          color="#cc6600"
          rotation-x={-Math.PI / 2}
          position={[0, -2, 0]}
          scale={[6, 6, 1]}
        />
        {/* Front subtle warm */}
        <Lightformer
          form="rect"
          intensity={0.5}
          color="#ffddaa"
          position={[0, 0, 5]}
          scale={[8, 4, 1]}
        />
      </Environment>
    </>
  )
}
