const API__KEY = "bd7ae4e0af77037eabc83d53bb6776b0"

const API__URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchInput = document.querySelector('#searchCity');
const searchButton = document.querySelector('#searchButton')
const weather = document.querySelector('.weather__info')
const linkWeatherIcon = document.querySelector('.icon__weather-city')
const syntaxError = document.querySelector('.weather__syntax-error')
const fetchError = document.querySelector('.weather__fetch-error')
const fetchErrorTitle = document.querySelector('.fetch__error-title')
const windDirection = document.querySelector('.item__wind-text')
const windArrow = document.querySelector('.item__wind-arrow')

async function getWeather(city) {
  try {
    const response = await fetch(API__URL + city + `&appid=${API__KEY}&lang=ru`);
    if (response.status == '404') {
      syntaxError.style.display = 'flex'
      weather.style.display = 'none'
    } else {
      syntaxError.style.display = 'none'
      fetchError.style.display = 'none'
      
      const data = await response.json();
      document.querySelector('#city').innerHTML = data.name
      document.querySelector('#temperature').innerHTML = Math.round(data.main.temp) + '&deg;C'
      document.querySelector('#humidity').innerHTML = data.main.humidity + '%'
      document.querySelector('#wind').innerHTML = Math.round(data.wind.speed) + ' м/с'
      document.querySelector('.icon__weather-city').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      windDirection.innerHTML = getWindDirection(data.wind.deg)
      windArrow.style.transform = `rotate(${180 + data.wind.deg}deg)`
      weather.style.display = 'block'
    }
  } catch (error) {
    fetchError.style.display = 'flex'
    fetchErrorTitle.innerHTML = error.message
    console.log(error.message)
  }
}

function getWindDirection(deg) {
  if(deg > 330 && deg <= 360 || deg >= 0 && deg < 30 ) {
    return 'С'
  } else if(deg >= 30 && deg <= 60) {
    return 'СВ'
  } else if(deg > 60 && deg < 120) {
    return 'В'
  } else if(deg >= 120 && deg <= 150) {
    return 'ЮВ'
  } else if(deg > 150 && deg < 210) {
    return 'Ю'
  } else if(deg >= 210 && deg <= 240) {
    return 'ЮЗ'
  } else if(deg > 240 && deg < 300) {
    return 'З'
  } else if(deg >= 300 && deg <= 330) {
    return 'CЗ'
  }
}

function getInputValue() {
  if (searchInput.value) {
    getWeather(searchInput.value)
    searchInput.value = ''
  }
}

function handleKeyDown(e) {
  if(e.keyCode === 13) {
    getWeather(searchInput.value)
    searchInput.value = ''
  }
}

searchButton.addEventListener('click', getInputValue)
searchInput.addEventListener('keydown', e => handleKeyDown(e))