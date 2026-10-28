/**
 * =======================================================================
 * SEND A MESSAGE ACROSS THE SEA — CONTACT CONTROLLER
 * Section 9: Real form validation, mailto dispatch, clipboard copy,
 * and persistent local transmission logbook
 * =======================================================================
 */

class ContactSeaController {
  constructor() {
    this.form = document.getElementById('captain-contact-form');
    this.statusAlert = document.getElementById('contact-status-alert');
    this.nameInput = document.getElementById('contact-name');
    this.emailInput = document.getElementById('contact-email');
    this.messageInput = document.getElementById('contact-message');
    this.submitBtn = document.getElementById('btn-send-dispatch');

    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Candlelight glow focus feedback
    [this.nameInput, this.emailInput, this.messageInput].forEach(field => {
      if (!field) return;
      field.addEventListener('focus', () => {
        field.style.boxShadow = '0 0 16px rgba(229, 199, 136, 0.45)';
      });
      field.addEventListener('blur', () => {
        field.style.boxShadow = '';
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.nameInput.value.trim();
    const email = this.emailInput.value.trim();
    const message = this.messageInput.value.trim();

    // 1. Validation
    if (!name) {
      this.showAlert("Please sign your name on the parchment.", "error");
      this.nameInput.focus();
      return;
    }

    if (!email || !this.validateEmail(email)) {
      this.showAlert("Please provide a valid return frequency / email address.", "error");
      this.emailInput.focus();
      return;
    }

    if (!message || message.length < 10) {
      this.showAlert("Your message must be at least 10 characters long to cross the sea.", "error");
      this.messageInput.focus();
      return;
    }

    // Play brass click
    if (window.shipSoundscape) {
      window.shipSoundscape.playBrassClick();
    }

    // 2. Prepare Formatted Dispatch
    const captainEmail = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.captain.email : "nehalvyas@example.com";
    const subject = encodeURIComponent(`Dispatch from ${name} via Voyage Portfolio`);
    const body = encodeURIComponent(`Greetings Nehal,\n\n${message}\n\nFrom: ${name} (${email})\nSent: ${new Date().toLocaleString()}`);

    const mailtoUrl = `mailto:${captainEmail}?subject=${subject}&body=${body}`;

    // 3. Save to Local Logbook Records
    this.saveToLocalLogbook({ name, email, message, date: new Date().toISOString() });

    // 4. Genuine Status Feedback & Actionable Delivery
    this.showAlert(`
      <strong>Dispatch Sealed!</strong><br>
      Your message has been inscribed into the local logbook.<br>
      <div style="margin-top: 0.6rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
        <a href="${mailtoUrl}" class="btn-project-ink" style="padding: 4px 10px; font-size: 0.76rem;">Launch Mail Client Directly</a>
        <button type="button" id="btn-copy-dispatch" class="btn-project-ghost" style="padding: 4px 10px; font-size: 0.76rem;">Copy Message Text</button>
      </div>
    `, "success");

    // Copy to clipboard handler
    const copyBtn = document.getElementById('btn-copy-dispatch');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const fullText = `Dispatch to Nehal Vyas\nFrom: ${name} (${email})\nMessage:\n${message}`;
        navigator.clipboard.writeText(fullText).then(() => {
          copyBtn.innerText = "✓ Copied to Clipboard!";
          setTimeout(() => { copyBtn.innerText = "Copy Message Text"; }, 2500);
        });
      });
    }

    // Attempt direct mailto prompt after brief delay
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);

    // Reset inputs
    this.form.reset();
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showAlert(htmlContent, type) {
    if (!this.statusAlert) return;
    this.statusAlert.innerHTML = htmlContent;
    this.statusAlert.className = `form-status-alert ${type}`;
    this.statusAlert.style.display = 'block';
  }

  saveToLocalLogbook(entry) {
    try {
      const existing = JSON.parse(localStorage.getItem('captain_dispatches') || '[]');
      existing.push(entry);
      localStorage.setItem('captain_dispatches', JSON.stringify(existing));
    } catch (e) {
      console.warn("Local logbook storage unavailable.");
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.contactSeaController = new ContactSeaController();
});

