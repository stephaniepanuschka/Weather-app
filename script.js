function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let cityName = response.data.city;
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let icon = response.data.condition.icon_url;
  let description = response.data.condition.description;

  // Update DOM elements
  document.querySelector("#city-name").innerHTML = cityName;
  document.querySelector("#temperature").innerHTML = `${temperature}°C`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${windSpeed} km/h`;

  // Update icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${icon}" alt="${description}" width="50" />`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value.trim();

  if (city) {
    let apiKey = "0918e26t24fa3e41afd9f8649o1cbb80";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature).catch(function () {
      alert("Sorry, we couldn't find the weather for that city.");
    });
  }
}

function updateDateTime() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let formattedTime = `${day} ${hours}:${minutes}`;
  document.querySelector("#date-time").innerHTML = formattedTime;
}

updateDateTime();

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
