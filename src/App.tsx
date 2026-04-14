import { useAppStore } from './stores/appStore'
import HeroSection from './components/layout/HeroSection'
import GallerySection from './components/layout/GallerySection'
import ArtifactSection from './components/layout/ArtifactSection'
import TourSection from './components/layout/TourSection'
import KnowledgeSection from './components/layout/KnowledgeSection'
import Navigation from './components/ui/Navigation'
import LoadingScreen from './components/ui/LoadingScreen'

function App() {
  const { currentSection, isLoading } = useAppStore()

  return (
    <>
      <LoadingScreen visible={isLoading} />
      <Navigation />
      
      <main>
        {currentSection === 'hero' && <HeroSection />}
        {currentSection === 'gallery' && <GallerySection />}
        {currentSection === 'artifact' && <ArtifactSection />}
        {currentSection === 'tour' && <TourSection />}
        {currentSection === 'knowledge' && <KnowledgeSection />}
      </main>
    </>
  )
}

export default App