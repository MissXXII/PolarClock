function Controller(view, model) {
    this._view = view;
    this._model = model;
    this._bindActions();
}

// What to do when the view triggers an event?
Controller.prototype._bindActions = function() {
    // this._view.on('hPlus', this._addHour.bind(this));
    // this._view.on('mPlus', this._addMinute.bind(this));
    // this._view.on('sPlus', this._addSecond.bind(this));
};


// Controller.prototype._addHour = function(){
//   this._model.addHour();
// };
// Controller.prototype._addMinute = function(){
//   this._model.addMinute();
// };
// Controller.prototype._addSecond = function(){
//   this._model.addSecond();
// };
