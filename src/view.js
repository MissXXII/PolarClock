function View(model) {
    EventEmitter.call(this);
    this._model = model;
    this.ctx = $('#canvas')[0].getContext('2d');
    // All the DOM elements to get
    this._elements = ['hour', 'minute', 'second', 'millisecond'];
    this._getElements();
    this._init();
    this._bindActions();

}

View.prototype = Object.create(EventEmitter.prototype);
View.prototype.constructor = View;

View.prototype._init = function() {
    this._redraw();
};

// Get all the DOM elements and bind emit
// Basically, it transforms DOM event into View event
View.prototype._getElements = function() {
    this._elements.forEach(function(el) { // ['hour', ... ]
        this['_' + el] = document.getElementById(el); // ex: this._hour = document.getElementById('hour');
    }, this);
};

// What must I do when model changes?
View.prototype._bindActions = function() {

    this._model.on('sChange', this._drawSecond.bind(this));
    this._model.on('mChange', this._drawMinute.bind(this));
    this._model.on('hChange', this._drawHour.bind(this));
    
    this._model.on('tic', this.canvasRefresh.bind(this));
    this._model.on('sChange', this._drawSecondInArc.bind(this));
    this._model.on('mChange', this._drawMinuteInArc.bind(this));
    this._model.on('hChange', this._drawHourInArc.bind(this));
};

// Redraw the clock
View.prototype._redraw = function() {

    this._drawSecond();
    this._drawMinute();
    this._drawHour();

    this._secondArc = new Arc(240, 25, 'orange', this.ctx);
    this._minuteArc = new Arc(210, 25, 'blue', this.ctx);
    this._hourArc = new Arc(180,25,'green', this.ctx);
    this.canvasRefresh();
    this._drawSecondInArc();
    this._drawMinuteInArc();
    this._drawHourInArc();
};

//// DRAW TIME AS ARC ////////////////////////////////////////
View.prototype.canvasRefresh = function() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(250, 250);
    this.ctx.rotate(-90 * Math.PI / 180);
};


View.prototype._drawSecondInArc = function() {
    var secondInDegree = this._model.getSecondInDegree();
    this._secondArc.drawArc(secondInDegree);
};

View.prototype._drawMinuteInArc = function() {
    var minuteInDegree = this._model.getMinuteInDegree();
    this._minuteArc.drawArc(minuteInDegree);
};

View.prototype._drawHourInArc = function() {
    var hourInDegree = this._model.getHourInDegree();
    this._hourArc.drawArc(hourInDegree);
};
///////////////////////////////////////////////////////////////////////


//// DRAW TIME AS DIV ////////////////////////////////////////

// how to draw the div
View.prototype._drawDiv = function(divWidth, color, time) {
    var div = $('<div>').css('height', '14px').css('width', divWidth + '%').css('background-color', color).css('margin', '1px 0px')
        .text(time).css('text-align', 'right').css('color', 'white').css('font-family', 'arial').css('padding-right', '2px')
        .css({'overflow':'hidden' , 'white-space':'nowrap'});
    return div;
};

View.prototype._drawSecond = function() {
    var second = this._model.getSecondInMls();
    $('#drawS').empty();
    var divWidth;
    divWidth = second * (100 / 60000);
    var div = this._drawDiv(divWidth, 'orange', (Math.floor(second / 1000)) + ' / 60 secondes');
    $('#drawS').append(div);
};

View.prototype._drawMinute = function() {
    var minute = this._model.getMinuteInMls();
    $('#drawM').empty();
    var divWidth;
    divWidth = minute * (100 / 3600000);
    var div = this._drawDiv(divWidth, 'blue', (Math.floor(minute / 60000)) + ' / 60 minutes');
    $('#drawM').append(div);
};

View.prototype._drawHour = function() {
    var hour = this._model.getHourInS();
    $('#drawH').empty();
    var divWidth;
    divWidth = hour * (100 / 86400);
    var div = this._drawDiv(divWidth, 'green', (Math.floor(hour / 3600)) + ' / 24 heures');
    $('#drawH').append(div);
};



// Set hour to model value
View.prototype._drawHourInTxt = function() {
    var hour = this._model.getHour();
    this._hour.innerHTML = hour < 10 ? '0' + hour : hour;
};

// Set minute to model value
View.prototype._drawMinuteInTxt = function() {
    var minute = this._model.getMinute();
    this._minute.innerHTML = minute < 10 ? '0' + minute : minute;
};


// Set millissecond to model value
View.prototype._drawSecondInTxt = function() {
    var second = this._model.getSecond();
    this._second.innerHTML = second;
};


// Set millissecond to model value
View.prototype._drawMillisecondInTxt = function() {
    var millisecond = this._model.getMillisecond();
    this._millisecond.innerHTML = millisecond;
};
