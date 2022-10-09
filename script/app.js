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
  let iconWeather = document.querySelectorAll("#iconWeather");
  switch (condition) {
    case "Clear":
      iconWeather.src = "/images/sun.png";
      break;
    case "Clouds":
      iconWeather.src = "/images/cloudy-sun.png";
      break;
    case "Snow":
      iconWeather.src = "/images/snow.png";
      break;
    case "Mist":
      iconWeather.src = "/images/atmosphere.png";
      break;
    case "Smoke":
      iconWeather.src = "/images/atmosphere.png";
      break;
    case "Haze":
      iconWeather.src = "/images/atmosphere.png";
      break;
    case "Dust":
      iconWeather.src = "/images/atmosphere.png";
      break;
    case "Fog":
      iconWeather.src = "/images/atmosphere.png";
      break;
    case "Sand":
      iconWeather.src = "/images/atmosphere.png";
      break;
    case "Ash":
      iconWeather.src = "/images/atmosphere.png";
      break;
    case "Squall":
      iconWeather.src = "/images/storm.png";
      break;
    case "Tornado":
      iconWeather.src = "/images/storm.png";
      break;
    case "Rain":
      iconWeather.src = "/images/rain.png";
      break;
    case "Drizzle":
      iconWeather.src = "/images/drizzle.png";
      break;
    case "Thunderstorm":
      iconWeather.src = "/images/thunder.png";
      break;
    default:
      iconWeather.src = "/images/sun.png";
  }
}

function searchCity(city) {
  let apiKey = `4cd0a6660931c1d67970885656ad28db`;
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
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#current");
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
