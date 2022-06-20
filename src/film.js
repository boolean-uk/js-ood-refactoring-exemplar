// const { FilmVars } = require("./utils/vars")

class Film {

    #name
    #rating
    #duration 

    constructor(name, rating, duration) {
        this.#name = name;
        this.#rating = rating; 
        this.#duration = duration;
    }

    get() {
        return this
    }

    getName() {
        return this.#name
    }

    getRating() {
        return this.#rating
    }

    getDuration() {
        return this.#duration
    }

    setName(name) {
        this.#name = name;
    }

    setRating(rating) {
        this.#rating = rating;
    }

    setDuration(duration) {
        this.#duration = duration;
    }
}

module.exports = Film