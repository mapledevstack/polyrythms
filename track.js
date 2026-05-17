class Track{
  constructor(center, radius, index, cosMultiple = 6, sinMultiple = 6){
    this.center = center;
    this.radius = radius;
    this.index = index;
    this.color = "white";
    this.cosMultiple = cosMultiple;
    this.sinMultiple = sinMultiple;
  }

  draw(ctx)
  {
    ctx.beginPath();
    for (let alpha = 0; alpha < 2 * Math.PI; alpha += 0.01) {
      const pos = this.getPosition(alpha);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.closePath();

    const colors = [
      "#4EFFC1",
      "#2BFFD3",
      "#00FFF5",
      "#00E5FF",
      "#00C3FF",
      "#0091FF",
      "#5C7CFA",
      "#9775FA",
      "#B197FC",
      "#E599F7",
      "#FF85E8",
      "#FF6AD5",
      "#FF5FA2"
    ];

    this.color = colors[this.index];
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  getPosition(angle)
  {
    return {
      x: this.center.x + this.radius * Math.cos(this.cosMultiple * angle),
      y: this.center.y - this.radius * Math.sin(this.sinMultiple * angle)
    };
  }
}
