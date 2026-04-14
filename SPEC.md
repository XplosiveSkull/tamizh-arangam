# Tamizh Arangam – The Living Museum of Tamil Civilization

## Project Overview

**Project Name:** Tamizh Arangam (தமிழ் அரங்கம்)
**Type:** Immersive Virtual Museum Web Platform
**Core Functionality:** An interactive 3D virtual museum dedicated to Tamil history, heritage, and artifacts, allowing users to explore ancient civilizations through immersive environments, artifact viewing, and guided virtual tours.
**Target Users:** History enthusiasts, students, researchers, Tamil diaspora, cultural scholars, and general public interested in Tamil civilization.

---

## 1. Visual & Rendering Specification

### Scene Setup

**Camera System:**
- Primary: First-person POV camera for immersive exploration
- Secondary: Orbit controls for artifact inspection
- Camera transitions: Smooth cinematic auto-transitions between areas
- Parameters: FOV 75°, near 0.1, far 1000
- Mouse look with WASD movement for exploration mode

**Lighting Setup:**
- Ambient light: Warm golden tone (#D4A017 at 0.3 intensity)
- Directional light: Sun rays through temple openings (warm white, intensity 1.2)
- Point lights: Simulated oil lamps inside temples (orange #FF8C00, intensity 0.8)
- Volumetric god rays effect for temple interiors
- Spotlights: Focused on artifacts in gallery view

**Environment:**
- Skybox: Deep night sky with stars over ancient Tamil landscape
- Fog: Subtle atmospheric haze (color #1a1a2e, near 10, far 100)
- Background: Textured stone walls with subtle gradients

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary Dark | Deep Black | #0B0B0B | Main backgrounds |
| Primary Mid | Dark Granite | #2B2B2B | Secondary backgrounds |
| Primary Accent | Temple Yellow | #D4A017 | Highlights, CTAs |
| Accent Gold | Antique Gold | #C9A44C | Royal elements, borders |
| Accent Blue | Ocean Blue | #0F3057 | Trade routes, water |

### Materials & Effects

**Materials:**
- Stone: PBR with normal maps (temple walls, floors)
- Bronze: Metallic 0.9, roughness 0.3 (Nataraja, artifacts)
- Gold: Metallic 1.0, roughness 0.2 (decorations, jewelry)
- Palm leaf: Diffuse with parchment texture
- Water: Reflective with ripples (temple tanks, trade ports)

**Post-Processing:**
- Bloom: Intensity 0.5, threshold 0.8 (for lamp glow, sun rays)
- Vignette: Intensity 0.4 (cinematic focus)
- Color grading: Warm sepia tint for historical feel
- Chromatic aberration: Subtle 0.002 (film camera effect)
- Depth of field: For artifact close-ups

**Particle Effects:**
- Dust particles: Floating in light beams (count 100, size 0.01)
- Incense smoke: Volumetric in temple interiors
- Water mist: Near temple tanks

---

## 2. 3D Assets Specification

### Environment Models

**Hero Section - Brihadeeswarar Temple:**
- Full 3D temple exterior with gopuram (entrance tower)
- Courtyard with surrounding structures
- Animated flag pole (dhwajasthambam)
- Main vimana (tower) with architectural details

**Gallery Halls:**
- Generic hall template: 50m x 30m x 15m
- Pillars with Dravidian carvings
- Wall textures: Stone with carved panels
- Floor: Polished black granite

### Artifact Models

| Artifact | Era | Type | Complexity |
|----------|-----|------|------------|
| Nataraja (Shiva) | Chola | Bronze | High (detailed pose, multiple arms) |
| Vishnu (Bronze) | Chola | Bronze | High |
| Palm Leaf Manuscript | Sangam | Text | Medium |
| Stone Inscription | Various | Stone | Medium |
| Temple Carving | Various | Stone | High |
| Traditional Jewelry | Various | Gold | Medium |
| Ancient Weapons | Various | Metal | Low |

### UI Elements (3D)

- Floating holographic panels for information
- Interactive timeline slider (3D bar with markers)
- Map projection on ground plane
- Achievement badges for gamification

---

## 3. Page Structure Specification

### 3.1 Hero Section (Landing)

**Layout:**
- Full-screen 3D canvas (100vw x 100vh)
- Temple environment centered
- UI overlay with:

  - Logo: "தமிழ் அரங்கம்" in Tamil script
  - Tagline: "The Living Museum of Tamil Civilization"
  - CTA Button: "Enter the Civilization" (animated glow)

**Behavior:**
- Auto-rotating camera around temple (0.2 rad/s)
- Ambient sound toggle (temple bells, wind, distant chants)
- Scroll-triggered animation into content

### 3.2 Gallery Selection

**Layout:**
- Grid of era/theme cards (4 columns desktop, 2 tablet, 1 mobile)
- Each card: 3D thumbnail preview + title + era range

**Themes:**
1. Sangam Age Civilization (300 BCE - 300 CE)
2. Chola Dynasty (300 - 1279 CE)
3. Pandya Dynasty (300 BCE - 1345 CE)
4. Temple Architecture
5. Tamil Literature (Thirukkural, etc.)
6. Maritime Trade Routes
7. Weapons & Warfare
8. Daily Life & Culture

**Interaction:**
- Hover: 3D tilt effect + glow highlight
- Click: Transition to 3D gallery hall with that theme

### 3.3 Artifact Viewing System

**Layout:**
- Central 3D viewer canvas (70% width)
- Side panel: Artifact information (30% width)
- Bottom: Navigation thumbnails

**Controls:**
- Orbit: Left mouse drag
- Zoom: Scroll wheel
- Pan: Right mouse drag
- Reset: Double-click

**Info Layers:**
- Origin tab: Time period, dynasty, location
- Material tab: Composition, craftsmanship techniques
- Significance tab: Cultural, religious, historical
- Story tab: Animated narrative with related images

### 3.4 Virtual Tour Mode

**Layout:**
- Full-screen immersive view
- Bottom bar: Tour progress + chapter markers
- Side panel (collapsible): AI guide controls

**Tour Options:**
1. "Rise of the Cholas" (15 min)
2. "Secrets of Sangam Literature" (12 min)
3. "Temple Engineering Marvels" (18 min)

**Behavior:**
- Camera follows predefined cinematic path
- Narration audio plays at each stop
- Auto-pause at key artifacts for detail view

### 3.5 Knowledge Layer

**Components:**
1. **Timeline Slider:** Horizontal scroll from 300 BCE to present
2. **Interactive Map:** Tamilakam region with clickable locations
3. **Language Evolution:** Tamil-Brahmi to modern Tamil visual
4. **Quiz Mode:** Gamified discovery with points

---

## 4. Audio Specification

**Ambient Sounds:**
- Temple bells: Soft, intermittent
- Wind: Gentle breeze through corridors
- Distant chants: Subtle background
- Water: Temple tank ripples

**Narration:**
- Voice: Bilingual Tamil + English
- AI-generated with natural cadence
- Toggle between languages

**Interactions:**
- Click sounds: Soft stone tap
- UI feedback: Gentle chime

---

## 5. Interaction Specification

### Controls

**Exploration Mode (First-Person):**
- WASD: Movement
- Mouse: Look around
- Space: Interact (open panels)
- ESC: Menu

**Artifact Mode (Orbit):**
- Left drag: Rotate
- Scroll: Zoom
- Right drag: Pan

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| M | Toggle map |
| T | Toggle timeline |
| S | Toggle sound |
| F | Fullscreen |
| 1-8 | Quick navigation to gallery themes |

---

## 6. Technical Architecture

### Tech Stack

- **3D Engine:** Three.js (WebGL)
- **Framework:** React 18 with TypeScript
- **Styling:** CSS-in-JS (styled-components)
- **Animation:** Framer Motion
- **State:** Zustand
- **Audio:** Howler.js

### File Structure

```
tamizh-arangam/
├── src/
│   ├── components/
│   │   ├── three/          # 3D components
│   │   ├── ui/             # UI components
│   │   └── layout/         # Layout components
│   ├── scenes/             # 3D scene definitions
│   ├── assets/             # Models, textures, audio
│   ├── stores/             # Zustand stores
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utilities
│   └── styles/             # Global styles
├── public/
│   └── assets/             # Static assets
└── package.json
```

---

## 7. Acceptance Criteria

### Visual Checkpoints

- [ ] Hero section displays 3D temple with proper lighting
- [ ] Color palette matches specification exactly
- [ ] Post-processing effects visible (bloom on lights)
- [ ] Particles render correctly (dust, smoke)
- [ ] UI text uses specified typography

### Functional Checkpoints

- [ ] Navigation between all 5 main sections works
- [ ] Gallery displays all 8 theme cards
- [ ] Artifact viewer allows orbit/zoom/pan
- [ ] Tour mode plays cinematic camera path
- [ ] Timeline slider scrolls through all eras
- [ ] Sound controls toggle correctly
- [ ] Responsive layout works on mobile

### Performance Targets

- Initial load: < 5 seconds on broadband
- 60 FPS during exploration
- < 3 second transitions between sections

---

## 8. Content Data

### Gallery Themes

```json
[
  { "id": "sangam", "title": "Sangam Age", "subtitle": "300 BCE - 300 CE", "icon": "scroll" },
  { "id": "chola", "title": "Chola Dynasty", "subtitle": "300 - 1279 CE", "icon": "crown" },
  { "id": "pandya", "title": "Pandya Dynasty", "subtitle": "300 BCE - 1345 CE", "icon": "temple" },
  { "id": "architecture", "title": "Temple Architecture", "subtitle": "Dravidian Style", "icon": "pillar" },
  { "id": "literature", "title": "Tamil Literature", "subtitle": "Thirukkural & More", "icon": "book" },
  { "id": "trade", "title": "Maritime Trade", "subtitle": "Spice Routes", "icon": "ship" },
  { "id": "warfare", "title": "Weapons & Warfare", "subtitle": "Ancient Arms", "icon": "sword" },
  { "id": "daily-life", "title": "Daily Life & Culture", "subtitle": "Ancient Lifestyle", "icon": "people" }
]
```

### Sample Artifacts

```json
[
  {
    "id": "nataraja",
    "name": "Nataraja (Lord of Dance)",
    "dynasty": "Chola",
    "year": "11th Century CE",
    "material": "Bronze",
    "location": "Thanjavur",
    "description": "The iconic bronze sculpture depicting Shiva as the cosmic dancer..."
  },
  {
    "id": "thirukkural",
    "name": "Thirukkural",
    "dynasty": "Sangam",
    "year": "1st Century BCE",
    "material": "Palm Leaf",
    "location": "Tamilakam",
    "description": "A classic Tamil text containing 1330 couplets..."
  }
]
```