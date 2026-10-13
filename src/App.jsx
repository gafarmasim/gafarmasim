import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Stats from './components/Stats.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { useQuality } from './hooks/useQuality.js'

/**
 * One shared WebGL canvas is fixed behind the page and every 3D area
 * (hero stage, service icons) is a drei <View> that tracks a DOM element.
 * This keeps a single GL context no matter how many 3D objects are on the page.
 */
export default function App() {
  const container = useRef(null)
  const quality = useQuality()
  const [glReady, setGlReady] = useState(false)

  return (
    <div ref={container} className="page">
      <Navbar />
      <main>
        <Hero quality={quality} glReady={glReady} />
        <Services quality={quality} />
        <Stats />
        <Process />
        <Contact />
      </main>
      <Footer />

      {quality.webgl && (
        <Canvas
          className="gl-canvas"
          eventSource={container}
          eventPrefix="client"
          dpr={quality.dpr}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={() => setGlReady(true)}
        >
          <View.Port />
        </Canvas>
      )}
    </div>
  )
}
