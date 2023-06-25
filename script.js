const currentTemperature = document.querySelector('.current-temperature');
const currentLocation = document.querySelector('.current-location');
const weatherIconImg = document.querySelector('.weather-icon-img');
const searchCityInput = document.querySelector('.search-city-input');
const searchCityForm = document.querySelector('.search-city-form');

const api = 'f307338ed98942f6a28203223232406';

const fetchWeather = (url) => {
    fetch(url, {
        method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        currentLocation.textContent = data.location.name;
        currentTemperature.textContent = data.current.temp_c + '°C';
        weatherIconImg.setAttribute('src', data.current.condition.icon);
      });
}

let locationName = 'Moscow';
const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${locationName}&aqi=no`;

fetchWeather(url);

searchCityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    locationName = searchCityInput.value;
    const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${locationName}&aqi=no`;
    fetchWeather(url);
});