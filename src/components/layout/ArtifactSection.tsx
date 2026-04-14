import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { useAppStore } from '../../stores/appStore'
import styles from './ArtifactSection.module.css'

const artifacts = [
  {
    id: 'nataraja',
    name: 'Nataraja',
    tamil: 'நடராஜர்',
    subtitle: 'Lord of Dance',
    dynasty: 'Chola',
    year: '11th Century CE',
    material: 'Bronze',
    location: 'Thanjavur',
    description: 'The iconic bronze sculpture depicting Shiva as the cosmic dancer. This masterpiece exemplifies the sophisticated metallurgical techniques of the Chola bronzes, known as "lost-wax" casting.',
    significance: 'Represents the cosmic dance of creation, preservation, and destruction. The Nataraja form became one of the most reproduced images in Hindu art.',
  },
  {
    id: 'thirukkural',
    name: 'Thirukkural',
    tamil: 'திருக்குறள்',
    subtitle: 'The Sacred Couplets',
    dynasty: 'Sangam',
    year: '1st Century BCE',
    material: 'Palm Leaf',
    location: 'Tamilakam',
    description: 'A classic Tamil text containing 1330 couplets (apa) organized into 133 sections covering virtue, wealth, and love. Authored by the poet-saint Thiruvalluvar.',
    significance: 'Recognized as one of the greatest works of Tamil literature, with translations in over 40 languages. Its universal ethics transcend time and culture.',
  },
  {
    id: 'mahabalipuram',
    name: 'Mahabalipuram Shore Temple',
    tamil: 'மகாபலிபுரம் கடலோரக் கோவில்',
    subtitle: 'Monumental Complex',
    dynasty: 'Pallava',
    year: '8th Century CE',
    material: 'Granite',
    location: 'Mamallapuram',
    description: 'A magnificent structural temple complex built by the Pallava dynasty, featuring intricately carved monolithic sculptures and the famous Shore Temple overlooking the Bay of Bengal.',
    significance: 'UNESCO World Heritage Site representing the pinnacle of South Indian stone carving and architectural innovation.',
  },
]

function ArtifactModel({ artifactId }: { artifactId: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  if (artifactId === 'nataraja') {
    return (
      <group>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
          <meshStandardMaterial 
            color="#B87333"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
      </group>
    )
  }

  if (artifactId === 'thirukkural') {
    return (
      <group>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.3 - 0.3, 0]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial 
              color="#D4A574"
              roughness={0.8}
            />
          </mesh>
        ))}
      </group>
    )
  }

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 3, 1]} />
      <meshStandardMaterial color="#666666" roughness={0.7} />
    </mesh>
  )
}

function Scene({ artifactId }: { artifactId: string }) {
  return (
    <>
      <color attach="background" args={['#0B0B0B']} />
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <ArtifactModel artifactId={artifactId} />
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
      />
      <Environment preset="studio" />
    </>
  )
}

export default function ArtifactSection() {
  const { setSection } = useAppStore()
  const [activeTab, setActiveTab] = useState<'origin' | 'material' | 'significance' | 'story'>('origin')
  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0])

  return (
    <section className={styles.artifact}>
      <div className={styles.viewer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Scene artifactId={selectedArtifact.id} />
        </Canvas>
        
        <div className={styles.viewerControls}>
          <span className={styles.controlHint}>Drag to rotate • Scroll to zoom</span>
        </div>
      </div>

      <div className={styles.panel}>
        <motion.div 
          className={styles.artifactHeader}
          key={selectedArtifact.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={styles.artifactName}>{selectedArtifact.name}</h2>
          <span className={styles.artifactTamil}>{selectedArtifact.tamil}</span>
          <p className={styles.artifactSubtitle}>{selectedArtifact.subtitle}</p>
        </motion.div>

        <div className={styles.tabs}>
          {(['origin', 'material', 'significance', 'story'] as const).map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className={styles.tabContent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'origin' && (
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Dynasty</span>
                  <span className={styles.infoValue}>{selectedArtifact.dynasty}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Year</span>
                  <span className={styles.infoValue}>{selectedArtifact.year}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Location</span>
                  <span className={styles.infoValue}>{selectedArtifact.location}</span>
                </div>
              </div>
            )}
            {activeTab === 'material' && (
              <p className={styles.description}>{selectedArtifact.material}</p>
            )}
            {activeTab === 'significance' && (
              <p className={styles.description}>{selectedArtifact.significance}</p>
            )}
            {activeTab === 'story' && (
              <p className={styles.description}>{selectedArtifact.description}</p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className={styles.thumbnails}>
          {artifacts.map((artifact) => (
            <button
              key={artifact.id}
              className={`${styles.thumbnail} ${selectedArtifact.id === artifact.id ? styles.activeThumb : ''}`}
              onClick={() => setSelectedArtifact(artifact)}
            >
              {artifact.name}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => setSection('gallery')}>
            ← Back to Gallery
          </button>
          <button className={styles.primaryBtn} onClick={() => setSection('tour')}>
            Take Virtual Tour
          </button>
        </div>
      </div>
    </section>
  )
}