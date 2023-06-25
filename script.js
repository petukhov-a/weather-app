const currentTemperature = document.querySelector('.current-temperature');
const currentLocation = document.querySelector('.current-location');
const weatherIconImg = document.querySelector('.weather-icon-img');
const searchCityInput = document.querySelector('.search-city-input');
const searchCityForm = document.querySelector('.search-city-form');
const refreshWeatherBtn = document.querySelector('.refresh-weather-btn');
const refreshIcon = refreshWeatherBtn.querySelector('i');

const api = 'f307338ed98942f6a28203223232406';
let locationName = 'Moscow';
let url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${locationName}&aqi=no`;

const fetchWeather = (url) => {
    refreshIcon.classList.add('fa-spin');
    fetch(url, {
        method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        currentLocation.textContent = data.location.name;
        currentTemperature.textContent = data.current.temp_c + '°C';
        weatherIconImg.setAttribute('src', data.current.condition.icon);
      })
      .then(() => refreshIcon.classList.remove('fa-spin'));
}

fetchWeather(url);

searchCityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    locationName = searchCityInput.value;
    url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${locationName}&aqi=no`;
    searchCityInput.value = '';
    fetchWeather(url);
});

refreshWeatherBtn.addEventListener('click', () => {
    fetchWeather(url);
});