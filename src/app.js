//Day and Time
function formatDate (date) {
    let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let weekDay = weekDays[date.getDay()];
    console.log(weekDays[date.getDay()]);

    let months =["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[date.getMonth()];
    console.log(months[date.getMonth()]);

    let day = now.getDate();
    return `${weekDay}, ${month}, ${day}`;
}
let todayDate = document.querySelector("#current-date");
let now = new Date();
console.log(new Date());
todayDate.innerHTML = formatDate(now);