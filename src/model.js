function Model() {
    EventEmitter.call(this); // Call EventEmitter constructor
    // Model Initialisation
    this._milliseconds = this.setMillisecond();
    this._seconds = this.setSecond();
    this._minutes = this.setMinute();
    this._hours = this.setHour();
}

// EventEmitter inheritance
Model.prototype = Object.create(EventEmitter.prototype);
Model.prototype.constructor = Model;

// Start the clock
Model.prototype.start = function() {
    this._tic();
    window.requestAnimationFrame(this.start.bind(this));
};

// Tic...
Model.prototype._tic = function() {
    this.emit('tic');
    this.setMillisecond();
    this.setSecond();
    this.setMinute();
    this.setHour();
};


//// GET TIME IN ITS OWN VALLUE ////////////////////////////////////////
Model.prototype.getHour = function() {
    return this._hours;
};

Model.prototype.getMinute = function() {
    return this._minutes;
};

Model.prototype.getSecond = function() {
    return this._seconds;
};

Model.prototype.getMillisecond = function() {
    return this._milliseconds;
};
///////////////////////////////////////////////////////////////////////


//// GET TIME IN OSER VALLUES ////////////////////////////////////////
Model.prototype.getSecondInMls = function() {
    var actualS = this._seconds;
    var actualMls = this._milliseconds;
    var sInMls =  (actualS * 1000) + actualMls;
    return sInMls;
};

Model.prototype.getMinuteInMls = function() {
    var sInMls = this.getSecondInMls();
    var actualM = this._minutes;
    var mInMls =  (actualM * 60 * 1000) + sInMls;
    return mInMls;
};

Model.prototype.getMinuteInS = function() {
    var actualS = this._seconds;
    var actualM = this._minutes;
    var mInS = (actualM * 60) + actualS;
    return mInS;
};

Model.prototype.getHourInS = function() {
    var mInS = this.getMinuteInS();
    var actualH = this._hours;
    var hInS = (actualH  * 60 * 60) + mInS;
    return hInS;
};

Model.prototype.getHourInS = function() {
    var mInS = this.getMinuteInS();
    var actualH = this._hours;
    var hInS = (actualH  * 60 * 60) + mInS;
    return hInS;
};


///////////////////////////////////////////////////////////////////////


//// GET TIME IN DEGREE ////////////////////////////////////////
Model.prototype.getSecondInDegree = function () {
    var actualS = this.getSecondInMls();
    var secondInDegree = actualS * (360 / 60000);
    return secondInDegree;
};

Model.prototype.getMinuteInDegree = function () {
    var actualM = this.getMinuteInMls();
    var minuteInDegree = actualM * (360 / 3600000);
    return minuteInDegree;
};

Model.prototype.getHourInDegree = function () {
    var actualH = this.getHourInS();
    var hourInDegree = actualH * (360 / 86400);
    return hourInDegree;
};

///////////////////////////////////////////////////////////////////////




//// SETTING TIME ///////////////////////////////////////////////////////////////////
Model.prototype.setHour = function(hour) {
    var newDate = new Date();
    this._hours = newDate.getHours();
    this.emit('hChange');
};

Model.prototype.setMinute = function() {
    var newDate = new Date();
    this._minutes = newDate.getMinutes();
    this.emit('mChange');
};

Model.prototype.setSecond = function() {
    var newDate = new Date();
    this._seconds = newDate.getSeconds();
    this.emit('sChange');
};

Model.prototype.setMillisecond = function() {
    var newDate = new Date();
    this._milliseconds = newDate.getMilliseconds();
    this.emit('msChange');
};
///////////////////////////////////////////////////////////////////////
