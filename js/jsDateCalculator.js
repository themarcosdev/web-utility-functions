/**
 * Function to create a date calculator object that allows chaining operations.
 *
 * @param {string} dateString - The initial date string to start calculations from. (YYYY-mm-dd hh:mm:ss)
 * @return {object} An object with methods to add parameters and get the resulting date.
 * @example : jsDateCalculator('2024-01-31 00:00:00').addParams('hour', 'add', 10).addParams('hour', 'sub', 2).
              addParams('minute', 'add', 1).addParams('year', 'sub', 1).getResult();
              // Tue Jan 31 2023 08:01:00 
 */
function jsDateCalculator(dateString) {
    let date = new Date(dateString);

    // Function to check if the date is valid
    function isValidDate() {
        return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
    }

    // Function to validate the unit
    function isValidUnit(unit) {
        const validUnits = ['year', 'month', 'day', 'hour', 'minute', 'second'];
        return validUnits.includes(unit);
    }

    // Function to validate the operation
    function isValidOperation(operation) {
        const validOperations = ['add', 'sub'];
        return validOperations.includes(operation);
    }

    // Function to validate the value
    function isValidValue(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    // Function to apply the operation on the date
    function applyOperation(unit, operation, value) {
        switch (unit) {
            case 'year':
                operation === 'add' ? date.setFullYear(date.getFullYear() + value) : date.setFullYear(date.getFullYear() - value);
                break;
            case 'month':
                operation === 'add' ? date.setMonth(date.getMonth() + value) : date.setMonth(date.getMonth() - value);
                break;
            case 'day':
                operation === 'add' ? date.setDate(date.getDate() + value) : date.setDate(date.getDate() - value);
                break;
            case 'hour':
                operation === 'add' ? date.setHours(date.getHours() + value) : date.setHours(date.getHours() - value);
                break;
            case 'minute':
                operation === 'add' ? date.setMinutes(date.getMinutes() + value) : date.setMinutes(date.getMinutes() - value);
                break;
            case 'second':
                operation === 'add' ? date.setSeconds(date.getSeconds() + value) : date.setSeconds(date.getSeconds() - value);
                break;
            default:
                console.log('Unrecognized unit. Please provide a valid unit (year, month, day, hour, minute, second).');
        }
    }

    // Chained function to add/modify parameters
    function addParams(unit, operation, value) {
        if (!isValidDate()) {
            console.error('Invalid date string');
            return this; // Returns the instance itself for chaining
        }

        if (!isValidOperation(operation)) {
            console.error('Use correct operations: add or sub');
            return this;
        }

        if (!isValidUnit(unit)) {
            console.error('Use correct units: year, month, day, hour, minute, second');
            return this;
        }

        if (!isValidValue(value)) {
            console.error('Value must be a number');
            return this;
        }

        applyOperation(unit, operation, value);

        return this; // Returns the instance itself for chaining
    }

    // Chained function to get the resulting date
    function getResult() {
        return date;
    }

    // Returns the chained object
    return {
        addParams,
        getResult
    };
}
