import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useAppStore } from '../../stores/appStore'
import styles from './HeroSection.module.css'

function TempleModel() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[8, 6, 4]} />
            <meshStandardMaterial 
              color="#3d3d3d" 
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>
          
          <mesh position={[0, 4.5, 0]}>
            <coneGeometry args={[3, 3, 4]} />
            <meshStandardMaterial 
              color="#4a4a4a" 
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          
          <mesh position={[0, 6, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial 
              color="#D4A017" 
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
          
          <mesh position={[-3, 2, 2.2]}>
            <boxGeometry args={[2, 5, 0.5]} />
            <meshStandardMaterial 
              color="#2d2d2d" 
              roughness={0.9}
            />
          </mesh>
          
          <mesh position={[3, 2, 2.2]}>
            <boxGeometry args={[2, 5, 0.5]} />
            <meshStandardMaterial 
              color="#2d2d2d" 
              roughness={0.9}
            />
          </mesh>
          
          <mesh position={[-3, 5.5, 2.2]}>
            <coneGeometry args={[1.2, 2, 4]} />
            <meshStandardMaterial 
              color="#4a4a4a" 
              roughness={0.8}
            />
          </mesh>
          
          <mesh position={[3, 5.5, 2.2]}>
            <coneGeometry args={[1.2, 2, 4]} />
            <meshStandardMaterial 
              color="#4a4a4a" 
              roughness={0.8}
            />
          </mesh>
          
          {[-2, 0, 2].map((x, i) => (
            <group key={i} position={[x, 0, -2.1]}>
              <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
                <meshStandardMaterial color="#D4A017" roughness={0.4} metalness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      </Float>
    </group>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#D4A017" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        color="#FFF5E6"
        castShadow
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FF8C00" />
      <pointLight position={[-3, 2, 2]} intensity={0.3} color="#FF8C00" />
      <pointLight position={[3, 2, 2]} intensity={0.3} color="#FF8C00" />
    </>
  )
}

function Particles() {
  const count = 100
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#D4A017" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0B0B0B']} />
      <fog attach="fog" args={['#1a1a2e', 10, 50]} />
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={0.5} />
      <Lighting />
      <TempleModel />
      <Particles />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export default function HeroSection() {
  const { setSection } = useAppStore()

  return (
    <section className={styles.hero}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 3, 12], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>
      
      <div className={styles.content}>
        <motion.div
          className={styles.titleBlock}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className={styles.tamilTitle}>தமிழ் அரங்கம்</h1>
          <h2 className={styles.englishTitle}>TAMIZH ARANGAM</h2>
        </motion.div>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          The Living Museum of Tamil Civilization
        </motion.p>

        <motion.button
          className={styles.enterButton}
          onClick={() => setSection('gallery')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Enter the Civilization</span>
          <span className={styles.tamilBtn}>அரங்கத்திற்கு நுழைக</span>
        </motion.button>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>Explore</span>
        <div className={styles.scrollIcon}>
          <div className={styles.scrollWheel}></div>
        </div>
      </motion.div>
    </section>
  )
}