const Screen = require("../src/screen")
const Film = require("../src/film")
const { 
  isValidTime,
  isValidDuration,
  isValidRating
} = require("./utils/utils")

class Cinema {

  #films
  #screens

  constructor() {
    this.#films = []
    this.#screens = []
  }

  isValidTimings(filmName, screenName, startTime) {

    const filmInfo = this.getFilmInfo(filmName)   
    const thisScreen = this.getScreen(screenName)
    return thisScreen.isValidTimings(startTime, filmInfo.duration)
  }

  get () {
    return this
  }

  getScreenExists(name) {

    return this.#screens.some(screen => screen.getName() === name);
  }

  getScreens() {
    return this.#screens
  }

  getScreen(name) {
    return this.#screens.find(screen => screen.getName() === name)
  }

  getScreensInfo() {
    const screenInfo = []
    this.#screens.forEach(screen => {
      const info = {
        name: screen.getName(),
        capacity: screen.getCapacity(),
        showings: screen.getShowings()
      }
      screenInfo.push(info)
    })
    return screenInfo
  }

  getScreenInfo(name) {
    const thisScreen = this.#screens.find(screen => screen.getName() === name)
    const info = {
      name: thisScreen.getName(),
      capacity: thisScreen.getCapacity(),
      showings: thisScreen.getShowings()
    }
    return info
  }

  addScreen(name, capacity) {
    if (this.getScreenExists(name) ) {
      return false
    } 
    this.#screens.push(new Screen(name, capacity))
    return true
  }

  getFilmExists(name) {

    return this.#films.some(film => film.getName() === name);
  }

  getFilms() {
    return this.#films
  }

  getFilm(name) {
    return this.#films.find(film => film.getName() === name)
  }

  getFilmsInfo() {
    const filmInfo = []
    this.#films.forEach(film => {
      const info = {
        name: film.getName(),
        rating: film.getRating(),
        duration: film.getDuration()
      }
      filmInfo.push(info)
    })
    return filmInfo
  }

  getFilmInfo(name) {
    const thisFilm = this.#films.find(film => film.getName() === name)
    const info = {
      name: thisFilm.getName(),
      rating: thisFilm.getRating(),
      duration: thisFilm.getDuration()
    }
    return info
  }
  
  addFilm(name, rating, duration) {

    if (this.getFilmExists(name) || 
        !isValidRating(rating) || 
        !isValidDuration(duration)) {
      return false
    } 
    this.#films.push(new Film(name, rating, duration))
    return true
  }
  
  addShowing(filmName, screenName, startTime) {

    if(!this.getFilmExists(filmName) || 
       !this.getScreenExists(screenName) || 
       !isValidTime(startTime) || 
       !this.isValidTimings(filmName, screenName, startTime)) {
      return false
    }

    const thisScreen = this.#screens.find(screen => screen.getName() === screenName)

    thisScreen.setShowing(filmName, startTime)
    return true  
  } 

  getShowings() {

    const showingsInfo = []
    this.#screens.forEach(screen => {
     
      const showings = screen.getShowings()
      showings.forEach(showing => {

        const filmInfo = this.getFilmInfo(showing.film)
        const info = {
          film: showing.film,
          screen: screen.getName(),
          startTime: showing.startTime,
          rating: filmInfo.rating,
          duration: filmInfo.duration
        }

        showingsInfo.push(info)
      })
    })

    //console.log('showings', showingsInfo)
    return showingsInfo
  }
}

module.exports = Cinema