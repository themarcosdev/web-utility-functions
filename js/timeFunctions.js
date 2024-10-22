/**
* @example: formatTime(72, 'minutes');
*/
window.formatTime = function(numberInSeconds, formatTo) {
    let time = new Date(numberInSeconds * 1000).toISOString().substr(11, 8).split(':');
    
    if (formatTo === 'minutes') {
        return `${time[1]}:${time[2]}`; // Ajuste aqui para retornar apenas minutos e segundos
    } else if (formatTo === 'hours') {
        return `${time[0]}:${time[1]}`;
    } else if (formatTo === 'days') {
        return `${time[0]}:${time[1]}`;
    } else {
        return 'Formato inválido. Escolha entre: minutes, hours, days.';
    }
}

/**
* @example: parseTime('01:01:02:01'); // 90121 | DD:HH:MM:SS
*/
window.parseTime = function(timeString) {
    let timeParts = timeString.split(':').map(part => parseInt(part, 10)); // Converter todas as partes para números

    let totalSeconds = 0;

    if (timeParts.length === 2) {
        // Formato MM:SS
        let [minutes, seconds] = timeParts;
        totalSeconds = (minutes * 60) + seconds;

    } else if (timeParts.length === 3) {
        // Formato HH:MM:SS
        let [hours, minutes, seconds] = timeParts;
        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    } else if (timeParts.length === 4) {
        // Formato DD:HH:MM:SS
        let [days, hours, minutes, seconds] = timeParts;
        totalSeconds = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;

    } else {
        throw new Error("Formato inválido. Use MM:SS, HH:MM:SS ou DD:HH:MM:SS");
    }

    return totalSeconds;
};
