const screenVars = {
    maxCapacity: 100,
    cleanTime: "0:20"
}

const filmVars = {
    ratings: {
        'U': {
            name: 'U',
            description: ''
        },
        'PG': {
            name: 'PG',
            description: 'Parental Guidance'
        },
        '12': {
            name: '12',
            description: ''
        },
        '15': {
            name: '15',
            description: ''
        },
        '18': {
            name: '18',
            description: ''
        }
    }
}

module.exports = {
    screenVars,
    filmVars
}