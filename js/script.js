
const apiKey = "d60db15634e04cac888193305231308";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const defaultCity = "rio";
const historyContainer = document.querySelector(".history");

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
let history = [];


if (localStorage.getItem("weatherHistory")) {
    history = JSON.parse(localStorage.getItem("weatherHistory"));
    populateHistory();
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + apiKey + `&q=${city}`);
    const data = await response.json();
    if (data.error) {
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

    updateHistory(
        data.location.name,
        Math.round(data.current.temp_c),
        data.current.humidity,
        data.current.wind_kph,
        weatherCondition
    );
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

function updateHistory(city, temp, humidity, wind, condition) {
    // Check if the city is already in the history
    const existingCity = history.find(item => item.city === city);

    if (!existingCity) {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");
        historyItem.innerHTML = `
            <img src="${getWeatherIcon(condition)}" alt="weather icon" class="history-icon">
            <p class="history-city">${city}</p>
            <p class="history-temp">${temp}°C</p>
            <p class="history-humidity">Humidity : <span class="humidity-value">${humidity}%</span></p>
            <p class="history-wind">Wind : <span class="wind-value">${wind} km/h</span></p>
        `;

        historyContainer.insertBefore(historyItem, historyContainer.firstChild);

        // Add the city to the history array
        history.unshift({ city, temp, humidity, wind, condition });

        // Store the updated history array in local storage
        localStorage.setItem("weatherHistory", JSON.stringify(history));
    }
}

function populateHistory() {
    historyContainer.innerHTML = ""; // Clear the history container

    for (const item of history) {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");
        historyItem.innerHTML = `
            <img src="${getWeatherIcon(item.condition)}" alt="weather icon" class="history-icon">
            <p class="history-city">${item.city}</p>
            <p class="history-temp">${item.temp}°C</p>
            <p class="history-humidity">Humidity : <span class="humidity-value">${item.humidity}%</span></p>
            <p class="history-wind">Wind : <span class="wind-value">${item.wind} km/h</span></p>
        `;

        historyContainer.appendChild(historyItem);
    }
}
function alertVpn() {
    alert("Use a VPN because it uses a specific API");
    alert("Make sure your VPN is connected")
}
alertVpn();
