const Cinema = require("../src/cinema")

describe("Cinema", () => {
  let cinema

  beforeEach(() => {
    cinema = new Cinema()
  })

  it("creates new screens", () => {

    const screen1 = "Screen 1"
    const duration1 = 20

    const screen2 = "Screen 2"
    const duration2 = 25

    cinema.addScreen(screen1, duration1)
    cinema.addScreen(screen2, duration2)

    const expected = [
      {
        name: screen1,
        capacity: duration1,
        showings: [],
      },
      {
        name: screen2,
        capacity: duration2,
        showings: [],
      },
    ]

    const screens = cinema.getScreensInfo()
    //console.log('my screens', screens)

    expect(screens).toEqual(
      jasmine.objectContaining(expected)
    )
  })

  it("returns error trying to create duplicate screen", () => {
    const screen = "Screen 1"
    cinema.addScreen(screen, 20)
    const result = cinema.addScreen(screen, 25)
    const expected = false
    expect(result).toEqual(expected)
  })

  it("adds new films", () => {

    const film1 = "Nomad Land" 
    const rating1 = "12"
    const duration1 = "1:48"

    const film2 = "The Power of the Dog"
    const rating2 = "15"
    const duration2 = "2:08"

    cinema.addFilm(film1, rating1, duration1)
    cinema.addFilm(film2, rating2, duration2)

    const expected = [
      {
        name: film1,
        rating: rating1,
        duration: duration1,
      },
      {
        name: film2,
        rating: rating2,
        duration: duration2,
      },
    ]

    const films = cinema.getFilmsInfo()
    //console.log('my films', films)

    expect(films).toEqual(expected)
  })

  it("returns error trying to create duplicate film", () => {

    const film = "Nomad Land" 
    cinema.addFilm(film, "12", "1:48")
    const result = cinema.addFilm(film, "15", "2:08")

    const expected = false

    expect(result).toEqual(expected)
  })

  it("creates a film with valid rating", () => {
    const validRatings = ["U", "PG", "12", "15", "18"]
    const expected = true
    for (const validRating of validRatings) {
      const result = cinema.addFilm("Film " + validRating, validRating, "2:08")
      expect(result).toEqual(expected)
    }
  })

  it("returns error trying to create film with invalid rating", () => {
    const invalidRatings = ["20", "0", "UUU"]    
    const expected = false
    for (const invalidRating of invalidRatings) {
      const result = cinema.addFilm("Invalid film", invalidRating, "2:08")
      expect(result).toEqual(expected)
    }
  })

  it("returns error trying to create a film with invalid durations", () => {
    const invalidDurations = ["0:00", "abc", "4", "1:61", "1:1"]

    const expected = false

    for (const duration of invalidDurations) {
      cinema = new Cinema()
      const result = cinema.addFilm("Film", "12", duration)
      expect(result).withContext(duration).toEqual(expected)
    }
  })

  it("returns error trying to schedule showing when film does not exist", () => {
    cinema.addFilm("Film1", "12", "1:20")
    cinema.addScreen("Screen #1", 20)
    const expected = false
    const result = cinema.addShowing("Film doesnt exist!", "Screen #1", "10:00")
    expect(result).toBe(expected)
  })

  it("returns error trying to schedule showing when screen does not exist", () => {
    cinema.addFilm("Film1", "12", "1:20")
    cinema.addScreen("Screen #1", 20)
    const expected = false
    const result = cinema.addShowing("Film1", "Screen Does not exist", "10:00")
    expect(result).toBe(expected)
  })

  it("schedules single film", () => {

    const expected = [
      {
        film: "Film1", 
        rating: "12",
        duration: "1:20",
        screen: "Screen #1",
        startTime: "10:00"
      },
    ]
       
    cinema.addFilm(expected[0].film, expected[0].rating, expected[0].duration)
    cinema.addScreen(expected[0].screen, 20) 
    cinema.addShowing(expected[0].film, expected[0].screen, expected[0].startTime)

    const result = cinema.getShowings()
    expect(result).toEqual(expected)
  })

  it("schedules same film on same screen", () => {

    const film = "Film1"
    const rating = "12"
    const duration = "1:20"
    const screen = "Screen #1"

    const expected = [
      {
        film: film, 
        rating: rating,
        duration: duration,
        screen: screen,
        startTime: "10:00"
      },
      {
        film: film, 
        rating: rating,
        duration: duration,
        screen: screen,
        startTime: "14:00"
      },
    ]
       
    cinema.addFilm(film, rating, duration)
    cinema.addScreen(screen, 20) 
    cinema.addShowing(film, screen, expected[0].startTime)
    cinema.addShowing(film, screen, expected[1].startTime)

    const result = cinema.getShowings()
    //console.log('showings', result)
    expect(result).toEqual(expected)
  })

  it("schedules same film on multiple screens", () => {

    const film = "Film1"
    const rating = "12"
    const duration = "1:20" 
    const startTime = "10:00"

    const expected = [
      {
        film: film, 
        rating: rating,
        duration: duration,
        screen: "Screen #1",
        startTime: startTime
      },
      {
        film: film, 
        rating: rating,
        duration: duration,
        screen: "Screen #2",
        startTime: startTime
      },
    ]
    
    cinema.addFilm(film, rating, duration)
    cinema.addScreen(expected[0].screen, 20)
    cinema.addScreen(expected[1].screen, 20)  
    cinema.addShowing(film, expected[0].screen, startTime)
    cinema.addShowing(film, expected[1].screen, startTime)

    const result = cinema.getShowings()
    //console.log('showings', result)
    expect(result).toEqual(expected)
  })

  it("schedules multiple films on multiple screens", () => {

    const film1 = "Film 1" 
    const rating1 = "PG"
    const duration1 = "1:20"
    const screen1 = "Screen #1"

    const film2 = "Film 2"
    const rating2 = "15"
    const duration2 = "1:40"
    const screen2 = "Screen #2"

    const startFirst =  "10:00"
    const startSecond =  "14:00"

    const expected = [
      {
        film: film1, 
        rating: rating1,
        duration: duration1,
        screen: screen1,
        startTime: startFirst
      },{
        film: film1, 
        rating: rating1,
        duration: duration1,
        screen: screen1,
        startTime: startSecond
      },
      {
        film: film2, 
        rating: rating2,
        duration: duration2,
        screen: screen2,
        startTime: startFirst
      },
      {
        film: film2, 
        rating: rating2,
        duration: duration2,
        screen: screen2,
        startTime: startSecond
      },
    ]

    cinema.addFilm(film1, rating1, duration1)
    cinema.addFilm(film2, rating2, duration2)
    cinema.addScreen(screen1, 20)
    cinema.addScreen(screen2, 20)  
    cinema.addShowing(expected[0].film, expected[0].screen, expected[0].startTime)
    cinema.addShowing(expected[1].film, expected[1].screen, expected[1].startTime)
    cinema.addShowing(expected[2].film, expected[2].screen, expected[2].startTime)
    cinema.addShowing(expected[3].film, expected[3].screen, expected[3].startTime)

    const result = cinema.getShowings()
    expect(result).toEqual(expected)
  })

  it("returns error when film screening overlaps start", () => {

    const expected = false

    cinema.addFilm("Film1", "12", "1:00")
    cinema.addScreen("Screen #1", 20)

    cinema.addShowing("Film1", "Screen #1", "10:00")
    const result = cinema.addShowing("Film1", "Screen #1", "11:00")
    expect(result).toEqual(expected)
  })

  it("returns error when film screening overlaps end", () => {

    const film = "Film1"
    const rating = "12"
    const duration = "1:20" 
    const screen = "Screen #1"

    const expected = false

    cinema.addFilm(film, rating, duration)
    cinema.addScreen(screen, 20)

    cinema.addShowing(film, screen, "10:00")
    const result = cinema.addShowing(film, screen, "09:10")
    expect(result).toEqual(expected)
  })

  it("returns error when film screening overlaps all", () => {

    const film1 = "Film 1" 
    const rating1 = "PG"
    const duration1 = "1:00"

    const film2 = "Film 2"
    const rating2 = "12"
    const duration2 = "4:00"

    const screen = "Screen #1"

    const startFirst =  "10:00"
    const startSecond =  "08:30"

    const expected = false

    cinema.addFilm(film1, rating1, duration1)
    cinema.addFilm(film2, rating2, duration2)
    cinema.addScreen(screen, 20)

    cinema.addShowing(film1, screen, startFirst)
    const result = cinema.addShowing(film2, screen, startSecond)
    expect(result).toEqual(expected)
  })
})
