// api.openweathermap.org/data/2.5/weather?q={city name}&appid={A
    //c633d667f5fbc888ff68a8e74f44fa2b
    
const api = {
    key: "c633d667f5fbc888ff68a8e74f44fa2b",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);//setQuery   is the parameter here.

//this function is for ....to fetch the details after pressing enter.
function setQuery(evt) {
    if (evt.keyCode == 13){ //13 is the keycode of 'enter' button.
        getResult(searchbox.value);
    }
}

function getResult(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    // console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerText = `${Math.round(weather.main.temp)}°C`//to put degree symbol use=> numlock+alt+0176 

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'Octomber', 'November', 'December'];
    
    let days = ['Sunday', 'Monday', 'Tuesdat', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}