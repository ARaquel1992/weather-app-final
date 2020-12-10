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
let apiKey = "f84d3c7abfdce95b297035c27acaaab5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(currentData);

//Current Details (temp, wind)
function currentData(response) {
    console.log(response);
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
}