function timeString(date) {
    let ampm = 'AM'
    let hour = date.getHours()
    if (hour > 12) {
        hour -= 12
        ampm = 'PM'
    }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    return `${hour}:${minutes} ${ampm}`
}

function dateString(date) {
    return date.toDateString()
}

function timeDateString(date) {
    return `${timeString(date)} — ${dateString(date)}`
}

export { timeString, dateString, timeDateString }