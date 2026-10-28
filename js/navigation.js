/**
 * =======================================================================
 * THE SHIP'S CONTROL PANEL — NAVIGATION & SECTION TRANSITIONS
 * Manages desktop brass controls, mobile journal menu, and signature animations
 * =======================================================================
 */

class ShipNavigation {
  constructor() {
    this.navButtons = document.querySelectorAll('.nav-item-btn, .mobile-nav-link');
    this.sections = document.querySelectorAll('.portfolio-section, .hero-section');
    this.mobileToggle = document.querySelector('.mobile-nav-toggle');
    this.mobileDrawer = document.querySelector('.mobile-nav-drawer');

    this.init();
  }

  init() {
    this.setupClickHandlers();
    this.setupScrollSpy();
    this.setupMobileMenu();
    this.setupReducedMotionToggle();
  }

  setupClickHandlers() {
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('href') || btn.getAttribute('data-target');
        if (!targetId || !targetId.startsWith('#')) return;

        e.preventDefault();
        const targetElem = document.querySelector(targetId);
        if (!targetElem) return;

        // Play subtle metallic brass click
        if (window.shipSoundscape) {
          window.shipSoundscape.playBrassClick();
        }

        // Close mobile drawer if open
        if (this.mobileDrawer && this.mobileDrawer.classList.contains('open')) {
          this.toggleMobileMenu(false);
        }

        // Trigger signature interaction animation for the targeted section (Section 4 Requirements)
        this.triggerSectionAnimation(targetId);

        // Smooth scroll to section
        targetElem.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /**
   * Signature Section Animations (Section 4 & 11)
   */
  triggerSectionAnimation(sectionId) {
    // If reduced motion is active, do not force heavy re-animations
    if (document.body.classList.contains('reduced-motion')) return;

    if (sectionId === '#about') {
      // Captain's Log: Rolled parchment unfurls horizontally
      const pages = document.querySelector('.logbook-pages-wrapper');
      if (pages) {
        pages.classList.remove('anim-unfurl');
        void pages.offsetWidth; // trigger reflow
        pages.classList.add('anim-unfurl');
      }
    } else if (sectionId === '#skills') {
      // Skills & Tools: Brass compass rotates and settles toward a direction
      const compassIcons = document.querySelectorAll('.instrument-icon-housing svg');
      compassIcons.forEach(icon => {
        icon.classList.remove('anim-compass-rotate');
        void icon.offsetWidth;
        icon.classList.add('anim-compass-rotate');
      });
    } else if (sectionId === '#projects') {
      // My Voyage: Glowing route traces itself across the map
      if (window.nauticalMapController) {
        window.nauticalMapController.traceCurrentRoute();
      }
    } else if (sectionId === '#chart-room') {
      // The Chart Room: Compass divider animation / notes reveal
      const notes = document.querySelectorAll('.pinned-note-card');
      notes.forEach((note, index) => {
        note.style.opacity = '0';
        note.style.transform = 'translateY(16px)';
        setTimeout(() => {
          note.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          note.style.opacity = '1';
          note.style.transform = 'translateY(0)';
        }, index * 80);
      });
    } else if (sectionId === '#contact') {
      // Contact the Captain: Message scroll unfurls
      const scroll = document.querySelector('.message-scroll-unfolded');
      if (scroll) {
        scroll.classList.remove('anim-unfurl');
        void scroll.offsetWidth;
        scroll.classList.add('anim-unfurl');
      }
    }
  }

  setupScrollSpy() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          this.setActiveButton(id);
          entry.target.classList.add('in-view');
        }
      });
    }, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    });

    this.sections.forEach(section => {
      section.classList.add('section-reveal');
      observer.observe(section);
    });
  }

  setActiveButton(sectionId) {
    this.navButtons.forEach(btn => {
      const href = btn.getAttribute('href') || btn.getAttribute('data-target');
      if (href === sectionId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  setupMobileMenu() {
    if (!this.mobileToggle || !this.mobileDrawer) return;

    this.mobileToggle.addEventListener('click', () => {
      const isOpen = this.mobileDrawer.classList.contains('open');
      this.toggleMobileMenu(!isOpen);
    });

    const closeBtn = document.querySelector('.mobile-nav-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.toggleMobileMenu(false));
    }
  }

  toggleMobileMenu(open) {
    if (open) {
      this.mobileDrawer.classList.add('open');
      this.mobileToggle.setAttribute('aria-expanded', 'true');
    } else {
      this.mobileDrawer.classList.remove('open');
      this.mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  setupReducedMotionToggle() {
    const btn = document.getElementById('btn-motion-toggle');
    if (!btn) return;

    // Check system preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
      this.updateMotionButton(btn, true);
    }

    btn.addEventListener('click', () => {
      const isReduced = document.body.classList.toggle('reduced-motion');
      this.updateMotionButton(btn, isReduced);
      if (window.shipSoundscape) window.shipSoundscape.playBrassClick();
    });
  }

  updateMotionButton(btn, isReduced) {
    if (isReduced) {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
        <span>Motion: Reduced</span>
      `;
      btn.classList.add('active');
    } else {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Motion: Full</span>
      `;
      btn.classList.remove('active');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.shipNavigation = new ShipNavigation();
});
