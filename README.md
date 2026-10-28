# The Captain's Logbook — Nehal Vyas's Personal Portfolio

> *"Exploring the intersection of code, design, and imagination."*

An immersive, cinematic personal portfolio inspired by the atmosphere of *Pirates of the Caribbean* — mysterious deep oceans, antique brass navigational instruments, weathered parchment logbooks, interactive nautical maps, and secret treasure chests.

Designed and built for **Nehal Vyas** to showcase Python programming, visual design, and technological curiosity with elegance and authenticity.

---

## ✦ Table of Contents

1. [Aesthetic & Design Philosophy](#-aesthetic--design-philosophy)
2. [Key Features & Interactions](#-key-features--interactions)
3. [Visual Palette & Typography](#-visual-palette--typography)
4. [Project Structure](#-project-structure)
5. [How to Customize Your Portfolio](#-how-to-customize-your-portfolio)
6. [Running Locally](#-running-locally)
7. [Deploying to the Web](#-deploying-to-the-web)
8. [Accessibility & Reduced Motion](#-accessibility--reduced-motion)

---

## ✦ Aesthetic & Design Philosophy

The website feels like **a modern professional's portfolio hidden inside the captain's logbook of an elegant pirate ship**.

- **Not cartoonish, not childish, not a gaming website**: Museum-grade, cinematic nautical craftsmanship.
- **Atmospheric, not obstructive**: Every maritime metaphor enhances usability without delaying the visitor.
- **Honest & Grounded**: Avoids fake percentage meters (e.g. "95% Python") or fabricated achievements. Shows genuine progress labeled as *Learning*, *Practicing*, or *Comfortable*.
- **Local-First & Ultra-Performant**: Zero heavy Node build toolchain prerequisites. Instant load, responsive across desktop, tablet, and mobile.

---

## ✦ Key Features & Interactions

### 1. The Captain's Desk (Landing Screen)
- Deep ocean background with subtle drifting sea fog.
- Real-time candlelit dust mote particles and soft ocean caustic reflections rendered on HTML5 Canvas.
- Antique desk map overlay with rhumb lines and coordinates.
- Prominent display of **NEHAL VYAS** with engraved brass primary action button.
- Antique compass needle scroll indicator.

### 2. Signature Interaction — The Secret Treasure Chest
- Located in the corner of the Captain's Desk.
- When clicked:
  1. The brass lock cylinder turns and unlocks.
  2. The oak lid smoothly hinges open.
  3. A radiant golden glow and sparkle particles emerge from within.
  4. An ancient wax-sealed parchment unfolds revealing Nehal's personal creed and motto on curiosity.

### 3. Captain's Logbook (About Section)
- Designed as an open, aged leather-bound maritime journal with corner brass brackets and center crease.
- Two-column layout:
  - **Left**: Biography and three engraved attributes (**Analytical Mind** with Sextant, **Creative Eye** with Drafting Compass, and **Curious Explorer** with Astrolabe).
  - **Right**: Captain's oval portrait with antique gold filigree and voyage metadata.

### 4. The Captain's Instruments (Skills Section)
- Nautical instrument panels with brass bevels and corner rivets.
- **Python Programming**: Fundamentals, variables, control flow, functions, and algorithmic problem-solving.
- **Visual Design**: Layout, composition, color palettes, typography, UI/UX exploration.
- **Rigging & Tackle**: Git, VS Code, Terminal, Markdown, Web standards, Figma.
- Honest stage labels: *Comfortable*, *Practicing*, *Learning*.

### 5. Treasures of the Voyage (Interactive Nautical Map & Projects)
- Projects plotted as destinations on an interactive antique nautical map.
- Clicking an island or marker:
  - Traces a glowing dotted nautical route from the ship's position to the island.
  - Pulses the destination beacon.
  - Dynamically updates the parchment project card with problem statement, contribution, technology tags, and links.
- Includes genuine project showcases and a dedicated *"Currently Charting New Waters"* destination.

### 6. The Chart Room (Learning & Pinned Discoveries)
- Private navigation quarters with pinned parchment notes held by antique brass pushpins.
- Sections for *Technologies Explored*, *Skills on the Horizon*, and *Creative Pursuits*.

### 7. Send a Message Across the Sea (Contact Section)
- Unfolded letter scroll with a floating corked message bottle.
- Client-side validation with instant visual feedback.
- Two-fold genuine transmission:
  - Prepares direct email dispatch prompt.
  - One-click **Copy Message to Clipboard** button.
  - Automatically records past dispatches in the browser's local logbook storage.
- Direct links for GitHub, LinkedIn, and Email.

### 8. Web Audio Procedural Soundscape
- Synthesized 100% in-browser using the Web Audio API (no external mp3 files required).
- Procedural rolling ocean waves (filtered pink noise with LFO).
- Delicate metallic brass clicks on navigation buttons.
- Harmonious golden bell chime upon opening the treasure chest.
- Muted by default with a vintage brass toggle in the top bar.

---

## ✦ Visual Palette & Typography

| Color Role | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Ocean Black** | `#10191C` | Primary dark background |
| **Midnight Ocean Teal** | `#18363A` | Secondary surfaces and deep contrast |
| **Aged Parchment** | `#E8D8B5` | Logbook pages, scrolls, and project cards |
| **Antique Gold** | `#B89555` | Highlights, brass bezels, and buttons |
| **Weathered Ivory** | `#F4EBDD` | High-contrast readable text on dark surfaces |
| **Muted Sea Green** | `#718B83` | Secondary accents, indicators, and links |
| **Faded Ink Brown** | `#49382A` | Crisp typography on parchment surfaces |

### Typography:
- **Headings**: *Cormorant Garamond* (Serif display)
- **Navigation & Seals**: *Cinzel* (Classic roman capitals)
- **Body Text**: *Inter* (Clean sans-serif)
- **Coordinates & Log Metadata**: *Courier Prime* (Monospace typewriter)

---

## ✦ Project Structure

```
Portfolio/
├── index.html               # Main HTML entry point
├── favicon.svg              # Custom brass compass rose favicon
├── README.md                # Documentation & customization guide
├── css/
│   ├── styles.css           # Core design system & layout styles
│   └── animations.css       # Purposeful pirate-themed animations & reduced motion
├── js/
│   ├── config.js            # All editable portfolio data (Nehal Vyas)
│   ├── main.js              # DOM data-binding & initialization
│   ├── atmosphere.js        # Candlelight glow, ocean caustics, dust particles
│   ├── sound.js             # Web Audio API procedural soundscape
│   ├── navigation.js        # Brass navigation bar & section transitions
│   ├── map.js               # Interactive nautical map & route tracing
│   ├── chest.js             # Secret treasure chest interactive mechanics
│   └── contact.js           # Form validation, email dispatcher, local logbook
└── assets/
    └── svg/                 # Crisp handcrafted vector nautical instruments
        ├── compass-rose.svg
        ├── sextant.svg
        ├── astrolabe.svg
        ├── drafting-compass.svg
        ├── ship-wheel.svg
        ├── treasure-chest.svg
        └── message-bottle.svg
```

---

## ✦ How to Customize Your Portfolio

All personal information, skills, projects, and interests are stored in `js/config.js`. You do not need to touch HTML or CSS to make updates!

### 1. Update Personal Info & Social Links
Open `js/config.js` and edit `captain`:
```javascript
captain: {
  name: "Nehal Vyas",
  tagline: "Exploring the intersection of code, design, and imagination.",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername"
}
```

### 2. Add or Edit Projects
Add an entry to `projects` in `js/config.js`:
```javascript
{
  id: "project-my-new-app",
  title: "My Python Automation Tool",
  category: "Python Programming",
  coordinates: "28° 10' N, 71° 20' W",
  island: "Port of Scripts",
  mapX: 60, // position % on nautical map
  mapY: 45,
  problem: "Solved repetitive daily data entry...",
  technologies: ["Python 3", "Pandas", "Requests"],
  contribution: "Authored the scraping and cleansing script...",
  previewType: "code",
  viewUrl: "https://github.com/...",
  sourceUrl: "https://github.com/...",
  status: "Active"
}
```

### 3. Update Skills & Proficiency
In `js/config.js`, adjust any topic under `skills.python`, `skills.design`, or `skills.tools`:
- `status`: `"Learning"`, `"Practicing"`, or `"Comfortable"`.

---

## ✦ Running Locally

Because this project is written in clean, modern web standards with zero dependencies, you can run it immediately using any local server:

### Option 1: Python 3 (Built-in)
Run the following in the portfolio folder:
```bash
python3 -m http.server 8000
```
Then open your browser to `http://localhost:8000`.

### Option 2: Direct File Open
You can also directly open `index.html` in Chrome, Safari, Firefox, or Edge.

---

## ✦ Deploying to the Web

### GitHub Pages (100% Free):
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit of Captain's Logbook portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. In GitHub, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your portfolio will be live at `https://<your-username>.github.io/portfolio/`!

---

## ✦ Accessibility & Reduced Motion

- **Reduced Motion Support**:
  - Automatically respects system preferences via `@media (prefers-reduced-motion: reduce)`.
  - Also includes a manual **Motion: Full / Reduced** toggle in the header.
- **Keyboard Navigation**:
  - All interactive buttons, map waypoints, notes, and chest triggers support `Tab`, `Enter`, `Space`, and `Esc`.
- **Contrast**:
  - Dark background text uses weathered ivory (`#F4EBDD`) with contrast exceeding WCAG AA standards.
  - Parchment text uses deep faded ink (`#49382A`) for effortless legibility.
