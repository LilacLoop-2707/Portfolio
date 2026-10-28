/**
 * =======================================================================
 * THE CAPTAIN'S TREASURE CHEST — SIGNATURE INTERACTION
 * Section 10: Smooth lock rotation, lid opening, warm golden glow, and motto parchment
 * =======================================================================
 */

class TreasureChestController {
  constructor() {
    this.triggerBtn = document.querySelector('.chest-trigger-btn');
    this.chestSvg = document.querySelector('.treasure-chest-svg');
    this.modalOverlay = document.querySelector('.chest-modal-overlay');
    this.closeBtn = document.querySelector('.btn-close-scroll');
    this.isUnlocked = false;

    this.init();
  }

  init() {
    if (!this.triggerBtn || !this.modalOverlay) return;

    this.triggerBtn.addEventListener('click', () => this.unlockChest());
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Close when clicking modal backdrop
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    // Keyboard support: Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay.classList.contains('open')) {
        this.closeModal();
      }
    });
  }

  unlockChest() {
    if (this.isUnlocked) {
      this.openModal();
      return;
    }

    // Step 1: Play sound if active
    if (window.shipSoundscape) {
      window.shipSoundscape.playChestUnlock();
    }

    // Step 2: Trigger chest SVG unlock animation
    if (this.chestSvg) {
      this.chestSvg.classList.add('chest-unlocked');
    }

    // Step 3: Reveal modal scroll after lid hinges open (500ms delay)
    setTimeout(() => {
      this.isUnlocked = true;
      this.openModal();
    }, 550);
  }

  openModal() {
    this.modalOverlay.classList.add('open');
    this.modalOverlay.setAttribute('aria-hidden', 'false');
    
    // Focus close button for accessibility
    if (this.closeBtn) {
      setTimeout(() => this.closeBtn.focus(), 150);
    }
  }

  closeModal() {
    this.modalOverlay.classList.remove('open');
    this.modalOverlay.setAttribute('aria-hidden', 'true');
    if (this.triggerBtn) {
      this.triggerBtn.focus();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.treasureChestController = new TreasureChestController();
});

