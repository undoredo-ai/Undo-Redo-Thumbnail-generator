// Sound Service for UI interactions
class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private enabled: boolean = true;

  constructor() {
    // Initialize sounds using Web Audio API with base64 encoded beep sounds
    this.initializeSounds();
  }

  private initializeSounds() {
    // Create simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Helper to create a beep sound
    const createBeep = (frequency: number, duration: number, volume: number = 0.3) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      return { oscillator, gainNode, duration };
    };

    // Store sound creation functions
    this.sounds = {
      hover: this.createSound(() => createBeep(800, 0.05, 0.15)),
      click: this.createSound(() => createBeep(1200, 0.1, 0.25)),
      success: this.createSound(() => {
        const beep1 = createBeep(800, 0.08, 0.2);
        setTimeout(() => createBeep(1000, 0.08, 0.2).oscillator.start(), 50);
        return beep1;
      }),
      error: this.createSound(() => createBeep(300, 0.2, 0.3)),
      open: this.createSound(() => createBeep(600, 0.15, 0.2)),
      close: this.createSound(() => createBeep(400, 0.15, 0.2)),
    };
  }

  private createSound(soundFn: () => any): HTMLAudioElement {
    // Return a dummy audio element that triggers the sound function
    const audio = new Audio();
    (audio as any).soundFn = soundFn;
    return audio;
  }

  play(soundName: string) {
    if (!this.enabled) return;
    
    try {
      const sound = this.sounds[soundName];
      if (sound && (sound as any).soundFn) {
        const { oscillator } = (sound as any).soundFn();
        oscillator.start();
        oscillator.stop(oscillator.context.currentTime + 0.3);
      }
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundService = new SoundService();
