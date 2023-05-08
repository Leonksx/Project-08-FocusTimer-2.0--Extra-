const buttonForest = document.querySelector('.forest')
const buttonRain = document.querySelector('.rain')
const buttonCoffeeshop = document.querySelector('.coffeeshop')
const buttonFireplace = document.querySelector('.fireplace')

const svgForest = document.querySelector('.forest .svg')
const svgRain = document.querySelector('.rain .svg')
const svgCoffeeshop = document.querySelector('.coffeeshop .svg')
const svgFireplace = document.querySelector('.fireplace .svg')

const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
let minutes = Number(minutesDisplay.textContent)
let seconds = Number(secondsDisplay.textContent)

const buttonPlay = document.querySelector('.play')
const buttonPlayFalse = document.querySelector('.playFalse')
const buttonStop = document.querySelector('.stop')
const buttonTimerUp = document.querySelector('.up')
const buttonTimerDown = document.querySelector('.down')

let timerTimeOut

const soundForest = new Audio('./sounds/Forest.wav')
const soundRain = new Audio('./sounds/Rain.wav')
const soundCoffeeshop = new Audio('./sounds/Coffeeshop.wav')
const soundFireplace = new Audio('./sounds/Fireplace.wav')
const kitchenTimer = new Audio('https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true')

function resetControls() {
  buttonForest.classList.remove('forestOn')
  buttonRain.classList.remove('rainOn')
  buttonCoffeeshop.classList.remove('coffeeshopOn')
  buttonFireplace.classList.remove('fireplaceOn')

  svgForest.classList.remove('white')
  svgRain.classList.remove('white')
  svgCoffeeshop.classList.remove('white')
  svgFireplace.classList.remove('white')
  
  buttonPlay.classList.remove('hide')
  buttonPlayFalse.classList.add('hide')

  soundForest.pause()
  soundRain.pause()
  soundCoffeeshop.pause()
  soundFireplace.pause()
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function resetTimer() {
  updateTimerDisplay(25,0)
  clearTimeout(timerTimeOut)
}

/* Regressive Timer */

function countdown() {
  timerTimeOut = setTimeout(function() {
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)

    updateTimerDisplay(25, 0)

    if(minutes <= 0 && seconds <= 0) {
      resetControls()
      kitchenTimer.play()
      return
    }

    if(seconds <= 0) {
      seconds = 60
      --minutes
    }

    updateTimerDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
}

/* toggle function for each button */

let isForestPlaying
let isRainPlaying
let isCoffeeshopPlaying
let isFireplacePlaying

function toggleForest() {
  if(isForestPlaying) {
    soundForest.pause()
  } else {
    soundForest.play()
    soundForest.loop = true
  }
}

function toggleRain() {
  if(isRainPlaying) {
    soundRain.pause()
  } else {
    soundRain.play()
    soundRain.loop = true
  }
}

function toggleCoffeeshop() {
  if(isCoffeeshopPlaying) {
    soundCoffeeshop.pause()
  } else {
    soundCoffeeshop.play()
    soundCoffeeshop.loop = true
  }
}

function toggleFireplace() {
  if(isFireplacePlaying) {
    soundFireplace.pause()
  } else {
    soundFireplace.play()
    soundFireplace.loop = true
  }
}

/* Identify if the song is playing */

soundForest.onplaying = function() {
  isForestPlaying = true
}
soundForest.onpause = function() {
  isForestPlaying = false
}

soundRain.onplaying = function() {
  isRainPlaying = true
}
soundRain.onpause = function() {
  isRainPlaying = false
}

soundCoffeeshop.onplaying = function() {
  isCoffeeshopPlaying = true
}
soundCoffeeshop.onpause = function() {
  isCoffeeshopPlaying = false
}

soundFireplace.onplaying = function() {
  isFireplacePlaying = true
}
soundFireplace.onpause = function() {
  isFireplacePlaying = false
}

/* Player events */

buttonPlay.addEventListener('click', function() {
  countdown()
  buttonPlay.classList.add('hide')
  buttonPlayFalse.classList.remove('hide')
})

buttonStop.addEventListener('click', function() {
  resetControls()
  resetTimer()
})

buttonTimerUp.addEventListener('click', function() {
  let newMinutes = minutes + 5
  if(!newMinutes) {
    minutes + 5
    return
  }

  minutes = newMinutes
  updateTimerDisplay(minutes, 0)
})

buttonTimerDown.addEventListener('click', function() {
  let newMinutes = minutes - 5
  if(!newMinutes) {
    minutes - 5
    return
  }

  minutes = newMinutes
  updateTimerDisplay(minutes, 0)
})

/* Right Panel events */

buttonForest.addEventListener('click', function() {
  buttonForest.classList.toggle('forestOn')
  buttonRain.classList.remove('rainOn')
  buttonCoffeeshop.classList.remove('coffeeshopOn')
  buttonFireplace.classList.remove('fireplaceOn')

  svgForest.classList.toggle('white')
  svgRain.classList.remove('white')
  svgCoffeeshop.classList.remove('white')
  svgFireplace.classList.remove('white')

  toggleForest()
  soundRain.pause()
  soundCoffeeshop.pause()
  soundFireplace.pause()
})

buttonRain.addEventListener('click', function() {
  buttonForest.classList.remove('forestOn')
  buttonRain.classList.toggle('rainOn')
  buttonCoffeeshop.classList.remove('coffeeshopOn')
  buttonFireplace.classList.remove('fireplaceOn')

  svgForest.classList.remove('white')
  svgRain.classList.toggle('white')
  svgCoffeeshop.classList.remove('white')
  svgFireplace.classList.remove('white')

  toggleRain()
  soundForest.pause()
  soundCoffeeshop.pause()
  soundFireplace.pause()
})

buttonCoffeeshop.addEventListener('click', function() {
  buttonForest.classList.remove('forestOn')
  buttonRain.classList.remove('rainOn')
  buttonCoffeeshop.classList.toggle('coffeeshopOn')
  buttonFireplace.classList.remove('fireplaceOn')

  svgForest.classList.remove('white')
  svgRain.classList.remove('white')
  svgCoffeeshop.classList.toggle('white')
  svgFireplace.classList.remove('white')

  toggleCoffeeshop()
  soundForest.pause()
  soundRain.pause()
  soundFireplace.pause()
})

buttonFireplace.addEventListener('click', function() {
  buttonForest.classList.remove('forestOn')
  buttonRain.classList.remove('rainOn')
  buttonCoffeeshop.classList.remove('coffeeshopOn')
  buttonFireplace.classList.toggle('fireplaceOn')

  svgForest.classList.remove('white')
  svgRain.classList.remove('white')
  svgCoffeeshop.classList.remove('white')
  svgFireplace.classList.toggle('white')

  toggleFireplace()
  soundForest.pause()
  soundRain.pause()
  soundCoffeeshop.pause()
})