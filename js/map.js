/**
 * =======================================================================
 * THE CAPTAIN'S NAUTICAL MAP & EXPEDITION WAYPOINTS
 * Section 7: Interactive Antique Nautical Map & Dynamic Project Cards
 * =======================================================================
 */

class NauticalMapController {
  constructor() {
    this.mapSvg = document.getElementById('nautical-map-svg');
    this.cardContainer = document.getElementById('project-detail-card-container');
    this.projects = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.projects : [];
    this.selectedProjectIndex = 0;
    this.shipCoordinates = { x: 14, y: 76 }; // Ship starting point in coordinates %

    this.init();
  }

  init() {
    if (!this.mapSvg || !this.projects.length) return;

    this.renderMapElements();
    this.renderProjectCard(this.selectedProjectIndex);
    this.traceRouteTo(this.projects[this.selectedProjectIndex]);
  }

  renderMapElements() {
    // 1. Draw Rhumb Lines & Compass Rose in Background
    const rhumbGroup = document.getElementById('map-rhumb-lines-group');
    if (rhumbGroup) {
      rhumbGroup.innerHTML = `
        <circle cx="500" cy="240" r="160" fill="none" stroke="rgba(184, 149, 85, 0.12)" stroke-dasharray="3,4"/>
        <line x1="500" y1="0" x2="500" y2="480" class="map-rhumb-line"/>
        <line x1="0" y1="240" x2="1000" y2="240" class="map-rhumb-line"/>
        <line x1="100" y1="0" x2="900" y2="480" class="map-rhumb-line"/>
        <line x1="900" y1="0" x2="100" y2="480" class="map-rhumb-line"/>
        <!-- Compass rose watermark -->
        <g transform="translate(460, 200) scale(0.4)" opacity="0.25">
          <use href="assets/svg/compass-rose.svg#root"/>
        </g>
      `;
    }

    // 2. Draw Islands and Destination Markers
    const islandsGroup = document.getElementById('map-islands-group');
    const markersGroup = document.getElementById('map-markers-group');

    if (!markersGroup || !islandsGroup) return;

    // Custom hand-drawn style island contours
    const islandShapes = [
      "M 190 140 C 240 120 270 170 240 210 C 210 230 170 200 160 170 Z", // Isle of Logbook
      "M 480 110 C 540 90 580 130 550 170 C 510 190 470 160 460 130 Z", // Archipelago of Logic
      "M 710 240 C 770 220 800 270 770 320 C 730 340 680 300 690 260 Z", // Sounding Reef
      "M 380 320 C 440 300 480 340 440 390 C 390 410 350 370 360 340 Z"  // Terra Incognita
    ];

    let islandsHtml = '';
    this.projects.forEach((proj, idx) => {
      const shape = islandShapes[idx % islandShapes.length];
      islandsHtml += `
        <path d="${shape}" class="map-island-path ${idx === this.selectedProjectIndex ? 'active' : ''}" data-index="${idx}"/>
      `;
    });
    islandsGroup.innerHTML = islandsHtml;

    // Destination Markers
    let markersHtml = '';
    this.projects.forEach((proj, idx) => {
      const pixelX = (proj.mapX / 100) * 1000;
      const pixelY = (proj.mapY / 100) * 480;
      const isActive = idx === this.selectedProjectIndex;

      markersHtml += `
        <g class="destination-marker-group ${isActive ? 'active' : ''}" 
           transform="translate(${pixelX}, ${pixelY})" 
           data-index="${idx}"
           tabindex="0"
           role="button"
           aria-label="Destination ${proj.title}">
          <!-- Pulsing Beacon Circle -->
          <circle cx="0" cy="0" r="10" fill="none" stroke="${isActive ? '#E5C788' : '#B89555'}" class="marker-beacon-circle"/>
          <!-- Outer Brass Anchor Ring -->
          <circle cx="0" cy="0" r="7" fill="#10191C" stroke="#B89555" stroke-width="2"/>
          <!-- Inner Gold Jewel -->
          <circle cx="0" cy="0" r="3.5" fill="${isActive ? '#FFF4D0' : '#B89555'}"/>
          <!-- Island Label Banner -->
          <rect x="-55" y="14" width="110" height="20" rx="3" fill="rgba(16, 25, 28, 0.88)" stroke="#B89555" stroke-width="0.8"/>
          <text x="0" y="28" text-anchor="middle" fill="#F4EBDD" font-family="'Courier Prime', monospace" font-size="9.5" letter-spacing="0.5">${proj.island}</text>
        </g>
      `;
    });

    // Add Ship Position Icon
    const shipPixelX = (this.shipCoordinates.x / 100) * 1000;
    const shipPixelY = (this.shipCoordinates.y / 100) * 480;
    markersHtml += `
      <g id="map-ship-pin" transform="translate(${shipPixelX}, ${shipPixelY})">
        <circle cx="0" cy="0" r="14" fill="rgba(24, 54, 58, 0.8)" stroke="#B89555" stroke-width="1.5"/>
        <polygon points="0,-8 6,6 -6,6" fill="#F4EBDD"/>
        <text x="0" y="24" text-anchor="middle" fill="#E5C788" font-family="'Courier Prime', monospace" font-size="9">THE CURIOSITY</text>
      </g>
    `;

    markersGroup.innerHTML = markersHtml;

    // Attach Event Listeners to Map Markers & Islands
    this.mapSvg.querySelectorAll('.destination-marker-group, .map-island-path').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const idx = parseInt(elem.getAttribute('data-index'), 10);
        if (!isNaN(idx)) {
          this.selectProject(idx);
        }
      });
      elem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(elem.getAttribute('data-index'), 10);
          if (!isNaN(idx)) this.selectProject(idx);
        }
      });
    });
  }

  selectProject(index) {
    if (this.selectedProjectIndex === index) return;
    this.selectedProjectIndex = index;

    if (window.shipSoundscape) {
      window.shipSoundscape.playBrassClick();
    }

    // Update active classes
    this.mapSvg.querySelectorAll('.destination-marker-group').forEach(m => {
      const idx = parseInt(m.getAttribute('data-index'), 10);
      m.classList.toggle('active', idx === index);
      const innerDot = m.querySelector('circle:nth-child(3)');
      if (innerDot) innerDot.setAttribute('fill', idx === index ? '#FFF4D0' : '#B89555');
    });

    this.mapSvg.querySelectorAll('.map-island-path').forEach(isl => {
      const idx = parseInt(isl.getAttribute('data-index'), 10);
      isl.classList.toggle('active', idx === index);
    });

    // Trace illuminated route
    this.traceRouteTo(this.projects[index]);

    // Render detailed project parchment card
    this.renderProjectCard(index);
  }

  traceCurrentRoute() {
    this.traceRouteTo(this.projects[this.selectedProjectIndex]);
  }

  traceRouteTo(project) {
    const routeGroup = document.getElementById('map-route-group');
    if (!routeGroup) return;

    const startX = (this.shipCoordinates.x / 100) * 1000;
    const startY = (this.shipCoordinates.y / 100) * 480;
    const targetX = (project.mapX / 100) * 1000;
    const targetY = (project.mapY / 100) * 480;

    // Curving nautical trajectory
    const midX = (startX + targetX) * 0.5 + (startY > targetY ? -40 : 40);
    const midY = (startY + targetY) * 0.5 - 30;

    const pathData = `M ${startX} ${startY} Q ${midX} ${midY} ${targetX} ${targetY}`;

    routeGroup.innerHTML = `
      <path d="${pathData}" class="map-route-trail anim-trace-route"/>
    `;
  }

  renderProjectCard(index) {
    const proj = this.projects[index];
    if (!this.cardContainer || !proj) return;

    // Format tech tags
    const techTagsHtml = proj.technologies.map(t => `<span class="tech-tag-parchment">${t}</span>`).join('');

    // Dynamic Preview Box based on previewType
    let previewBoxHtml = '';
    if (proj.previewType === 'code') {
      previewBoxHtml = `
        <div style="background: #192629; border: 1px solid #B89555; border-radius: 4px; padding: 1rem; margin-bottom: 1.5rem; font-family: 'Courier Prime', monospace; font-size: 0.8rem; color: #E8D8B5; overflow-x: auto;">
          <div style="color: #718B83; margin-bottom: 0.5rem;"># --- PyLog CLI Module ---</div>
          <div><span style="color: #B89555;">def</span> <span style="color: #E5C788;">log_expedition_entry</span>(title, category):</div>
          <div style="padding-left: 1.5rem;"><span style="color: #A3D4C5;">"""Records voyage log to local JSON repository."""</span></div>
          <div style="padding-left: 1.5rem;">entry = { <span style="color: #E8AB85;">"timestamp"</span>: get_nautical_time(), <span style="color: #E8AB85;">"status"</span>: <span style="color: #E8AB85;">"charted"</span> }</div>
          <div style="padding-left: 1.5rem;"><span style="color: #B89555;">return</span> serialize_log_markdown(entry)</div>
        </div>
      `;
    } else if (proj.previewType === 'visual') {
      previewBoxHtml = `
        <div style="background: #142226; border: 1px solid #B89555; border-radius: 4px; padding: 1.2rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-around;">
          <div style="text-align: center;">
            <svg width="60" height="60" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#B89555" stroke-width="2"/>
              <line x1="50" y1="50" x2="78" y2="28" stroke="#E5C788" stroke-width="3" stroke-linecap="round"/>
              <circle cx="50" cy="50" r="5" fill="#B33E35"/>
            </svg>
            <div style="font-family: 'Courier Prime', monospace; font-size: 0.72rem; color: #B89555; margin-top: 4px;">θ = 42.8° RAD</div>
          </div>
          <div style="font-family: 'Courier Prime', monospace; font-size: 0.8rem; color: #F4EBDD; max-width: 380px;">
            <div style="color: #718B83; font-weight: bold; margin-bottom: 4px;">// Vector Trigonometry Kernel</div>
            <p>Calculates dead reckoning bearing vectors, needle angular damping, and real-time screen coordinate projections.</p>
          </div>
        </div>
      `;
    } else if (proj.previewType === 'placeholder') {
      previewBoxHtml = `
        <div style="background: rgba(24, 54, 58, 0.2); border: 1px dashed #B89555; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center;">
          <div style="font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: #49382A; font-weight: bold; margin-bottom: 0.4rem;">
            « Terra Incognita — Uncharted Waters »
          </div>
          <p style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #6E5742; max-width: 500px; margin: 0 auto;">
            This destination is reserved for upcoming Python algorithmic challenges, automated scrapers, and data analysis pipelines currently under construction.
          </p>
        </div>
      `;
    }

    // Buttons
    const viewButton = proj.viewUrl && proj.viewUrl !== '#'
      ? `<a href="${proj.viewUrl}" target="_blank" rel="noopener" class="btn-project-ink">
           <span>View Project</span>
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
         </a>`
      : `<button class="btn-project-ink" onclick="alert('You are currently viewing this interactive voyage experience!')">
           <span>Current Experience</span>
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
         </button>`;

    const sourceButton = proj.sourceUrl
      ? `<a href="${proj.sourceUrl}" target="_blank" rel="noopener" class="btn-project-ghost">
           <span>View Source</span>
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
         </a>`
      : '';

    this.cardContainer.innerHTML = `
      <div class="project-card-display anim-unfurl">
        <!-- Parchment Corner Tabs -->
        <div class="corner-bracket corner-top-left" style="border-color: #B89555;"></div>
        <div class="corner-bracket corner-top-right" style="border-color: #B89555;"></div>

        <div class="project-card-meta-bar">
          <div><span>WAYPOINT:</span> <strong>${proj.coordinates}</strong></div>
          <div><span>DESTINATION:</span> <strong>${proj.island}</strong></div>
          <div><span>STATUS:</span> <strong>${proj.status}</strong></div>
        </div>

        <h3 class="project-card-title">${proj.title}</h3>
        
        <p class="project-card-desc">
          <strong>The Problem:</strong> ${proj.problem}
        </p>

        <p class="project-card-desc" style="margin-top: -0.6rem; margin-bottom: 1.4rem;">
          <strong>My Contribution:</strong> ${proj.contribution}
        </p>

        ${previewBoxHtml}

        <div class="project-section-subtitle">Instruments & Technologies:</div>
        <div class="project-tech-tags-row">
          ${techTagsHtml}
        </div>

        <div class="project-actions-row">
          ${viewButton}
          ${sourceButton}
        </div>
      </div>
    `;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.nauticalMapController = new NauticalMapController();
});

