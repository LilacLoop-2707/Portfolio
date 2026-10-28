/**
 * =======================================================================
 * THE CAPTAIN'S LOGBOOK — MAIN INITIALIZER & DATA BINDER
 * Coordinates config data injection, skills rendering, and chart room notes
 * =======================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.PORTFOLIO_CONFIG;
  if (!cfg) {
    console.error("Portfolio configuration not loaded.");
    return;
  }

  // 1. Populate Captain & Vessel Identity
  bindCaptainIdentity(cfg.captain);

  // 2. Populate About Section Logbook
  bindAboutLogbook(cfg.about, cfg.captain);

  // 3. Populate Skills & Nautical Instruments
  bindSkillsInstruments(cfg.skills);

  // 4. Populate The Chart Room Discoveries
  bindChartRoomNotes(cfg.chartRoom);

  // 5. Populate Treasure Chest Scroll
  bindTreasureChestScroll(cfg.treasureChest);
});

/**
 * Binds Captain & Vessel Header / Hero Data
 */
function bindCaptainIdentity(captain) {
  // Top Header Bar
  const coordElem = document.getElementById('ship-header-coords');
  if (coordElem) coordElem.textContent = captain.coordinates;

  const statusElem = document.getElementById('ship-header-status');
  if (statusElem) statusElem.textContent = `${captain.vessel} • ${captain.flagshipStatus}`;

  // Hero Section
  const heroLog = document.getElementById('hero-log-number');
  if (heroLog) heroLog.textContent = `LOGBOOK ${captain.logNumber}`;

  const heroName = document.getElementById('hero-captain-name');
  if (heroName) heroName.textContent = captain.name;

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.textContent = captain.tagline;

  const heroIntro = document.getElementById('hero-intro');
  if (heroIntro) heroIntro.textContent = captain.intro;

  // Contact Channels
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) {
    emailLink.href = `mailto:${captain.email}`;
    emailLink.textContent = captain.email;
  }

  const githubLink = document.getElementById('contact-github-link');
  if (githubLink) githubLink.href = captain.github;

  const linkedinLink = document.getElementById('contact-linkedin-link');
  if (linkedinLink) linkedinLink.href = captain.linkedin;
}

/**
 * Binds About Section (Section 5)
 */
function bindAboutLogbook(about, captain) {
  const headingElem = document.getElementById('about-logbook-heading');
  if (headingElem) headingElem.textContent = about.heading;

  const bioContainer = document.getElementById('about-bio-container');
  if (bioContainer) {
    bioContainer.innerHTML = about.biography
      .map(p => `<p class="logbook-paragraph">${p}</p>`)
      .join('');
  }

  // Right page metadata
  const portraitName = document.getElementById('about-portrait-name');
  if (portraitName) portraitName.textContent = captain.name;

  const portraitStatus = document.getElementById('about-portrait-status');
  if (portraitStatus) portraitStatus.textContent = captain.statusBadge;

  const portraitCoords = document.getElementById('about-portrait-coords');
  if (portraitCoords) portraitCoords.textContent = captain.coordinates;

  const portraitCourse = document.getElementById('about-portrait-course');
  if (portraitCourse) portraitCourse.textContent = captain.currentCourse;
}

/**
 * Binds Skills & Nautical Instruments (Section 6)
 */
function bindSkillsInstruments(skills) {
  // 1. Python Programming Instrument
  const pythonContainer = document.getElementById('skills-python-topics');
  if (pythonContainer && skills.python) {
    pythonContainer.innerHTML = skills.python.topics.map(t => `
      <div class="topic-row-item">
        <div class="topic-meta-line">
          <span class="topic-name">${t.name}</span>
          <span class="badge-proficiency badge-${t.status.toLowerCase()}">${t.status}</span>
        </div>
        <p class="topic-desc">${t.desc}</p>
      </div>
    `).join('');
  }

  // 2. Design Instrument
  const designContainer = document.getElementById('skills-design-topics');
  if (designContainer && skills.design) {
    designContainer.innerHTML = skills.design.topics.map(t => `
      <div class="topic-row-item">
        <div class="topic-meta-line">
          <span class="topic-name">${t.name}</span>
          <span class="badge-proficiency badge-${t.status.toLowerCase()}">${t.status}</span>
        </div>
        <p class="topic-desc">${t.desc}</p>
      </div>
    `).join('');
  }

  // 3. Tools & Technologies Grid
  const toolsContainer = document.getElementById('skills-tools-grid');
  if (toolsContainer && skills.tools) {
    toolsContainer.innerHTML = skills.tools.items.map(tool => `
      <div class="tool-badge-card">
        <div class="tool-badge-name">${tool.name}</div>
        <span class="badge-proficiency badge-${tool.status.toLowerCase()}">${tool.status}</span>
      </div>
    `).join('');
  }
}

/**
 * Binds The Chart Room Notes (Section 8)
 */
function bindChartRoomNotes(chartRoom) {
  const container = document.getElementById('chart-room-grid');
  if (!container || !chartRoom.categories) return;

  container.innerHTML = chartRoom.categories.map(cat => `
    <div class="chart-column-board">
      <div class="chart-column-header">
        <h3 class="chart-column-title">${cat.title}</h3>
        <span class="chart-column-badge">${cat.badge}</span>
      </div>
      <div class="pinned-notes-stack">
        ${cat.notes.map(note => `
          <div class="pinned-note-card" tabindex="0" role="article">
            <div class="brass-pushpin"></div>
            <h4 class="note-card-title">${note.title}</h4>
            <p class="note-card-summary">${note.summary}</p>
            <div class="note-card-quote">${note.quote}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/**
 * Binds Treasure Chest Scroll (Section 10)
 */
function bindTreasureChestScroll(chestData) {
  const title = document.getElementById('chest-scroll-title');
  if (title) title.textContent = chestData.scrollTitle;

  const motto = document.getElementById('chest-scroll-motto');
  if (motto) motto.textContent = chestData.scrollMotto;

  const body = document.getElementById('chest-scroll-body');
  if (body) body.textContent = chestData.scrollBody;

  const author = document.getElementById('chest-scroll-author');
  if (author) author.textContent = `${chestData.author} • ${chestData.year}`;
}
