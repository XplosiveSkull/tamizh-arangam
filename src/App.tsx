import { lazy, Suspense } from 'react'
import { useAppStore } from './stores/appStore'
import Navigation from './components/ui/Navigation'
import LoadingScreen from './components/ui/LoadingScreen'

const HeroSection = lazy(() => import('./components/layout/HeroSection'))
const GallerySection = lazy(() => import('./components/layout/GallerySection'))
const ArtifactSection = lazy(() => import('./components/layout/ArtifactSection'))
const TourSection = lazy(() => import('./components/layout/TourSection'))
const KnowledgeSection = lazy(() => import('./components/layout/KnowledgeSection'))

function App() {
  const { currentSection, isLoading } = useAppStore()

  return (
    <>
      <LoadingScreen visible={isLoading} />
      <Navigation />
      
      <main>
        <Suspense fallback={<LoadingScreen visible={true} />}>
          {currentSection === 'hero' && <HeroSection />}
          {currentSection === 'gallery' && <GallerySection />}
          {currentSection === 'artifact' && <ArtifactSection />}
          {currentSection === 'tour' && <TourSection />}
          {currentSection === 'knowledge' && <KnowledgeSection />}
        </Suspense>
      </main>
    </>
  )
}

export default App