import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../stores/appStore'
import styles from './KnowledgeSection.module.css'

const timelineEvents = [
  { year: '300 BCE', title: 'Sangam Era Begins', description: 'First Tamil sangam established in Madurai' },
  { year: '200 BCE', title: 'Thirukkural Written', description: 'Thiruvalluvar composes the sacred couplets' },
  { year: '1st Century CE', title: 'Roman Trade', description: 'Direct trade links with Rome established' },
  { year: '300 CE', title: 'Kalabhra Period', description: 'Period of political fragmentation' },
  { year: '600 CE', title: 'Pallava Rise', description: 'Pallavas begin their architectural legacy' },
  { year: '850 CE', title: 'Chola Revival', description: 'Vijayalaya Chola restores the empire' },
  { year: '1010 CE', title: 'Brihadeeswarar', description: 'Great Temple of Thanjavur completed' },
  { year: '1200 CE', title: 'Pandyas Peak', description: 'Pandya kingdom reaches its zenith' },
  { year: '1565 CE', title: 'Battle of Talikota', description: 'Deccan Sultanates defeat Vijayanagara' },
]

const mapLocations = [
  { name: 'Thanjavur', x: 35, y: 65, dynasty: 'Chola Capital' },
  { name: 'Madurai', x: 30, y: 75, dynasty: 'Sangam Center' },
  { name: 'Mamallapuram', x: 50, y: 55, dynasty: 'Pallava Port' },
  { name: 'Kanchipuram', x: 55, y: 50, dynasty: 'Pallava Capital' },
  { name: 'Kanyakumari', x: 20, y: 90, dynasty: 'Southern Tip' },
]

const quizQuestions = [
  {
    question: 'Which dynasty built the Brihadeeswarar Temple?',
    options: ['Pallava', 'Chola', 'Pandya', 'Chera'],
    correct: 1,
  },
  {
    question: 'What is the Thirukkural written on?',
    options: ['Copper Plates', 'Stone', 'Palm Leaves', 'Papyrus'],
    correct: 2,
  },
  {
    question: 'Who is the author of the Thirukkural?',
    options: ['Kalidasa', 'Thiruvalluvar', 'Ilango Adigal', 'Vijayanagara'],
    correct: 1,
  },
]

export default function KnowledgeSection() {
  const { setSection } = useAppStore()
  const [activeMode, setActiveMode] = useState<'timeline' | 'map' | 'quiz'>('timeline')
  const [timelinePos, setTimelinePos] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleQuizAnswer = (index: number) => {
    if (quizAnswered) return
    setSelectedAnswer(index)
    setQuizAnswered(true)
    if (index === quizQuestions[quizIndex].correct) {
      setQuizScore(quizScore + 1)
    }
  }

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(quizIndex + 1)
      setQuizAnswered(false)
      setSelectedAnswer(null)
    }
  }

  const timelineEvent = timelineEvents[Math.floor(timelinePos * (timelineEvents.length - 1))]

  return (
    <section className={styles.knowledge}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Knowledge Layer
        </motion.h2>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Interactive learning through timelines, maps, and discovery
        </motion.p>
      </div>

      <div className={styles.modeSelector}>
        {(['timeline', 'map', 'quiz'] as const).map((mode) => (
          <button
            key={mode}
            className={`${styles.modeBtn} ${activeMode === mode ? styles.activeMode : ''}`}
            onClick={() => setActiveMode(mode)}
          >
            {mode === 'timeline' && '📅 Timeline'}
            {mode === 'map' && '🗺️ Map'}
            {mode === 'quiz' && '🎯 Quiz'}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeMode === 'timeline' && (
          <motion.div 
            className={styles.timeline}
            key="timeline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={styles.timelineDisplay}>
              <span className={styles.yearLabel}>{timelineEvent?.year}</span>
              <h3 className={styles.eventTitle}>{timelineEvent?.title}</h3>
              <p className={styles.eventDesc}>{timelineEvent?.description}</p>
            </div>
            
            <div className={styles.sliderContainer}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={timelinePos}
                onChange={(e) => setTimelinePos(parseFloat(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.timelineMarkers}>
                <span>300 BCE</span>
                <span>1st Century</span>
                <span>1000 CE</span>
                <span>Present</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeMode === 'map' && (
          <motion.div 
            className={styles.mapContainer}
            key="map"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapGrid}>
                {mapLocations.map((loc, i) => (
                  <motion.div
                    key={loc.name}
                    className={styles.mapMarker}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span className={styles.markerDot}></span>
                    <span className={styles.markerLabel}>{loc.name}</span>
                  </motion.div>
                ))}
              </div>
              <p className={styles.mapHint}>Ancient Tamilakam Region</p>
            </div>
          </motion.div>
        )}

        {activeMode === 'quiz' && (
          <motion.div 
            className={styles.quiz}
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.quizCard}>
              <div className={styles.quizProgress}>
                Question {quizIndex + 1} of {quizQuestions.length}
                <span className={styles.score}>Score: {quizScore}/{quizQuestions.length}</span>
              </div>
              
              <h3 className={styles.questionText}>
                {quizQuestions[quizIndex].question}
              </h3>
              
              <div className={styles.options}>
                {quizQuestions[quizIndex].options.map((option, i) => (
                  <button
                    key={i}
                    className={`${styles.option} ${
                      quizAnswered 
                        ? i === quizQuestions[quizIndex].correct 
                          ? styles.correct 
                          : selectedAnswer === i 
                            ? styles.wrong 
                            : ''
                        : ''
                    }`}
                    onClick={() => handleQuizAnswer(i)}
                    disabled={quizAnswered}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {quizAnswered && quizIndex < quizQuestions.length - 1 && (
                <button className={styles.nextBtn} onClick={nextQuestion}>
                  Next Question →
                </button>
              )}

              {quizAnswered && quizIndex === quizQuestions.length - 1 && (
                <div className={styles.result}>
                  <p>Quiz Complete!</p>
                  <span>You scored {quizScore} out of {quizQuestions.length}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <motion.button 
        className={styles.backBtn}
        onClick={() => setSection('hero')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        ← Back to Home
      </motion.button>
    </section>
  )
}