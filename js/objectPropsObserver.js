/** Example #1 */
let today = {};
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

/** Example #2 */
let today = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  monitorChanges(property, oldValue, newValue) {
    console.log(`The property ${property} has been changed. Old value: ${oldValue}. New value: ${newValue}.`);
  },
  set year(value) {
    const oldValue = this.year;
    this._year = value;
    this.monitorChanges('year', oldValue, value);
  },
  get year() {
    return this._year;
  },
  set month(value) {
    const oldValue = this.month;
    this._month = value;
    this.monitorChanges('month', oldValue, value);
  },
  get month() {
    return this._month;
  },
  set day(value) {
    const oldValue = this.day;
    this._day = value;
    this.monitorChanges('day', oldValue, value);
  },
  get day() {
    return this._day;
  }
};

/** Protection for 'monitorChanges' */
Object.defineProperty(today, 'monitorChanges', {
  value: today.monitorChanges,
  writable: false
});

