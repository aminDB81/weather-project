const apiKey = "d60db15634e04cac888193305231308";
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const defaultCity = "New York"

async function checkWeather(city) {
    const response = await fetch(apiUrl + apiKey + `&q=${city}`);
    const data = await response.json();
    if (data.error) {
        // Show an alert for incorrect city name or API error
        alert("Please enter a valid city");
        return;
    }

    console.log(data);
    document.querySelector(".city").innerHTML = data.location.name + ", " + data.location.country;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

    const weatherCondition = data.current.condition.text.toLowerCase();
    weatherIcon.src = getWeatherIcon(weatherCondition);

}
function setDefaultWeather() {
    checkWeather(defaultCity);
}

function getWeatherIcon(weatherCondition) {
    if (weatherCondition.match(/cloud|overcast/i)) {
        return "images/clouds.png";
    } else if (weatherCondition.match(/clear|sunny|fair/i)) {
        return "images/clear.png";
    } else if (weatherCondition.match(/rain|shower/i)) {
        return "images/rain.png";
    } else if (weatherCondition.match(/drizzle/i)) {
        return "images/drizzle.png";
    } else if (weatherCondition.match(/mist|fog|haze/i)) {
        return "images/mist.png";
    } else if (weatherCondition.match(/snow|flurry/i)) {
        return "images/snow.png";
    } else {
        return "images/default.png";
    }
}
window.addEventListener("load", setDefaultWeather);
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
