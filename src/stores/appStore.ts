import { create } from 'zustand'

export type Section = 'hero' | 'gallery' | 'artifact' | 'tour' | 'knowledge'

interface AppState {
  currentSection: Section
  setSection: (section: Section) => void
  
  selectedTheme: string | null
  setSelectedTheme: (theme: string | null) => void
  
  selectedArtifact: string | null
  setSelectedArtifact: (artifact: string | null) => void
  
  isSoundEnabled: boolean
  toggleSound: () => void
  
  isLoading: boolean
  setLoading: (loading: boolean) => void
  
  tourProgress: number
  setTourProgress: (progress: number) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentSection: 'hero',
  setSection: (section) => set({ currentSection: section }),
  
  selectedTheme: null,
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
  
  selectedArtifact: null,
  setSelectedArtifact: (artifact) => set({ selectedArtifact: artifact }),
  
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  
  tourProgress: 0,
  setTourProgress: (progress) => set({ tourProgress: progress }),
}))