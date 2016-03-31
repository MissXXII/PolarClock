// arc.js
function Arc(outerRadius,arcWidth,color,_ctx){
    // Arc properties
    this.outerRadius = outerRadius;
    this.arcWidth = arcWidth;
    this.innerRadius = this.outerRadius - this.arcWidth;
    this.arcStartInDegree = 0;
    this._color = color;
    // Rounded corners properties
    this.cornerSize = 4;
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
    // Arc parameters (center coordinate X, center coordinate Y, radius, starting angle, ending angle, counterClockwise)
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


//// SEARCH TEXT ON SVG ARC ////////////////////////////////////////////////////////////////////////
Arc.prototype.drawArcText = function(time,angle,value){
    $('#svg').empty();
    var svgns = 'http://www.w3.org/2000/svg';
    var defs = document.createElementNS(svgns , 'defs');
    var path = document.createElementNS(svgns, 'path');
    var text = document.createElementNS(svgns, 'text');
    var textpath = document.createElementNS(svgns, 'textpath');

    path.setAttribute('id', 'timeInText');
    path.setAttribute( 'd' , this.arcText(250,250,200, 0, angle) );

    text.setAttribute('font-family','Verdana');
    text.setAttribute('font-size','15');
    text.setAttribute('text-anchor','end');

    textpath.setAttribute('xlink:href' , '#timeInText');
    textpath.setAttribute('startOffset' , '100%');
    textpath.setAttribute('id','textcurve');
    textpath.textContent=time+' '+value;

    defs.appendChild(path);
    text.appendChild(textpath);
    svg.appendChild(defs);
    svg.appendChild(text);

    $('#svg').css('border', '1px black solid');
    $("#cont").html($("#cont").html());

};


Arc.prototype.arcText = function(cx, cy, radius, startDegrees, endDegrees) {
    var offsetRadians = -Math.PI/2; // -Math.PI/2 for 12 o'clock
    var startRadians = offsetRadians + startDegrees * Math.PI / 180;
    var endRadians = offsetRadians + endDegrees * Math.PI / 180;
    var largeArc = ((endRadians - startRadians) % (2 * Math.PI)) > Math.PI ? 1 : 0;
    var startX = parseInt(cx + radius * Math.cos(startRadians));
    var startY = parseInt(cy + radius * Math.sin(startRadians));
    var endX = parseInt(cx + radius * Math.cos(endRadians));
    var endY = parseInt(cy + radius * Math.sin(endRadians));
    var space = " ";
    var arcData = "";
    arcData += "M" + space + startX + space + startY + space;
    arcData += "A" + space + radius + space + radius + space + offsetRadians + space + largeArc + space + 1 + space + endX + space + endY;
    return (arcData);
};
