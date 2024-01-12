/** Example #1 - Getting changes */
const today = {};
today._year = new Date().getFullYear();

Object.defineProperty(today, 'year', {
  get: function() {
    return this._year;
  },
  set: function(value) {
    this._year = value;
    // Here you can add the code you want to execute whenever the "year" property is changed
    console.log('The "year" property has been changed!');
  }
});

/** Example #2  - USEFUL : Try alter the values from object today, ex : today.day = 'abc' ... */
const today = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  _monitorChanges: function(property, oldValue, newValue) {
    console.log(`The property ${property} has been changed.\nOld value: ${oldValue}.\nNew value: ${newValue}.`);
  },
  set year(value) {
    const oldValue = this.year;
    this._year = value;
    this._monitorChanges('year', oldValue, value);
  },
  get year() {
    return this._year;
  },
  set month(value) {
    const oldValue = this.month;
    this._month = value;
    this._monitorChanges('month', oldValue, value);
  },
  get month() {
    return this._month;
  },
  set day(value) {
    const oldValue = this.day;
    this._day = value;
    this._monitorChanges('day', oldValue, value);
  },
  get day() {
    return this._day;
  },
  get monitorChanges() {
    return this._monitorChanges;
  }
};

/** useless */
Object.defineProperty(today, 'monitorChanges', {
  value: today.monitorChanges,
  writable: false
});

