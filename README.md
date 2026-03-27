# KUNIVERSE — React + Tailwind + Three.js

Multi-page portfolio site with galaxy universe theme.

## Stack
- **React 18** — UI framework
- **Vite 5** — dev server & bundler
- **Tailwind CSS 3** — utility-first styling
- **Three.js** — galaxy background, interactive star effect

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## Project Structure

```
src/
├── main.jsx              # React root
├── App.jsx               # Page routing, global overlays
├── index.css             # Tailwind directives + custom keyframes
│
├── scenes/
│   └── GalaxyScene.jsx   # Three.js canvas — galaxy, stars, cursor effect
│
├── components/
│   ├── LoadingScreen.jsx  # Animated loader with progress messages
│   ├── Navbar.jsx         # Scroll-aware nav, active link tracking
│   └── SectionHeader.jsx  # Reusable eyebrow + title + subtitle block
│
├── pages/
│   ├── Home.jsx           # Hero with galaxy title + tag pills
│   ├── About.jsx          # Bio, photo frame, skills, timeline
│   ├── Projects.jsx       # Filterable project grid
│   ├── Music.jsx          # Waveform, tracks list, collab CTA
│   └── Contact.jsx        # Contact form + social links
│
└── data/
    ├── projects.js        # Project list — edit here to update work grid
    └── tracks.js          # Track list + genre categories
```

## Customisation

### Adding your photo (About page)
Replace the placeholder div in `src/pages/About.jsx`:
```jsx
// Find this block and replace with an <img> tag:
<div className="w-full h-full bg-gradient-to-br ...">
  <span>[ CLIENT PHOTO ]</span>
</div>

// Replace with:
<img src="/assets/images/portrait.jpg" alt="Kuniverse" className="w-full h-full object-cover" />
```

### Adding projects
Edit `src/data/projects.js` — add objects to the array:
```js
{
  id: 8,
  title: 'New Project',
  category: '3d',        // '3d' | 'music' | 'design'
  featured: false,        // true = spans 2 columns
  desc: 'Description…',
  gradient: 'bg-arm-a',  // bg-arm-a through bg-arm-e
  tags: ['Blender'],
  year: '2025',
}
```

### Adding tracks
Edit `src/data/tracks.js` — add to the tracks array.

### Swapping real 3D models (Phase 2)
When you have .glb assets ready, install React Three Fiber:
```bash
npm install @react-three/fiber @react-three/drei @use-gesture/react
```
Then replace `src/scenes/GalaxyScene.jsx` with the R3F version
that loads your actual guitar, render sphere and design board models.

## Deployment

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel (recommended)
npx vercel
```

## Color Palette

| Token          | Hex       | Usage                        |
|----------------|-----------|------------------------------|
| navy-dark      | #050d1f   | Page background              |
| navy           | #0e1f48   | Cards, surfaces              |
| navy-mid       | #1a3270   | Subtle fills                 |
| navy-pale      | #8899cc   | Muted text, borders          |
| violet         | #8e31a4   | Galaxy arm A, accents        |
| violet-light   | #b85fca   | Hover states, labels         |
| violet-pale    | #dba8e6   | Ultra-light tints            |
| coral          | #ff5757   | CTAs, active states          |
| coral-light    | #ff8080   | Softer coral accents         |

All tokens are in `tailwind.config.js` and available as `text-coral`, `bg-violet`, etc.
