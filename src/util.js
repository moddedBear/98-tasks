function timeString(date) {
    let hour = date.getHours()
    const ampm = hour >= 12 ? 'PM' : 'AM'
    if (hour == 0) {
        hour = 12
    }
    else if (hour > 12) {
        hour -= 12
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

function dateTimeString(date) {
    return `${dateString(date)} — ${timeString(date)}`
}

export { timeString, dateString, timeDateString, dateTimeString }