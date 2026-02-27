import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import BouncingChicken from './BouncingChicken'
import CinnamonRoll from './CinnamonRoll'

export default function Scene() {
  return (
    <group position={[0, -1.0, 0]}>
      {/* Cinnamon rolls */}
      <CinnamonRoll position={[0, 0.3, 0]} scale={2} speed={0.15} phase={0} />
      <CinnamonRoll position={[-2.2, 0.5, -1.2]} scale={1.2} speed={0.2} phase={1.5} />
      <CinnamonRoll position={[2.0, 0.4, 1.0]} scale={1.4} speed={0.12} phase={3.0} />

      {/* Chickens */}
      <BouncingChicken position={[-1.8, 0.8, 0.5]} speed={1.2} phase={0} scale={1.6} rotationOffset={0.3} />
      <BouncingChicken position={[1.6, 0.8, -0.8]} speed={1.5} phase={2.1} scale={1.4} rotationOffset={-0.5} />
      <BouncingChicken position={[0.3, 0.8, 1.8]} speed={1.0} phase={4.2} scale={1.5} rotationOffset={1.2} />
      <BouncingChicken position={[-0.8, 0.8, -1.8]} speed={1.3} phase={1.0} scale={1.3} rotationOffset={2.0} />
      <BouncingChicken position={[2.4, 0.8, 1.5]} speed={0.9} phase={3.5} scale={1.7} rotationOffset={-1.0} />
      <BouncingChicken position={[-2.5, 0.8, 1.2]} speed={1.4} phase={5.0} scale={1.2} rotationOffset={0.8} />

      <AccumulativeShadows
        temporal
        frames={100}
        alphaTest={0.85}
        opacity={0.8}
        scale={10}
        position={[0, -0.01, 0]}
        color="#3e2005"
      >
        <RandomizedLight
          amount={8}
          radius={6}
          ambient={0.5}
          intensity={1}
          position={[5, 5, -5]}
          bias={0.001}
          color="#ffaa33"
        />
      </AccumulativeShadows>

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1a1210"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}
