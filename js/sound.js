/**
 * =======================================================================
 * THE SHIP'S SOUNDSCAPE — PROCEDURAL WEB AUDIO SYNTHESIS
 * 100% synthesized in-browser: gentle ocean swells, brass navigation clicks,
 * and antique chest unlock acoustics without heavy external audio files.
 * =======================================================================
 */

class ShipSoundscape {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = false;
    this.oceanGain = null;
    this.oceanSource = null;
    this.btnToggle = document.getElementById('btn-sound-toggle');

    this.init();
  }

  init() {
    if (this.btnToggle) {
      this.btnToggle.addEventListener('click', () => this.toggleSound());
    }
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.initContext();
    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startOceanAmbient();
      if (this.btnToggle) {
        this.btnToggle.classList.add('active');
        this.btnToggle.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <span>Sea Audio: On</span>
        `;
      }
      this.playBrassClick();
    } else {
      this.stopOceanAmbient();
      if (this.btnToggle) {
        this.btnToggle.classList.remove('active');
        this.btnToggle.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
          <span>Sea Audio: Off</span>
        `;
      }
    }
  }

  /**
   * Procedural Ocean Wave Generator
   * Generates continuous rolling sea wash using filtered pink noise and LFO modulation
   */
  startOceanAmbient() {
    if (!this.audioCtx) return;

    // Buffer length: 4 seconds of noise
    const bufferSize = this.audioCtx.sampleRate * 4;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink noise approximation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    this.oceanSource = this.audioCtx.createBufferSource();
    this.oceanSource.buffer = noiseBuffer;
    this.oceanSource.loop = true;

    // Filter simulating ocean underwater damping & surf crest
    const lowpass = this.audioCtx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 340;

    // Wave swell LFO
    const lfo = this.audioCtx.createOscillator();
    lfo.frequency.value = 0.14; // wave cycle every ~7 seconds
    const lfoGain = this.audioCtx.createGain();
    lfoGain.gain.value = 160;
    lfo.connect(lowpass.frequency);
    lfo.start();

    this.oceanGain = this.audioCtx.createGain();
    this.oceanGain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
    this.oceanGain.gain.exponentialRampToValueAtTime(0.06, this.audioCtx.currentTime + 3);

    this.oceanSource.connect(lowpass);
    lowpass.connect(this.oceanGain);
    this.oceanGain.connect(this.audioCtx.destination);

    this.oceanSource.start();
  }

  stopOceanAmbient() {
    if (this.oceanGain && this.audioCtx) {
      this.oceanGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
      setTimeout(() => {
        if (this.oceanSource) {
          try { this.oceanSource.stop(); } catch (e) {}
        }
      }, 900);
    }
  }

  /**
   * Brass Instrument Click
   * Soft metallic tick when clicking navigation buttons or nautical dial
   */
  playBrassClick() {
    if (!this.isEnabled || !this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, this.audioCtx.currentTime + 0.04);

    filter.type = 'bandpass';
    filter.frequency.value = 1600;
    filter.Q.value = 4;

    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.06);
  }

  /**
   * Treasure Chest Unlock Sound
   * Mechanical key tumbler click followed by warm golden resonant tone
   */
  playChestUnlock() {
    if (!this.isEnabled || !this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    // 1. Mechanical Tumbler Click 1
    this.playClickAt(now, 850);
    // Tumbler Click 2
    this.playClickAt(now + 0.12, 1150);

    // 2. Warm Golden Shimmer Bell
    const chord = [392.00, 493.88, 587.33, 783.99]; // G Major Triad + Octave
    chord.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.25 + idx * 0.06);

      gain.gain.setValueAtTime(0.04, now + 0.25 + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + 0.25 + idx * 0.06);
      osc.stop(now + 2.0);
    });
  }

  playClickAt(time, freq) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(100, time + 0.03);

    gain.gain.setValueAtTime(0.07, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.05);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.shipSoundscape = new ShipSoundscape();
});

