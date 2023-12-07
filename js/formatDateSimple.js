/**
 * Function to format a date to another format;
 * @param {*} date         date to be formated ; ex : 2022-jan-09 | 2023-12-07 | 2022-jan-09 00:00:00 ...
 * @param {*} outputFormat the output format   ; ex : 'dd/mm/YYYY HH:ii:ss' | 'd-m-Y' ...
 */
 function formatDate(date, outputFormat) {
    let validDate     = new Date(date);
    let formattedDate = '';

    if (validDate == 'Invalid Date') {
        return 'Invalid date';
    }

    const removeRepeatedChars = function(str) {
        let finalString = '';
        for (let i = 0; i < str.length; i++) {
            if (str[i] !== str[i + 1]) {
                finalString += str[i];
            }
        }
        return finalString;
    }

    const round2PadsNumber = function (number) {
        return number.toString().length == 1 ? '0' + number : number;
    }
    
    outputFormat = removeRepeatedChars(outputFormat);
    
    for (let format of outputFormat) {
        if (format.toLocaleLowerCase() == 'd') {
            formattedDate += round2PadsNumber(validDate.getDate());
        }
        if (format.toLocaleLowerCase() == 'm') {
            formattedDate += round2PadsNumber(validDate.getMonth() + 1);
        }
        if (format.toLocaleLowerCase() == 'y') {
            formattedDate += validDate.getFullYear();
        }

        if (format.toLocaleLowerCase() == 'h') {
            formattedDate += round2PadsNumber(validDate.getHours());
        }
        if (format.toLocaleLowerCase() == 'i') {
            formattedDate += round2PadsNumber(validDate.getMinutes());
        }
        if (format.toLocaleLowerCase() == 's') {
            formattedDate += round2PadsNumber(validDate.getSeconds());
        }

        if (!['d','m','y','h','i','s'].includes(format.toLocaleLowerCase())) {
            formattedDate += format;
        }
    }

    return formattedDate;
}
