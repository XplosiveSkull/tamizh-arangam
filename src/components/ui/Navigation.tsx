import { motion } from 'framer-motion'
import { useAppStore, Section } from '../../stores/appStore'
import styles from './Navigation.module.css'

const navItems: { id: Section; label: string; tamil: string }[] = [
  { id: 'hero', label: 'Home', tamil: 'முகப்பு' },
  { id: 'gallery', label: 'Gallery', tamil: 'காட்சியகம்' },
  { id: 'tour', label: 'Tours', tamil: 'சுற்றுலா' },
  { id: 'knowledge', label: 'Learn', tamil: 'கற்க' },
]

export default function Navigation() {
  const { currentSection, setSection, isSoundEnabled, toggleSound } = useAppStore()

  return (
    <motion.nav 
      className={styles.nav}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className={styles.logo}>
        <span className={styles.logoTamil}>தமிழ் அரங்கம்</span>
        <span className={styles.logoText}>Tamizh Arangam</span>
      </div>

      <div className={styles.menu}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.menuItem} ${currentSection === item.id ? styles.active : ''}`}
            onClick={() => setSection(item.id)}
          >
            <span className={styles.menuLabel}>{item.label}</span>
            <span className={styles.menuTamil}>{item.tamil}</span>
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.soundToggle} onClick={toggleSound}>
          {isSoundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    </motion.nav>
  )
}