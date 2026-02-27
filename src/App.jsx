import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import Scene from './components/Scene'
import Env from './components/Env'
import './App.css'

export default function App() {
  const [degraded, setDegraded] = useState(false)

  return (
    <div className="canvas-container">
      <Canvas
        shadows
        dpr={[1, degraded ? 1.5 : 2]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#1a1210']} />
        <fog attach="fog" args={['#1a1210', 10, 20]} />
        <PerformanceMonitor onDecline={() => setDegraded(true)} />
        <Suspense fallback={null}>
          <Scene />
          <Env />
        </Suspense>
      </Canvas>

      <div className="overlay">
        <h1>Dongski</h1>
        <p>Indulge in the warmth</p>
      </div>

      <div className="attribution">
        <a href="https://sketchfab.com/czernobog" target="_blank" rel="noopener noreferrer">
          Chicken model by CzernO (CC-BY-4.0)
        </a>
        {' · '}
        <a href="https://sketchfab.com/qlone" target="_blank" rel="noopener noreferrer">
          Cinnamon model by Qlone (CC-BY-ND-4.0)
        </a>
      </div>
    </div>
  )
}
