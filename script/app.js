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
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
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
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(tempElement * 1.8 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round((tempElement - 32) * 0.5556);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Sydney");

/* code will be used with API
let city = prompt("Enter a city?");
if (city === null || city === "") {
  alert(`You did not enter a city. Please, try again`);
} else {
  city = city.toLowerCase().trim();
  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;

    city = city
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    let celsiusTemperature = Math.round(temperature);
    let fahrenheitTemperature = Math.round(temperature * 1.8 + 32);
*/
