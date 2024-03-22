const apiKey = "YOUR API KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const hiddenElement = document.getElementById("hidden");
const speedElement = document.getElementById("speed");
const humidityElement = document.getElementById("humidity");
const feelingElement = document.getElementById("feeling");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function capitalizeWords(text) {
  return text.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });
}

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = capitalizeWords(
        data.weather[0].description
      );
      speedElement.textContent = `${data.wind.speed} mph`;
      humidityElement.textContent = data.main.humidity;
      feelingElement.textContent = `${Math.round(data.main.feels_like)}°C`;
      hiddenElement.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
