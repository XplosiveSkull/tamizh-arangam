import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useAppStore } from '../../stores/appStore'
import styles from './TourSection.module.css'

const tours = [
  { id: 'chola', title: 'Rise of the Cholas', tamil: 'சோழர்கள் எழுச்சி', duration: '15 min', color: '#D4A017' },
  { id: 'sangam', title: 'Secrets of Sangam Literature', tamil: 'சங்க இலக்கியம்', duration: '12 min', color: '#C9A44C' },
  { id: 'temples', title: 'Temple Engineering Marvels', tamil: 'கோவில் கட்டுமானம்', duration: '18 min', color: '#0F3057' },
]

const tourStops = [
  { position: [0, 0, 0], title: 'Beginning', description: 'Welcome to the journey' },
  { position: [5, 2, 3], title: 'Ancient City', description: 'The flourishing metropolis' },
  { position: [-3, 1, 5], title: 'Temple Complex', description: 'The spiritual center' },
  { position: [2, 3, -4], title: 'Palace', description: 'The royal residence' },
]

function TourPath({ color }: { color: string }) {
  const points = tourStops.map(stop => new THREE.Vector3(...stop.position))
  const curve = new THREE.CatmullRomCurve3(points)
  
  return (
    <mesh>
      <tubeGeometry args={[curve, 100, 0.02, 8, false]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

function FloatingMonument({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
      </mesh>
    </Float>
  )
}

function Scene({ activeTour }: { activeTour: string }) {
  const tour = tours.find(t => t.id === activeTour) || tours[0]
  
  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 5, 30]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color={tour.color} />
      
      <TourPath color={tour.color} />
      
      {tourStops.map((stop, i) => (
        <FloatingMonument 
          key={i} 
          position={stop.position as [number, number, number]} 
          color={i % 2 === 0 ? '#D4A017' : '#C9A44C'}
        />
      ))}
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export default function TourSection() {
  const { setSection, tourProgress, setTourProgress } = useAppStore()
  const [activeTour, setActiveTour] = useState('chola')
  const [isPlaying, setIsPlaying] = useState(false)
  
  const currentStopIndex = Math.min(Math.floor(tourProgress * tourStops.length), tourStops.length - 1)
  const currentStop = tourStops[currentStopIndex]

  return (
    <section className={styles.tour}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
          <Scene activeTour={activeTour} />
        </Canvas>
      </div>

      <div className={styles.overlay}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Virtual Tours
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Guided cinematic journeys through Tamil history
          </motion.p>
        </div>

        <div className={styles.tourSelector}>
          {tours.map((tour) => (
            <button
              key={tour.id}
              className={`${styles.tourBtn} ${activeTour === tour.id ? styles.activeTour : ''}`}
              onClick={() => setActiveTour(tour.id)}
              style={{ '--tour-color': tour.color } as React.CSSProperties}
            >
              <span className={styles.tourTitle}>{tour.title}</span>
              <span className={styles.tourTamil}>{tour.tamil}</span>
              <span className={styles.tourDuration}>{tour.duration}</span>
            </button>
          ))}
        </div>

        <div className={styles.player}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${tourProgress * 100}%` }}
            />
          </div>
          
          <div className={styles.nowPlaying}>
            <span className={styles.stopLabel}>Now Playing:</span>
            <span className={styles.stopTitle}>{currentStop.title}</span>
          </div>

          <div className={styles.controls}>
            <button 
              className={styles.controlBtn}
              onClick={() => setTourProgress(Math.max(0, tourProgress - 0.1))}
            >
              ⏮
            </button>
            <button 
              className={styles.playBtn}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button 
              className={styles.controlBtn}
              onClick={() => setTourProgress(Math.min(1, tourProgress + 0.1))}
            >
              ⏭
            </button>
          </div>
        </div>

        <motion.button 
          className={styles.backBtn}
          onClick={() => setSection('gallery')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ← Back to Gallery
        </motion.button>
      </div>
    </section>
  )
}