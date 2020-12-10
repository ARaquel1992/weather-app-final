//Date
function formatDate (timestamp) {
    let date = new Date(timestamp);

    let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let weekDay = weekDays[date.getDay()];

    let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[date.getMonth()];

    let day = now.getDate();
    return `${weekDay}, ${month}, ${day}`;
}
let todayDate = document.querySelector("#current-date");
let now = new Date();
todayDate.innerHTML = formatDate(now);

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

//Request Forecast
function searchCity(city) {
let apiKey = "f84d3c7abfdce95b297035c27acaaab5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(currentData);
}

//Current Details (temp, wind)
function currentData(response) {

    let temperature = document.querySelector("#today-temperature");
    temperature.innerHTML = Math.round(response.data.main.temp);

    let city = response.data.name;
    let country = response.data.sys.country;
    let h1 = document.querySelector("#searched-city");
    h1.innerHTML = `${city}, ${country}`;

    let feelsLike = document.querySelector("#feeling");
    feelsLike.innerHTML = Math.round(response.data.main.feels_like);

    let maxToday = document.querySelector("#max-temp-today");
    maxToday.innerHTML = Math.round(response.data.main.temp_max);

    let minToday = document.querySelector("#min-temp-today");
    minToday.innerHTML = Math.round(response.data.main.temp_min);

    let humidityToday = document.querySelector("#humidity");
    humidityToday.innerHTML = response.data.main.humidity;

    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

    let icon = document.querySelector("#icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);
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
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getPosition);