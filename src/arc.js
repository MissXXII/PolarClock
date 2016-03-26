// arc.js
function Arc(outerRadius,arcWidth,color,_ctx){
    // Arc properties
    this.outerRadius = outerRadius;
    this.arcWidth = arcWidth;
    this.innerRadius = this.outerRadius - this.arcWidth;
    this.arcStartInDegree = 1;
    this._color = color;
    // Rounded corners properties
    this.cornerSize = 3;
    this.ctx = _ctx;
}

Arc.prototype.drawArc = function (timeInDegree){
    //this.ctx = ctx;
    this.arcEndInDegree = timeInDegree;
    this.outerCornerX = (this.outerRadius - this.cornerSize) * (Math.cos((this.arcEndInDegree) * (Math.PI / 180)));
    this.outerCornerY = (this.outerRadius - this.cornerSize) * (Math.sin((this.arcEndInDegree) * (Math.PI / 180)));
    this.innerCornerX = (this.innerRadius + this.cornerSize) * (Math.cos((this.arcEndInDegree) * (Math.PI / 180)));
    this.innerCornerY = (this.innerRadius + this.cornerSize) * (Math.sin((this.arcEndInDegree) * (Math.PI / 180)));
    this.outerCornerArcStart = (0 + this.arcEndInDegree) * (Math.PI / 180);
    this.outerCornerArcEnd = (90 + this.arcEndInDegree) * (Math.PI / 180);
    this.innerCornerArcStart = (90 + this.arcEndInDegree) * (Math.PI / 180);
    this.innerCornerArcEnd = (180 + this.arcEndInDegree) * (Math.PI / 180);

    this.ctx.save();
    // Start drawing
    this.ctx.beginPath();
    //Start inner rounded corner
    this.ctx.arc(this.innerRadius + this.cornerSize, 0, this.cornerSize, 180 * (Math.PI / 180), 270 * (Math.PI / 180), false);
    //Start outer rounded corner
    this.ctx.arc(this.outerRadius - this.cornerSize, 0, this.cornerSize, 270 * (Math.PI / 180), 0 * (Math.PI / 180), false);
    //Outer arc
    this.ctx.arc(0, 0, this.outerRadius, (this.arcStartInDegree * (Math.PI / 180)), (this.arcEndInDegree * (Math.PI / 180)), false);
    //Extrimity outer rounded corner
    this.ctx.arc(this.outerCornerX, this.outerCornerY, this.cornerSize, this.outerCornerArcStart, this.outerCornerArcEnd, false);
    //Extrimity inner rounded corner
    this.ctx.arc(this.innerCornerX, this.innerCornerY, this.cornerSize, this.innerCornerArcStart, this.innerCornerArcEnd, false);
    //Inner arc
    this.ctx.arc(0, 0, this.innerRadius, (this.arcEndInDegree * (Math.PI / 180)), (this.arcStartInDegree * (Math.PI / 180)), true);
    this.ctx.closePath();
    this.ctx.fillStyle = this._color;
    this.ctx.fill();
    this.ctx.restore();

};
