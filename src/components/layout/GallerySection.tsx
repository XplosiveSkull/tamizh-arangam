import { motion } from 'framer-motion'
import { useAppStore } from '../../stores/appStore'
import styles from './GallerySection.module.css'

const themes = [
  { id: 'sangam', title: 'Sangam Age', tamil: 'சங்க காலம்', subtitle: '300 BCE - 300 CE', icon: '📜' },
  { id: 'chola', title: 'Chola Dynasty', tamil: 'சோழ வம்சம்', subtitle: '300 - 1279 CE', icon: '👑' },
  { id: 'pandya', title: 'Pandya Dynasty', tamil: 'பாண்டிய வம்சம்', subtitle: '300 BCE - 1345 CE', icon: '🏛️' },
  { id: 'architecture', title: 'Temple Architecture', tamil: 'கோவில் கட்டிடக்கலை', subtitle: 'Dravidian Style', icon: '🗼' },
  { id: 'literature', title: 'Tamil Literature', tamil: 'தமிழ் இலக்கியம்', subtitle: 'Thirukkural & More', icon: '📖' },
  { id: 'trade', title: 'Maritime Trade', tamil: 'கடல் வணிகம்', subtitle: 'Spice Routes', icon: '⚓' },
  { id: 'warfare', title: 'Weapons & Warfare', tamil: 'ஆயுதங்கள்', subtitle: 'Ancient Arms', icon: '⚔️' },
  { id: 'daily-life', title: 'Daily Life & Culture', tamil: 'தினசரி வாழ்க்கை', subtitle: 'Ancient Lifestyle', icon: '🏠' },
]

export default function GallerySection() {
  const { setSection, setSelectedTheme } = useAppStore()

  const handleThemeClick = (themeId: string) => {
    setSelectedTheme(themeId)
    setSection('artifact')
  }

  return (
    <section className={styles.gallery}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Tamil Eras
        </motion.h2>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Journey through millennia of civilization
        </motion.p>
      </div>

      <div className={styles.grid}>
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            onClick={() => handleThemeClick(theme.id)}
          >
            <div className={styles.cardInner}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{theme.icon}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{theme.title}</h3>
                <span className={styles.cardTamil}>{theme.tamil}</span>
                <p className={styles.cardSubtitle}>{theme.subtitle}</p>
              </div>
              <div className={styles.cardBorder}></div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        className={styles.backButton}
        onClick={() => setSection('hero')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ x: -5 }}
      >
        ← Back to Home
      </motion.button>
    </section>
  )
}