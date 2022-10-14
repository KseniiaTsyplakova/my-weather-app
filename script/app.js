let now = new Date();
let currentDate = document.querySelector("#current-date");
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();

let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

now = `${day}, ${date} ${month} ${hours}:${minutes}`;
currentDate.innerHTML = now;

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-5 text-center border border-1 border-dark p-3 mt-3">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
      <div class="weather-forecast-date">${day}</div>
      <img src="images/sun.png" alt="" width="50" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">30° </span>
        <span class="weather-forecast-temperature-min">17° </span>
      </div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `72bb9dab46b9ec3d65f423c63f27a9b8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherConditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temp");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#wind").innerHTML = Math.round(
    (response.data.wind.speed * 3600) / 1000
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;

  let condition = response.data.weather[0].main;

  let iconWeather = document.querySelector("#iconWeather");
  switch (condition) {
    case "Clear":
      iconWeather.setAttribute("src", "images/sun.png");
      break;
    case "Clouds":
      iconWeather.setAttribute("src", "images/cloudy-sun.png");
      break;
    case "Snow":
      iconWeather.setAttribute("src", "images/snow.png");
      break;
    case "Mist":
      iconWeather.setAttribute("src", "images/atmosphere.png");
      break;
    case "Smoke":
      iconWeather.setAttribute("src", "images/atmosphere.png");
      break;
    case "Haze":
      iconWeather.setAttribute("src", "images/atmosphere.png");
      break;
    case "Dust":
      iconWeather.setAttribute("src", "images/atmosphere.png");
      break;
    case "Fog":
      iconWeather.setAttribute("src", "images/atmosphere.png");
      break;
    case "Sand":
      iconWeather.setAttribute("src", "images/atmosphere.png");
      break;
    case "Ash":
      iconWeather.setAttribute("src", "images/atmosphere.png");
      break;
    case "Squall":
      iconWeather.setAttribute("src", "images/storm.png");
      break;
    case "Tornado":
      iconWeather.setAttribute("src", "images/storm.png");
      break;
    case "Rain":
      iconWeather.setAttribute("src", "images/rain.png");
      break;
    case "Drizzle":
      iconWeather.setAttribute("src", "images/drizzle.png");
      break;
    case "Thunderstorm":
      iconWeather.setAttribute("src", "images/thunder.png");
      break;
    default:
      iconWeather.setAttribute("src", "images/atmosphere.png");
  }

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `72bb9dab46b9ec3d65f423c63f27a9b8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherConditions);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchLocation(position) {
  let apiKey = `72bb9dab46b9ec3d65f423c63f27a9b8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#current-position");
button.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Paris");
