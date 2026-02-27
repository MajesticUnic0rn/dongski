import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function ChickenFallback({ scale = 1 }) {
  return (
    <group scale={scale}>
      {/* Main body */}
      <mesh castShadow>
        <sphereGeometry args={[0.35, 16, 12]} />
        <meshStandardMaterial
          color="#c8891a"
          roughness={0.55}
          metalness={0.05}
        />
      </mesh>
      {/* Crispy bump 1 */}
      <mesh position={[0.15, 0.15, 0.15]} castShadow>
        <sphereGeometry args={[0.18, 12, 10]} />
        <meshStandardMaterial
          color="#b57415"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>
      {/* Crispy bump 2 */}
      <mesh position={[-0.18, 0.1, -0.1]} castShadow>
        <sphereGeometry args={[0.2, 12, 10]} />
        <meshStandardMaterial
          color="#d4982a"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>
      {/* Crispy bump 3 */}
      <mesh position={[0.05, -0.15, 0.2]} castShadow>
        <sphereGeometry args={[0.15, 10, 8]} />
        <meshStandardMaterial
          color="#a86810"
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>
    </group>
  )
}

function ChickenModel({ scale = 1 }) {
  const { nodes, materials } = useGLTF('/models/chicken.glb')
  const mat = materials['tripo_node_60e4a93d-4f03-4701-bd50-b9f3ec33de65']
  const prefix = 'tripo_node_60e4a93d-4f03-4701-bd50-b9f3ec33de65_tripo_node_60e4a93d-4f03-4701-bd50-b9f3ec33de65_0'
  return (
    <group scale={scale * 0.01}>
      <mesh geometry={nodes[prefix].geometry} material={mat} castShadow />
      <mesh geometry={nodes[`${prefix}_1`].geometry} material={mat} castShadow />
      <mesh geometry={nodes[`${prefix}_2`].geometry} material={mat} castShadow />
      <mesh geometry={nodes[`${prefix}_3`].geometry} material={mat} castShadow />
      <mesh geometry={nodes[`${prefix}_4`].geometry} material={mat} castShadow />
      <mesh geometry={nodes[`${prefix}_5`].geometry} material={mat} castShadow />
      <mesh geometry={nodes[`${prefix}_6`].geometry} material={mat} castShadow />
    </group>
  )
}

export default function BouncingChicken({
  position = [0, 0, 0],
  speed = 1,
  phase = 0,
  scale = 1,
  rotationOffset = 0,
}) {
  const ref = useRef()
  const [useModel, setUseModel] = useState(true)

  useEffect(() => {
    // Check if the model file exists by attempting a HEAD request
    fetch('/models/chicken.glb', { method: 'HEAD' })
      .then((res) => {
        if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
          setUseModel(false)
        }
      })
      .catch(() => setUseModel(false))
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y =
      position[1] + Math.sin(t * speed + phase) * 0.5
    ref.current.rotation.y = t * 0.3 + rotationOffset
    ref.current.rotation.z = Math.sin(t * speed * 0.5 + phase) * 0.1
  })

  return (
    <group ref={ref} position={position}>
      {useModel ? (
        <ChickenModel scale={scale} />
      ) : (
        <ChickenFallback scale={scale} />
      )}
    </group>
  )
}
