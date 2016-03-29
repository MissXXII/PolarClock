function View(model) {
    EventEmitter.call(this);
    this._model = model;
    this.ctx = $('#canvas')[0].getContext('2d');
    // All the DOM elements to get
    this._elements = ['hour', 'minute', 'second'];
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

    this._model.on('sChange', this._drawSeconds.bind(this));
    this._model.on('mChange', this._drawMinutes.bind(this));
    this._model.on('hChange', this._drawHours.bind(this));

    this._model.on('tic', this.canvasRefresh.bind(this));
    this._model.on('sChange', this._drawSecondsArc.bind(this));
    this._model.on('mChange', this._drawMinutesArc.bind(this));
    this._model.on('hChange', this._drawHoursArc.bind(this));
    this._model.on('dateChange', this._drawDateArc.bind(this));
    this._model.on('dayChange', this._drawDayArc.bind(this));
    this._model.on('monthChange', this._drawMonthArc.bind(this));

};

// Redraw the clock
View.prototype._redraw = function() {

    this._drawSeconds();
    this._drawMinutes();
    this._drawHours();

    this._secondsArc = new Arc(240, 25, 'red', this.ctx);
    this._minutesArc = new Arc(210, 25, 'orange', this.ctx);
    this._hoursArc = new Arc(180, 25, 'gold', this.ctx);
    this._dateArc = new Arc(140, 25, 'purple', this.ctx);
    this._dayArc = new Arc(110, 25, 'fuchsia', this.ctx);
    this._monthArc = new Arc(80, 25, 'pink', this.ctx);
    this.canvasRefresh();
    this._drawSecondsArc();
    this._drawMinutesArc();
    this._drawHoursArc();
    this._drawDateArc();
    this._drawDayArc();
    this._drawMonthArc();
};

//// DRAW TIME AS ARC //////////////////////////////////////////////////////////////////////////////
View.prototype.canvasRefresh = function() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(250, 250);
    this.ctx.rotate(-90 * Math.PI / 180);
};

View.prototype._drawSecondsArc = function() {
    var secondsInDegree = this._model.getSecondsInDegree();
    this._secondsArc.drawArc(secondsInDegree);
};

View.prototype._drawMinutesArc = function() {
    var minutesInDegree = this._model.getMinutesInDegree();
    this._minutesArc.drawArc(minutesInDegree);
};

View.prototype._drawHoursArc = function() {
    var hoursInDegree = this._model.getHoursInDegree();
    this._hoursArc.drawArc(hoursInDegree);
};

View.prototype._drawDateArc = function() {
    var dateInDegree = this._model.getDateInDegree();
    this._dateArc.drawArc(dateInDegree);
};

View.prototype._drawDayArc = function() {
    var dayInDegree = this._model.getDayInDegree();
    this._dayArc.drawArc(dayInDegree);
};

View.prototype._drawMonthArc = function() {
    var monthInDegree = this._model.getMonthInDegree();
    this._monthArc.drawArc(monthInDegree);
};
////////////////////////////////////////////////////////////////////////////////////////////////////


//// DRAW TIME AS DIV //////////////////////////////////////////////////////////////////////////////

// how to draw the div
View.prototype._drawDiv = function(divWidth, color, time) {
    var div = $('<div>').css('height', '14px').css('width', divWidth + '%').css('background-color', color).css('margin', '1px 0px')
        .text(time).css('text-align', 'right').css('color', 'white').css('font-family', 'arial').css('padding-right', '2px')
        .css({'overflow':'hidden' , 'white-space':'nowrap'});
    return div;
};

View.prototype._drawSeconds = function() {
    var seconds = this._model.getSecondsInMls();
    $('#drawS').empty();
    var divWidth;
    divWidth = seconds * (100 / (60 * 1000));
    var div = this._drawDiv(divWidth, 'red', (this._model._getSeconds()) + ' s');
    $('#drawS').append(div);
};

View.prototype._drawMinutes = function() {
    var minutes = this._model.getMinutesInMls();
    $('#drawM').empty();
    var divWidth;
    divWidth = minutes * (100 / (60 * 60 * 1000));
    var div = this._drawDiv(divWidth, 'orange', (this._model._getMinutes()) + ' min');
    $('#drawM').append(div);
};

View.prototype._drawHours = function() {
    var hours = this._model.getHoursInS();
    $('#drawH').empty();
    var divWidth;
    divWidth = hours * (100 / (24 * 60 * 60 ));
    var div = this._drawDiv(divWidth, 'gold', (this._model._getHours()) + ' h');
    $('#drawH').append(div);
};
////////////////////////////////////////////////////////////////////////////////////////////////////


//// DRAW TIME AS TEXT /////////////////////////////////////////////////////////////////////////////

// Set millissecond to model value
View.prototype._drawMillisecondsInTxt = function() {
    var milliseconds = this._model._getMilliseconds();
    this._milliseconds.innerHTML = milliseconds;
};

// Set second to model value
View.prototype._drawSecondInTxt = function() {
    var seconds = this._model._getSeconds();
    this._seconds.innerHTML = second;
};

// Set minute to model value
View.prototype._drawMinuteInTxt = function() {
    var minutes = this._model._getMinutes();
    this._minutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
};

// Set hour to model value
View.prototype._drawHoursInTxt = function() {
    var hours = this._model._getHours();
    this._hours.innerHTML = hours < 10 ? '0' + hours : hours;
};
////////////////////////////////////////////////////////////////////////////////////////////////////
