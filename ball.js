class Ball {
  static audioContext = null;

  constructor(track, ballRadius, angle, omega, index) {
    this.track = track;
    this.ballRadius = ballRadius;
    this.angle = angle;
    this.omega = omega;
    this.index = this.track.index;
    this.previousY = this.track.getPosition(angle).y;
  }

  draw(ctx) {
    ctx.beginPath();
    const pos = this.track.getPosition(this.angle);
    ctx.arc(pos.x, pos.y, this.ballRadius, 0, 2 * Math.PI);

    ctx.fillStyle = this.track.color;
    ctx.fill();
  }

  move() {
    const nextAngle = this.angle + this.omega;
    const nextY = this.track.getPosition(nextAngle).y;
    const centerY = this.track.center.y;

    const crossesAxis = (this.previousY > centerY && nextY <= centerY) || (this.previousY < centerY && nextY >= centerY);

    this.angle = nextAngle;
    this.previousY = nextY;

    if (crossesAxis) {
      this.playSound();
    }
  }

  static getAudioContext() {
    if (!Ball.audioContext) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) {
        return null;
      }
      Ball.audioContext = new AudioCtor();
    }
    return Ball.audioContext;
  }

  playSound() {
    if (!window.soundEnabled) {
      return;
    }

    const audioCtx = Ball.getAudioContext();
    if (!audioCtx) {
      return;
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    gain.connect(audioCtx.destination);

    const oscillator = audioCtx.createOscillator();
    oscillator.type = "triangle";
    const frequency = Math.max(220, Math.min(520, 520 - this.track.radius * 0.9));
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.connect(gain);
    oscillator.start(now);
    oscillator.stop(now + 0.06);
  }
}
