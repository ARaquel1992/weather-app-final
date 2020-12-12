//Date
function formatDate (timestamp) {
    let date = new Date(timestamp);

    let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[date.getMonth()];

    let day = now.getDate();
    return `${month}, ${day}`;
}
let todayDate = document.querySelector("#date");
let now = new Date();
todayDate.innerHTML = formatDate(now);

//Week days
function formatWeekDays(timestamp) {
    let date = new Date(timestamp);

    let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let weekDay = weekDays[date.getDay()];
    return `${weekDay}`
}
let currentWeekDay = document.querySelector("#week-day");
currentWeekDay.innerHTML = formatWeekDays(now);

//Hours
function formatHours(timestamp) {
    let date = new Date (timestamp);

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}
let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = formatHours(now);

//Request data
function searchCity(city) {
    let apiKey = "f84d3c7abfdce95b297035c27acaaab5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(currentData);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(forecastHour);
}

//Current Details (temp, wind)
function currentData(response) {

    let temperature = document.querySelector("#today-temperature");
    celsiusTemperature = response.data.main.temp;
    temperature.innerHTML = Math.round(celsiusTemperature);

    let city = response.data.name;
    let country = response.data.sys.country;
    let h1 = document.querySelector("#searched-city");
    h1.innerHTML = `${city}, ${country}`;

    let feelsLike = document.querySelector("#feeling");
    feelsTemperature = response.data.main.feels_like;
    feelsLike.innerHTML = Math.round(feelsTemperature);

    let maxToday = document.querySelector("#max-temp-today");
    maxTemperatureToday = response.data.main.temp_max;
    maxToday.innerHTML = Math.round(maxTemperatureToday);

    let minToday = document.querySelector("#min-temp-today");
    minTemperatuteToday = response.data.main.temp_min;
    minToday.innerHTML = Math.round(minTemperatuteToday);

    let humidityToday = document.querySelector("#humidity");
    humidityToday.innerHTML = response.data.main.humidity;

    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);
    
    //Request forecast
    let apiKey = "f84d3c7abfdce95b297035c27acaaab5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(forecastData);   

}

//Forecast
function forecastData(response){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 1; index < 7; index++) {
        let forecast = response.data.daily[index];
        forecastElement.innerHTML += `<div class="col-2">
                    <h3>
                        ${formatWeekDays(forecast.dt * 1000)}
                    </h3>
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="icon-forecast" />
                    <div class="weather-forecast-temperature">
                        <strong>${Math.round(forecast.temp.max)}°</strong> | ${Math.round(forecast.temp.min)}°
                    </div>
                </div>`; 
    }
}

//Forecast Hours 
function forecastHour(response) {
    let forecastHourElement = document.querySelector("#hour-forecast");
    forecastHourElement.innerHTML = null
    let HourForecast = null;

    for (let index = 0; index < 4; index++) {
        HourForecast = response.data.list[index];
        forecastHourElement.innerHTML += `<div class="col-3">
                    <p>
                        <strong>${formatHours(HourForecast.dt * 1000)}</strong>
                    </p>
                    <p>${Math.round(HourForecast.main.temp)}°</p>
                </div>`;
    }

}

//Search engine
function search(event) {
    event.preventDefault();
    let citySearch = document.querySelector("#searched-city");
    let searchField = document.querySelector("#search-field");
    citySearch.innerHTML = searchField.value;

    searchCity(searchField.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit",search);

//Geolocation
function getPosition (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "f84d3c7abfdce95b297035c27acaaab5";
    let currentLocUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(currentLocUrl).then(currentData);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(forecastHour);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getPosition);

//Conversion of units
//conversion fahrenheit
function displayFahrenheitTemp(event) {
    event.preventDefault();
    
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let temperatureC = document.querySelector("#today-temperature");
    let temperatureF = (celsiusTemperature * 9) / 5 + 32;
    temperatureC.innerHTML = Math.round(temperatureF);

    let feelsLikeC = document.querySelector("#feeling");
    let feelsLikeF = (feelsTemperature * 9) / 5 + 32;
    feelsLikeC.innerHTML = Math.round(feelsLikeF);

  let tempMaxC = document.querySelector("#max-temp-today");
  let tempmaxF = (maxTemperatureToday * 9) / 5 + 32;
  tempMaxC.innerHTML = Math.round(tempmaxF);

  let tempMinC = document.querySelector("#min-temp-today");
  let tempMinF = (minTemperatuteToday * 9) / 5 + 32;
  tempMinC.innerHTML = Math.round(tempMinF);
}

//Conversion celsius
function displayCelsiusTemp(event) {
    event.preventDefault();

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let temperatureC = document.querySelector("#today-temperature");
    temperatureC.innerHTML = Math.round(celsiusTemperature);

    let feelsLike = document.querySelector("#feeling");
    feelsLike.innerHTML = Math.round(feelsTemperature);

    let maxToday = document.querySelector("#max-temp-today");
    maxToday.innerHTML = Math.round(maxTemperatureToday);
    
    let minToday = document.querySelector("#min-temp-today");
    minToday.innerHTML = Math.round(minTemperatuteToday);  
}

let celsiusTemperature = null;

let feelsTemperature = null;

let maxTemperatureToday = null;

let minTemperatuteToday = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("New York");