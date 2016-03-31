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
    this._setYear();
    this._tic();
};

// Tic...
Model.prototype._tic = function() {
    this.emit('tic');
    this._setMilliseconds();
    this._setSeconds();
    this._setMinutes();
    this._setHours();
    this._setDate();
    this._setDay();
    this._setMonth();
    window.requestAnimationFrame(this._tic.bind(this));
};


//// GET TIME IN IT'S OWN VALLUE ////////////////////////////////////////////////////////////////////
Model.prototype._getMilliseconds = function() {
    return this._milliseconds;
};

Model.prototype._getSeconds = function() {
    return this._seconds;
};

Model.prototype._getMinutes = function() {
    return this._minutes;
};

Model.prototype._getHours = function() {
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
Model.prototype.getSecondsInMls = function() {
    var currentS = this._getSeconds();
    var currentMls = this._getMilliseconds();
    var sInMls =  (currentS * 1000) + currentMls;
    return sInMls;
};

Model.prototype.getMinutesInMls = function() {
    var sInMls = this.getSecondsInMls();
    var currentM = this._getMinutes();
    var mInMls =  (currentM * 60 * 1000) + sInMls;
    return mInMls;
};

Model.prototype.getMinutesInS = function() {
    var currentS = this._getSeconds();
    var currentM = this._getMinutes();
    var mInS = (currentM * 60) + currentS;
    return mInS;
};

Model.prototype.getHoursInS = function() {
    var mInS = this.getMinutesInS();
    var currentH = this._getHours();
    var hInS = (currentH  * 60 * 60) + mInS;
    return hInS;
};

Model.prototype.getHoursInMin = function(){
    var currentMin = this._getMinutes();
    var currentH = this._getHours();
    var hInMin = (currentH * 60) + currentMin;
    return hInMin;
};

Model.prototype.getDateInMin = function() {
    var hInMin = this.getHoursInMin();
    var currentDate = this._getDate();
    // a day has 24 hours so if we are the 1st the day is currently passing from 0 to 24h
    var dateInMin = ((currentDate - 1) * 24 * 60) + hInMin;
    return dateInMin;
};

Model.prototype.getDateInH = function() {
    var currentHours = this._getHours();
    var currentDate = this._getDate();
    // a day has 24 hours so if we are the 1st the day is currently passing from 0 to 24h
    var dateInH = ((currentDate - 1) * 24) + currentHours;
    return dateInH;
};

Model.prototype.getDayInMin = function() {
    var hInMin = this.getHoursInMin();
    var currentDay = this._getDay();
    // a day has 24 hours so if we are the 1st the day is currently passing from 0 to 24h
    var dayInMin = ((currentDay > 0 ? currentDay -= 1 : jour = 6) * 24 * 60) + hInMin;
    return dayInMin;
};
////////////////////////////////////////////////////////////////////////////////////////////////////


//// GET TIME IN DEGREE ////////////////////////////////////////////////////////////////////////////
Model.prototype.getSecondsInDegree = function () {
    var currentS = this.getSecondsInMls();
    var secondInDegree = currentS * (360 / (60 * 1000));
    return secondInDegree;
};

Model.prototype.getMinutesInDegree = function () {
    var currentM = this.getMinutesInMls();
    var minuteInDegree = currentM * (360 / (60 * 60 * 1000));
    return minuteInDegree;
};

Model.prototype.getHoursInDegree = function () {
    var currentH = this.getHoursInS();
    var hourInDegree = currentH * (360 / (24 * 60 * 60));
    return hourInDegree;
};
// Get how many days in the current month
Model.prototype.getDaysMaxInMonth = function (year, month) {
    // when Date is created, give it parameters to get the date you want
    // Here we need to know how many days there are in the current month
    // So we give to new Date the current year,
    // the current month+1 = next month, with the 3rd parameter that is 0 for day 0
    // For example : (2016 , 2 + 1 , 0) => 2016 3(April) 0 = 2016 2(March) 31(last day)
    return new Date(year, month + 1, 0).getDate();
};

Model.prototype.getDateInDegree = function () {
    var currentDate = this.getDateInMin();
    // How many days in the current month
    var daysMax = this.getDaysMaxInMonth(this._getYear(),this._getMonth());
    var dateInDegree = currentDate * (360 / (daysMax * 24 * 60));
    return dateInDegree;
};

Model.prototype.getDayInDegree = function () {
    var currentDay = this.getDayInMin();
    var dayInDegree = currentDay * (360 / (7 * 24 * 60));
    return dayInDegree;
};

Model.prototype.getMonthInDegree = function () {
    var currentDate = this.getDateInH();
    var currentMonth = this._getMonth();
    var daysMax = this.getDaysMaxInMonth(this._getYear(),this._getMonth());
    var monthInDegree = (currentMonth * (360/12) ) + ( currentDate * ( (360/12) / (daysMax*24) ) );
    return monthInDegree;
};
////////////////////////////////////////////////////////////////////////////////////////////////////


//// SETTING TIME //////////////////////////////////////////////////////////////////////////////////
Model.prototype._setMilliseconds = function() {
    var newDate = new Date();
    this._milliseconds = newDate.getMilliseconds();
    this.emit('msChange');
};

Model.prototype._setSeconds = function() {
    var newDate = new Date();
    this._seconds = newDate.getSeconds();
    this.emit('sChange');
};

Model.prototype._setMinutes = function() {
    var newDate = new Date();
    this._minutes = newDate.getMinutes();
    this.emit('mChange');
};

Model.prototype._setHours = function() {
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
