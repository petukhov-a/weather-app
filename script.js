const currentTemperature = document.querySelector('.current-temperature');
const currentLocation = document.querySelector('.current-location');
const currentWeatherIconImg = document.querySelector('.current-weather-icon-img');
const lastUpdated = document.querySelector('.last-updated');
const searchCityInput = document.querySelector('.search-city-input');
const searchLocationForm = document.querySelector('.search-location-form');
const refreshWeatherBtn = document.querySelector('.refresh-weather-btn');
const refreshIcon = refreshWeatherBtn.querySelector('i');
const forecastHourWrapper = document.querySelector('.forecast-hour-wrapper');
const forecast3DaysWrapper = document.querySelector('.forecast-3-days-wrapper');

const api = 'f307338ed98942f6a28203223232406';
let locationName = 'Moscow';
let url = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${locationName}&days=3&aqi=no&alerts=no`;

const showCurrentWeather = (data) => {
    const addPlusSign = (temperature) => {
        return temperature > 0 ? '+' + temperature : temperature;
    }

    let temperature = addPlusSign(data.current.temp_c);

    let minTemperature = addPlusSign(data.forecast.forecastday[0].day.mintemp_c);
    let maxTemperature = addPlusSign(data.forecast.forecastday[0].day.maxtemp_c);

    const minTemperatureElement = document.querySelector('.min-max-temperature .min');
    const maxTemperatureElement = document.querySelector('.min-max-temperature .max');

    lastUpdated.innerHTML = `<span>Last updated</span> ${data.current.last_updated}`;
    currentLocation.textContent = data.location.name;
    currentTemperature.textContent = temperature + '°C';
    currentWeatherIconImg.setAttribute('src', data.current.condition.icon);
    minTemperatureElement.textContent = minTemperature + '°C';
    maxTemperatureElement.textContent = maxTemperature + '°C';
}

const showPerHourWeather = (data) => {
    forecastHourWrapper.innerHTML = '';
    const forecastHours = data.forecast.forecastday[0].hour;

    forecastHours.forEach(forecastHour => {
        const forecastForHourElement = document.createElement('div');
        const hour = forecastHour.time.split(' ').at(-1);
        let temperature = forecastHour.temp_c;
        temperature =  temperature > 0 ? '+' + temperature : temperature;

        forecastForHourElement.innerHTML = `
            <div class="forecast-for-hour">
                <img src=${forecastHour.condition.icon} class="forecast-icon-img">
                <p class="forecast-hour-temperature">${temperature}°C</p>
                <p class="hour">${hour}</p>
            </div>
            `
        forecastHourWrapper.append(forecastForHourElement);
    })
}

showWeatherForDays = (data) => {
    const forecastForDay = document.createElement('div');

}

const fetchWeather = (url) => {
    refreshIcon.classList.add('fa-spin');
    fetch(url, {
        method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.error === undefined) {
            showCurrentWeather(data);
            showPerHourWeather(data);
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