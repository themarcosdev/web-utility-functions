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
