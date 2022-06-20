const { filmVars } = require("./vars")

const convertToSeconds = (time) => {
    const [hours, minutes] = time.split(':')
    return Number(hours) * 60 * 60 + Number(minutes) * 60
}

const isValidTime = (time) => {
    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time) 
}

const isValidDuration = (duration) => {

    if ( !Number(duration.replace(':','')) ) {
        return false
    }

    return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(duration)  
}

const isValidRating = (rating) => {

    return Object.keys(filmVars.ratings).includes(rating)
}

module.exports = { 
    convertToSeconds,
    isValidTime,
    isValidDuration,
    isValidRating
}