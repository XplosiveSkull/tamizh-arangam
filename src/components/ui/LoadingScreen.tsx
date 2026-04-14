import { motion } from 'framer-motion'
import styles from './LoadingScreen.module.css'

interface LoadingScreenProps {
  visible: boolean
}

export default function LoadingScreen({ visible }: LoadingScreenProps) {
  if (!visible) return null

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.tamil}>தமிழ்</span>
          <span className={styles.text}>TAMIZH</span>
        </div>
        <div className={styles.loader}>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
          <div className={styles.ring}></div>
        </div>
        <p className={styles.message}>Entering the civilization...</p>
      </div>
    </motion.div>
  )
}