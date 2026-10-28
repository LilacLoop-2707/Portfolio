/**
 * =======================================================================
 * THE CAPTAIN'S LOGBOOK — CONFIGURATION & CONTENT DATA
 * =======================================================================
 * All portfolio content for NEHAL VYAS is defined here.
 * Edit this file to customize your bio, skills, projects, and interests
 * without having to modify HTML or CSS.
 */

window.PORTFOLIO_CONFIG = {
  // --- CAPTAIN & SHIP IDENTITY ---
  captain: {
    name: "Nehal Vyas",
    title: "Explorer of Code, Design & Digital Craft",
    tagline: "Exploring the intersection of code, design, and imagination.",
    intro: "I'm building my skills in Python, exploring design, and turning curious ideas into thoughtful digital experiences.",
    vessel: "The Curiosity",
    flagshipStatus: "Under Sail • Clear Horizons",
    coordinates: "LAT 24° 33' N | LON 76° 12' W",
    logNumber: "ENTRY #042",
    location: "Earth • Digital Commons",
    email: "nehalvyas@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    statusBadge: "Active Voyager",
    currentCourse: "Python Foundations & Creative Web Design"
  },

  // --- ABOUT ME: CAPTAIN'S LOGBOOK ---
  about: {
    heading: "A Mind That Likes to Explore",
    subheading: "Captain's Logbook — Notes on Craft, Logic & Discovery",
    biography: [
      "Every great expedition begins with an insatiable itch to see what lies beyond the horizon. For me, that uncharted expanse is software and design.",
      "My journey centers around Python programming, visual composition, and computational curiosity. Rather than treating code as mechanical syntax, I see it as an instrument of thought — a structured way to dissect intricate problems, model systems, and bring imaginative concepts into tangible reality.",
      "I am drawn to projects that blend analytical rigor with aesthetic poise. Whether scripting automation tools, studying algorithmic foundations, or shaping responsive interfaces, I approach every challenge with patience, observation, and an eagerness to learn."
    ],
    // The three core pillars requested in Section 5
    attributes: [
      {
        id: "analytical",
        title: "Analytical Mind",
        subtitle: "Logic & Observation",
        description: "Approaching problems through structured reasoning, deliberate testing, and breaking down complexity into clear, navigable components.",
        icon: "sextant",
        accent: "Brass Precision"
      },
      {
        id: "creative",
        title: "Creative Eye",
        subtitle: "Aesthetics & Experience",
        description: "Exploring visual balance, typography, color harmony, and the subtle details that elevate a digital interface from functional to memorable.",
        icon: "drafting-compass",
        accent: "Parchment Harmony"
      },
      {
        id: "explorer",
        title: "Curious Explorer",
        subtitle: "Unfamiliar Horizons",
        description: "Constantly venturing into new libraries, languages, and creative domains with humility and a relentless drive to master modern tools.",
        icon: "astrolabe",
        accent: "Uncharted Course"
      }
    ],
    motto: "The sea of knowledge has no shore; the only compass is curiosity."
  },

  // --- SKILLS: THE CAPTAIN'S INSTRUMENTS ---
  // Honestly represented proficiency levels: "Learning", "Practicing", "Comfortable"
  skills: {
    python: {
      instrumentTitle: "The Analytical Engine — Python Programming",
      icon: "code-brass",
      status: "Actively Developing",
      summary: "Python serves as my primary anchor for computational problem-solving, structured scripts, and data exploration.",
      topics: [
        { name: "Python Fundamentals & Syntax", status: "Comfortable", desc: "Core language mechanics, clean formatting, PEP 8 standards." },
        { name: "Variables, Collections & Data Types", status: "Comfortable", desc: "Lists, dictionaries, tuples, sets, strings, and type casting." },
        { name: "Conditional Statements & Control Flow", status: "Comfortable", desc: "Boolean logic, branching conditionals, error handling." },
        { name: "Loops & Iterations", status: "Practicing", desc: "For/while loops, comprehensions, iterators, and enumeration." },
        { name: "Functions & Modular Architecture", status: "Practicing", desc: "Pure functions, scope, parameters, return values, and module imports." },
        { name: "Basic Problem-Solving & Algorithmic Exercises", status: "Learning", desc: "Searching, sorting patterns, recursion basics, and code katas." }
      ]
    },
    design: {
      instrumentTitle: "The Drafting Compass — Visual Design",
      icon: "compass-drafting",
      status: "Creative Exploration",
      summary: "Developing an intuitive feel for layout rhythm, typographic hierarchy, and atmospheric user experiences.",
      topics: [
        { name: "Visual Design & Aesthetic Hierarchy", status: "Practicing", desc: "Guiding the eye through contrast, scale, white space, and visual pacing." },
        { name: "Color Palettes & Typography", status: "Comfortable", desc: "Harmonizing palettes, serif/sans pairings, and accessibility contrast." },
        { name: "Layout & Composition", status: "Practicing", desc: "Grid systems, flexbox structures, responsive breakpoints, visual balance." },
        { name: "Creative Concept Development", status: "Comfortable", desc: "Translating thematic narratives into polished, cohesive interfaces." },
        { name: "UI/UX Exploration & Interaction Design", status: "Learning", desc: "Micro-interactions, state transitions, wireframing user journeys." }
      ]
    },
    tools: {
      instrumentTitle: "The Rigging & Tackle — Tools & Technologies",
      icon: "tools-anchor",
      status: "Daily Equipment",
      summary: "The practical instruments I employ to build, document, and manage my work.",
      items: [
        { name: "Git & Version Control", status: "Practicing", category: "Workflow", desc: "Branching, committing, staging, tracking changes." },
        { name: "VS Code & Modern IDEs", status: "Comfortable", category: "Environment", desc: "Extensions, linters, keybindings, debugging tools." },
        { name: "Terminal & CLI Navigation", status: "Comfortable", category: "System", desc: "Bash/Zsh command-line navigation, file operations, scripting." },
        { name: "Markdown & Technical Docs", status: "Comfortable", category: "Writing", desc: "Clear documentation, project READMEs, technical logs." },
        { name: "HTML5 & Modern CSS", status: "Practicing", category: "Web", desc: "Semantic markup, modern layout techniques, animations." },
        { name: "Figma & Wireframing", status: "Learning", category: "Design", desc: "Component layout, moodboards, user interface drafts." }
      ]
    }
  },

  // --- PROJECTS: TREASURES OF THE VOYAGE ---
  // Each project is pinned as a destination coordinate on the antique nautical map
  projects: [
    {
      id: "project-portfolio",
      title: "The Captain's Logbook — Portfolio",
      category: "Creative Web Design",
      coordinates: "24° 12' N, 76° 45' W",
      island: "Isle of Logbook",
      mapX: 22, // percentage on nautical map
      mapY: 34,
      problem: "Creating a personal portfolio that tells a cinematic, pirate-inspired story without degenerating into a chaotic novelty or sacrificing clean typography and quick accessibility.",
      technologies: ["JavaScript ES6+", "Modern CSS", "HTML5 Canvas API", "Web Audio API", "SVG Cartography"],
      contribution: "Designed the atmospheric aesthetic, interactive SVG nautical map, procedural sound synthesis, particle lighting, and responsive parchment layouts.",
      previewType: "interactive",
      previewLabel: "Atmospheric Portfolio Interface",
      viewUrl: "#",
      sourceUrl: "https://github.com",
      status: "Completed & Active",
      featured: true
    },
    {
      id: "project-pylog",
      title: "PyLog & Automata — Task & Expedition Tracker",
      category: "Python Programming",
      coordinates: "31° 48' N, 64° 20' W",
      island: "Archipelago of Logic",
      mapX: 52,
      mapY: 28,
      problem: "Standard to-do applications are bloated with unnecessary cloud synchronization. Needed a lightweight, local-first Python CLI tool to record daily coding logs and export clean markdown summaries.",
      technologies: ["Python 3", "Argparse", "JSON Storage", "File I/O", "ANSI Color Styling"],
      contribution: "Built the command-line argument parser, structured log data serialization, automated timestamping, and formatted terminal output.",
      previewType: "code",
      previewLabel: "Python CLI Interface & File Automator",
      viewUrl: "#",
      sourceUrl: "https://github.com",
      status: "Practicing & Iterating",
      featured: true
    },
    {
      id: "project-compass",
      title: "Voyager's Compass — Interactive Vector Visualizer",
      category: "Interactive Math & Code",
      coordinates: "18° 05' N, 68° 15' W",
      island: "Sounding Reef",
      mapX: 74,
      mapY: 58,
      problem: "Translating trigonometric formulas (sine, cosine, radial vectors) into intuitive visual mechanics through an interactive digital compass needle and waypoint plotter.",
      technologies: ["Python / Web Canvas", "Vector Math", "Trigonometry", "Coordinate Geometry"],
      contribution: "Calculated angle damping, smooth needle oscillation physics, bearing calculation between geographic points, and interactive dial rendering.",
      previewType: "visual",
      previewLabel: "Vector Physics & Compass Dial Simulation",
      viewUrl: "#",
      sourceUrl: "https://github.com",
      status: "Practicing & Refining",
      featured: true
    },
    {
      id: "project-uncharted",
      title: "The Uncharted Archipelago",
      category: "Future Explorations",
      coordinates: "12° 40' N, 82° 10' W",
      island: "Terra Incognita",
      mapX: 42,
      mapY: 72,
      problem: "Currently charting new projects. This destination represents upcoming experiments in Python data scraping, creative canvas generative art, and algorithmic puzzle solvers.",
      technologies: ["Python Data Tools", "APIs", "Generative Art", "Algorithms"],
      contribution: "Researching design patterns, sketching architectures, and establishing test suites for future endeavors.",
      previewType: "placeholder",
      previewLabel: "Currently Charting New Waters",
      viewUrl: "#",
      sourceUrl: "https://github.com",
      status: "Currently Charting",
      featured: false
    }
  ],

  // --- THE CHART ROOM: LEARNING & INTERESTS ---
  // Pinned discovery notes across the navigation table
  chartRoom: {
    heading: "The Chart Room",
    subheading: "Pinned Discoveries, Current Inquiries & Future Horizons",
    categories: [
      {
        id: "active-learning",
        title: "Technologies Being Explored",
        badge: "Under Active Study",
        notes: [
          {
            title: "Python Data Structures & OOP",
            summary: "Deepening my grasp of classes, inheritance, dunder methods, and clean object-oriented architecture in Python.",
            status: "Active Exploration",
            quote: "Writing code that reads like well-structured prose."
          },
          {
            title: "Algorithmic Problem-Solving",
            summary: "Working through logic puzzles, recursion, and time complexity fundamentals on platforms like LeetCode and Codewars.",
            status: "Daily Practice",
            quote: "Sharpening analytical instincts through incremental challenges."
          },
          {
            title: "Web Canvas & Shader Graphics",
            summary: "Experimenting with 2D Canvas rendering, procedural particles, and fluid mathematics for creative web interfaces.",
            status: "Experimental",
            quote: "Bridging the gap between code and visual emotion."
          }
        ]
      },
      {
        id: "skills-horizon",
        title: "Skills on the Horizon",
        badge: "Next Waypoints",
        notes: [
          {
            title: "API Integration & RESTful Services",
            summary: "Connecting Python scripts with external web APIs (weather, astronomical data, public archives) to build dynamic tools.",
            status: "Upcoming Focus",
            quote: "Extracting meaning from the vast seas of public data."
          },
          {
            title: "Automated Testing & PyTest",
            summary: "Learning to write robust unit tests, assertions, and test fixtures to ensure reliable software behavior.",
            status: "Planning",
            quote: "Code is only as seaworthy as its test suite."
          }
        ]
      },
      {
        id: "creative-pursuits",
        title: "Creative Inquiries & Experiments",
        badge: "Mind & Imagination",
        notes: [
          {
            title: "Antique Cartography & Map Design",
            summary: "Studying 17th-century navigation charts, rhumb lines, typography, and hand-etched linework for digital adaptation.",
            status: "Ongoing Passion",
            quote: "Ancient maps were both scientific documents and works of fine art."
          },
          {
            title: "Soundscapes & Procedural Audio",
            summary: "Exploring how subtle Web Audio synthesis (gentle wave filters, wood timbre) enriches digital immersion without hefty media files.",
            status: "Interactive Research",
            quote: "Sound provides the subconscious texture of reality."
          },
          {
            title: "Pirate Lore & Maritime History",
            summary: "Fascinated by historical navigation instruments (astrolabes, sextants, dead reckoning) and the golden age of sail.",
            status: "Leisure & Study",
            quote: "Those who navigate by the stars never truly lose their way."
          }
        ]
      }
    ]
  },

  // --- SIGNATURE TREASURE CHEST SECRET ---
  treasureChest: {
    label: "Captain's Secret Chest",
    hint: "Click to inspect the ancient brass-bound chest",
    scrollTitle: "The Captain's Creed",
    scrollMotto: "« The sea of knowledge has no shore; the only compass is curiosity. »",
    scrollBody: "To whoever unlocks this dispatch: Skills are not born overnight, nor are great ships built in tranquil harbors. The voyage of mastering code and design is long and winding, but every curious experiment, every debugged error, and every thoughtful stroke of the compass brings us closer to the uncharted horizons.",
    author: "— Nehal Vyas, Ship's Log",
    year: "Anno 2026"
  }
};
