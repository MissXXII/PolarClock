function Model() {
    EventEmitter.call(this); // Call EventEmitter constructor
    // Model Initialisation
    this._milliseconds = 0;
    this._seconds = 0;
    this._minutes = 0;
    this._hours = 0;
    this._date = 0;
    this._day = 0;
    this._month = 0;
    this._year = 0;
}

// EventEmitter inheritance
Model.prototype = Object.create(EventEmitter.prototype);
Model.prototype.constructor = Model;

// Start the clock
Model.prototype.start = function() {
    this.init();
    this._tic();
};

// Init
Model.prototype.init = function() {
    this._setMillisecond();
    this._setSecond();
    this._setMinute();
    this._setHour();
    this._setDate();
    this._setDay();
    this._setMonth();
    this._setYear();
};

// Tic...
Model.prototype._tic = function() {
    this.emit('tic');
    this._setMillisecond();
    this._setSecond();
    this._setMinute();
    this._setHour();
    this._setDate();
    this._setDay();
    this._setMonth();
    window.requestAnimationFrame(this._tic.bind(this));
};


//// GET TIME IN ITS OWN VALLUE ////////////////////////////////////////////////////////////////////
Model.prototype._getMillisecond = function() {
    return this._milliseconds;
};

Model.prototype._getSecond = function() {
    return this._seconds;
};

Model.prototype._getMinute = function() {
    return this._minutes;
};

Model.prototype._getHour = function() {
    return this._hours;
};

Model.prototype._getDate = function() {
    return this._date;
};

Model.prototype._getDay = function() {
    return this._day;
};

Model.prototype._getMonth = function() {
    return this._month;
};

Model.prototype._getYear = function() {
    return this._year;
};
////////////////////////////////////////////////////////////////////////////////////////////////////


//// GET TIME IN OSER VALLUES //////////////////////////////////////////////////////////////////////
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

Model.prototype.getHourInMin = function(){
    var actualMin = this._minutes;
    var actualH = this._hours;
    var hInMin = (actualH * 60) + actualMin;
    return hInMin;
};

Model.prototype.getDateInMin = function() {
    var hInMin = this.getHourInMin();
    var actualDate = this._date;
    // a day has 24 hours so if we are the 1st the day is actually passing from 0 to 24h
    var dateInMin = ((actualDate - 1) * 24 * 60) + hInMin;
    return dateInMin;
};

Model.prototype.getDayInMin = function() {
    var hInMin = this.getHourInMin();
    var actualDay = this._day;
    // a day has 24 hours so if we are the 1st the day is actually passing from 0 to 24h
    var dayInMin = ((actualDay > 0 ? actualDay -= 1 : jour = 6) * 24 * 60) + hInMin;
    return dayInMin;
};
////////////////////////////////////////////////////////////////////////////////////////////////////


//// GET TIME IN DEGREE ////////////////////////////////////////////////////////////////////////////
Model.prototype.getSecondInDegree = function () {
    var actualS = this.getSecondInMls();
    var secondInDegree = actualS * (360 / (60 * 1000));
    return secondInDegree;
};

Model.prototype.getMinuteInDegree = function () {
    var actualM = this.getMinuteInMls();
    var minuteInDegree = actualM * (360 / (60 * 60 * 1000));
    return minuteInDegree;
};

Model.prototype.getHourInDegree = function () {
    var actualH = this.getHourInS();
    var hourInDegree = actualH * (360 / (24 * 60 * 60));
    return hourInDegree;
};
// Get how many days in the actual month
Model.prototype.getDaysMaxInMonth = function (year, month) {
    // when Date is created, give it parameters to get the date you want
    // Here we need to know how many days there are in the current month
    // So we give to new Date the current year,
    // the current month+1 = next month, with the 3rd parameter that is 0 for day 0
    // For example : (2016 , 2 + 1 , 0) => 2016 3(April) 0 = 2016 2(March) 31(last day)
    return new Date(year, month + 1, 0).getDate();
};

Model.prototype.getDateInDegree = function () {
    var actualDate = this.getDateInMin();
    // How many days in the actual month
    var daysMax = this.getDaysMaxInMonth(this._getYear(),this._getMonth());
    var dateInDegree = actualDate * (360 / (daysMax * 24 * 60));
    return dateInDegree;
};

Model.prototype.getDayInDegree = function () {
    var actualDay = this.getDayInMin();
    var dayInDegree = actualDay * (360 / (7 * 24 * 60));
    return dayInDegree;
};
////////////////////////////////////////////////////////////////////////////////////////////////////


//// SETTING TIME //////////////////////////////////////////////////////////////////////////////////
Model.prototype._setMillisecond = function() {
    var newDate = new Date();
    this._milliseconds = newDate.getMilliseconds();
    this.emit('msChange');
};

Model.prototype._setSecond = function() {
    var newDate = new Date();
    this._seconds = newDate.getSeconds();
    this.emit('sChange');
};

Model.prototype._setMinute = function() {
    var newDate = new Date();
    this._minutes = newDate.getMinutes();
    this.emit('mChange');
};

Model.prototype._setHour = function() {
    var newDate = new Date();
    this._hours = newDate.getHours();
    this.emit('hChange');
};

Model.prototype._setDate = function() {
    var newDate = new Date();
    this._date = newDate.getDate();
    this.emit('dateChange');
};

Model.prototype._setDay = function() {
    var newDate = new Date();
    this._day = newDate.getDay();
    this.emit('dayChange');
};

Model.prototype._setMonth = function() {
    var newDate = new Date();
    this._month = newDate.getMonth();
    this.emit('monthChange');
};

Model.prototype._setYear = function() {
    var newDate = new Date();
    this._year = newDate.getFullYear();
    this.emit('yearChange');
};
////////////////////////////////////////////////////////////////////////////////////////////////////
