const Cinema = require('./src/cinema')

const cinema = new Cinema()
cinema.addScreen("Screen #1", 50)
cinema.addScreen("Screen #2", 100)

cinema.addFilm("Dune", "12", "2:30")
cinema.addFilm("The Alpinist", "15", "1:15")

cinema.addShowing("The Alpinist", "Screen #1", "10:00")
cinema.addShowing("The Alpinist", "Screen #2", "10:00")
cinema.addShowing("The Alpinist", "Screen #2", "11:30")

cinema.addShowing("Dune", "Screen #1", "12:40")
cinema.addShowing("Dune", "Screen #1", "19:40")
cinema.addShowing("Dune", "Screen #1", "23:40")

console.log(cinema.getShowings())