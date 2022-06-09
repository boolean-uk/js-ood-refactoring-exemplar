class Cinema {
  constructor() {
    this.films = [];
    this.screens = [];
  }

  //Add a new screen
  addNewScreen(screenName, capacity) {
    if (capacity > 100) {
      return 'Exceeded max capacity';
    }

    //Check the screen doesn't already exist
    let screen = null;
    for (let i = 0; i < this.screens.length; i++) {
      if (this.screens[i].name === screenName) {
        screen = this.screens[i];
      }
    }

    if (screen != null) {
      return 'Screen already exists';
    }

    this.screens.push({
      name: screenName,
      capacity: capacity,
      showings: [],
    });
  }

  //Add a new film
  addNewFilm(filmName, rating, duration) {
    //Check the film doesn't already exist
    let newFilm = null;
    for (let i = 0; i < this.films.length; i++) {
      if (this.films[i].name == filmName) {
        newFilm = this.films[i];
      }
    }

    if (newFilm != null) {
      return 'Film already exists';
    }

    //Check the rating is valid
    if (rating != 'U' && rating != 'PG') {
      if (rating != '12' && rating != '15' && rating != '18') {
        return 'Invalid rating';
      }
    }

    //Check duration
    const validDuration = /^(\d?\d):(\d\d)$/.exec(duration);
    if (validDuration == null) {
      return 'Invalid duration';
    }

    const hours = parseInt(validDuration[1]);
    const mins = parseInt(validDuration[2]);
    if (hours <= 0 || mins > 60) {
      return 'Invalid duration';
    }

    this.films.push({ name: filmName, rating: rating, duration: duration });
  }

  //Add a showing for a specific film to a screen at the provided start time
  addStartTime(movie, screenName, startTime) {
    let validStartTime = /^(\d?\d):(\d\d)$/.exec(startTime);
    if (validStartTime == null) {
      return 'Invalid start time';
    }

    const intendedStartTimeHours = parseInt(validStartTime[1]);
    const intendedStartTimeMinutes = parseInt(validStartTime[2]);
    if (intendedStartTimeHours <= 0 || intendedStartTimeMinutes > 60) {
      return 'Invalid start time';
    }

    let film = null;
    //Find the film by name
    for (let i = 0; i < this.films.length; i++) {
      if (this.films[i].name == movie) {
        film = this.films[i];
      }
    }

    if (film === null) {
      return 'Invalid film';
    }

    //From duration, work out intended end time
    //if end time is over midnight, it's an error
    //Check duration
    let validEndTime = /^(\d?\d):(\d\d)$/.exec(film.duration);
    if (validEndTime == null) {
      return 'Invalid duration';
    }

    const durationHours = parseInt(validEndTime[1]);
    const durationMins = parseInt(validEndTime[2]);

    //Add the running time to the duration
    let intendedEndTimeHours = intendedStartTimeHours + durationHours;

    //It takes 20 minutes to clean the screen so add on 20 minutes to the duration
    //when working out the end time
    let intendedEndTimeMinutes = intendedStartTimeMinutes + durationMins + 20;
    if (intendedEndTimeMinutes >= 60) {
      intendedEndTimeHours += Math.floor(intendedEndTimeMinutes / 60);
      intendedEndTimeMinutes = intendedEndTimeMinutes % 60;
    }

    if (intendedEndTimeHours >= 24) {
      return 'Invalid start time - film ends after midnight';
    }

    //Find the screen by name
    let theatre = null;
    for (let i = 0; i < this.screens.length; i++) {
      if (this.screens[i].name == screenName) {
        theatre = this.screens[i];
      }
    }

    if (theatre === null) {
      return 'Invalid screen';
    }

    //Go through all existing showings for this film and make
    //sure the start time does not overlap
    let error = false;
    for (let i = 0; i < theatre.showings.length; i++) {
      //Get the start time in hours and minutes
      const startTime = theatre.showings[i].startTime;
      let validStartTime = /^(\d?\d):(\d\d)$/.exec(startTime);
      if (validStartTime == null) {
        return 'Invalid start time';
      }

      const startTimeHours = parseInt(validStartTime[1]);
      let startTimeMins = parseInt(validStartTime[2]);
      if (startTimeHours <= 0 || startTimeMins > 60) {
        return 'Invalid start time';
      }

      //Get the end time in hours and minutes
      const endTime = theatre.showings[i].endTime;
      let validEndTime = /^(\d?\d):(\d\d)$/.exec(endTime);
      if (validEndTime == null) {
        return 'Invalid end time';
      }

      const endTimeHours = parseInt(validEndTime[1]);
      const endTimeMins = parseInt(validEndTime[2]);
      if (endTimeHours <= 0 || endTimeMins > 60) {
        return 'Invalid end time';
      }

      //if intended start time is between start and end
      const date1 = new Date();
      date1.setMilliseconds(0);
      date1.setSeconds(0);
      date1.setMinutes(intendedStartTimeMinutes);
      date1.setHours(intendedStartTimeHours);

      const date2 = new Date();
      date2.setMilliseconds(0);
      date2.setSeconds(0);
      date2.setMinutes(intendedEndTimeMinutes);
      date2.setHours(intendedEndTimeHours);

      const date3 = new Date();
      date3.setMilliseconds(0);
      date3.setSeconds(0);
      date3.setMinutes(startTimeMins);
      date3.setHours(startTimeHours);

      const date4 = new Date();
      date4.setMilliseconds(0);
      date4.setSeconds(0);
      date4.setMinutes(endTimeMins);
      date4.setHours(endTimeHours);

      if ((date1 > date3 && date1 < date4) || (date2 > date3 && date2 < date4) || (date1 < date3 && date2 > date4)) {
        error = true;
        break;
      }
    }

    if (error) {
      return 'Time unavailable';
    }

    //Add the new start time and end time to the showing
    theatre.showings.push({
      film: film,
      startTime: startTime,
      endTime: intendedEndTimeHours + ':' + intendedEndTimeMinutes,
    });
  }

  allShowings() {
    let showings = {};
    for (let i = 0; i < this.screens.length; i++) {
      const screen = this.screens[i];
      for (let j = 0; j < screen.showings.length; j++) {
        const showing = screen.showings[j];
        if (!showings[showing.film.name]) {
          showings[showing.film.name] = [];
        }
        showings[showing.film.name].push(
          `${screen.name} ${showing.film.name} (${showing.film.rating}) ${showing.startTime} - ${showing.endTime}`
        );
      }
    }

    return showings;
  }
}

module.exports = Cinema;
