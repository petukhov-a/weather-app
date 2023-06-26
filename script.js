const currentTemperature = document.querySelector('.current-temperature');
const currentLocation = document.querySelector('.current-location');
const weatherIconImg = document.querySelector('.weather-icon-img');
const lastUpdated = document.querySelector('.last-updated');
const searchCityInput = document.querySelector('.search-city-input');
const searchLocationForm = document.querySelector('.search-location-form');
const refreshWeatherBtn = document.querySelector('.refresh-weather-btn');
const refreshIcon = refreshWeatherBtn.querySelector('i');

const api = 'f307338ed98942f6a28203223232406';
let locationName = 'Moscow';
let url = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${locationName}&days=3&aqi=no&alerts=no`;

const fetchWeather = (url) => {
    refreshIcon.classList.add('fa-spin');
    fetch(url, {
        method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
            console.log(data);
            lastUpdated.innerHTML = `<span>Last updated</span> ${data.current.last_updated}`;
            currentLocation.textContent = data.location.name;
            currentTemperature.textContent = data.current.temp_c + '°C';
            weatherIconImg.setAttribute('src', data.current.condition.icon);
        }
    },)
      .then(() => refreshIcon.classList.remove('fa-spin'));
}

fetchWeather(url);

searchLocationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    locationName = searchCityInput.value;
    url = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${locationName}&days=3&aqi=no&alerts=no`;;
    searchCityInput.value = '';
    fetchWeather(url);
});

refreshWeatherBtn.addEventListener('click', () => {
    fetchWeather(url);
});