
const { screenVars } = require("./utils/vars")
const { convertToSeconds } = require("./utils/utils")

class Screen {

  #name
  #capacity
  #showings

  constructor(name, capacity) {
    this.#name = name
    this.#capacity = capacity
    this.#showings = []
  }

  isValidTimings(startTime, duration) {

    const durationSeconds = convertToSeconds(duration)
    const startTimeSeconds = convertToSeconds(startTime)
    const endTimeSeconds = startTimeSeconds + durationSeconds
    //console.log('start', startTime, startTimeSeconds, duration, durationSeconds, endTimeSeconds)
   
    for (let i = 0; i < this.#showings.length; i++) {
      const showingStartTimeSeconds = convertToSeconds(this.#showings[i].startTime)
      const cleaningSeconds = convertToSeconds(screenVars.cleanTime)
      const showingEndTimeSeconds = showingStartTimeSeconds + durationSeconds + cleaningSeconds
      //console.log('this showing', this.#showings[i].startTime, showingStartTimeSeconds, showingEndTimeSeconds)
      if((startTimeSeconds >= showingStartTimeSeconds && startTimeSeconds <= showingEndTimeSeconds) || 
         (endTimeSeconds >= showingStartTimeSeconds && endTimeSeconds <= showingEndTimeSeconds) ||
         (startTimeSeconds <= showingStartTimeSeconds && endTimeSeconds >= showingEndTimeSeconds)) {
        return false
      }
    }
    return true
  }

  get () {
      return this
  }

  getName() {
      return this.#name
  }

  getCapacity() {
      return this.#capacity
  }

  getShowings() {
    return this.#showings
  }

  getFilmShowings(name) {
    return this.#showings.filter(showing => showing.film === name)
  }

  getShowing(time) {
    return this.#showings.filter(showing => showing.startTime === time)
  }

  setName(name) {
      this.#name = name
  }

  setCapacity(capacity) {
      this.#capacity = capacity
  }

  setShowing(film, startTime) {
    const info = {
      film: film,
      startTime: startTime
    }
    this.#showings.push(info)
  }
}

module.exports = Screen