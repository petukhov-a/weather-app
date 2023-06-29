const currentTemperature = document.querySelector('.current-temperature');
const currentLocation = document.querySelector('.current-location');
const currentWeatherWrapper = document.querySelector('.current-weather-wrapper');
const currentWeatherIconImg = document.querySelector('.current-weather-icon-img');
const lastUpdated = document.querySelector('.last-updated');
const searchCityInput = document.querySelector('.search-city-input');
const searchLocationForm = document.querySelector('.search-location-form');
const refreshWeatherBtn = document.querySelector('.refresh-weather-btn');
const refreshIcon = refreshWeatherBtn.querySelector('i');
const forecastHourWrapper = document.querySelector('.forecast-hour-wrapper');
const forecast3DaysWrapper = document.querySelector('.forecast-3-days-wrapper');
const forecastForHours = document.querySelector('.forecast-for-hours');
const forecast3Days = document.querySelector('.forecast-3-days');
const currentWindSpeed = document.querySelector('.wind-speed');
const currentRainChance = document.querySelector('.rain-chance');
const feelsLike = document.querySelector('.feels-like');
const currentVisibilityKm = document.querySelector('.visibility-km');

const monthsNames = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

const api = 'f307338ed98942f6a28203223232406';
let locationName = 'Moscow';
let url = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${locationName}&days=4&aqi=no&alerts=no`;

const formatTemperature = (temperature) => {
    return temperature > 0 ?  `+${temperature}°C` : `${temperature}°C`;
}

const showCurrentWeather = (data) => {
    const temperature = formatTemperature(data.current.temp_c);
    const feelsLikeTemperature = formatTemperature(data.current.feelslike_c);
    const windSpeed = data.current.wind_kph;
    const visibilityKm = data.current.vis_km;
    const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;

    lastUpdated.innerHTML = `<span>Last updated</span><br> ${data.current.last_updated}`;
    currentLocation.textContent = data.location.name;
    currentTemperature.textContent = temperature;
    currentWeatherIconImg.setAttribute('src', data.current.condition.icon);
    feelsLike.innerHTML = `<span>Feels like</span> ${feelsLikeTemperature}`;
    currentWindSpeed.innerHTML = `<span>Wind speed</span> ${windSpeed}kph`;
    currentVisibilityKm.innerHTML = `<span>Visibility</span> ${visibilityKm}km`;
    currentRainChance.innerHTML = `<span>Rain chance</span> ${rainChance}%`;
}

const showWeatherPerHour = (data) => {
    forecastForHours.innerHTML = '';
    const forecastHours = data.forecast.forecastday[0].hour;

    forecastHours.forEach(forecastHour => {
        const forecastForHourElement = document.createElement('div');
        forecastForHourElement.classList.add('forecast-for-hour');
        const hour = forecastHour.time.split(' ').at(-1);
        let temperature = formatTemperature(forecastHour.temp_c);

        forecastForHourElement.innerHTML = `
            <img src=${forecastHour.condition.icon} class="forecast-icon-img">
            <p class="forecast-hour-temperature">${temperature}</p>
            <p class="hour">${hour}</p>
            `
        forecastForHours.append(forecastForHourElement);
    })
}

showWeatherForDays = (data) => {
    forecast3Days.innerHTML = '';

    data.forecast.forecastday.forEach(forecastDay => {
        const forecastForDaysElement = document.createElement('div');
        forecastForDaysElement.classList.add('forecast-for-day');
        let [year, month, day] = forecastDay.date.split('-');
    
        const minTemperature = formatTemperature(forecastDay.day.mintemp_c);
        const maxTemperature = formatTemperature(forecastDay.day.maxtemp_c);
    
        forecastForDaysElement.innerHTML = `
            <p class="forecast-date">${day} ${monthsNames[+month]}</p>
            <img src="${forecastDay.day.condition.icon}" class="forecast-day-icon-img">
            <div class="min-max-temperature">
                <p class="min">${minTemperature}</p>
                <p class="max">${maxTemperature}</p>
            </div>
        `
    
        forecast3Days.append(forecastForDaysElement);
    });
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
            showWeatherPerHour(data);
            showWeatherForDays(data);
        }
    },)
      .then(() => refreshIcon.classList.remove('fa-spin'));
}

fetchWeather(url);

searchLocationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    locationName = searchCityInput.value;
    url = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=${locationName}&days=3&aqi=no&alerts=no`;
    searchCityInput.value = '';
    fetchWeather(url);
});

refreshWeatherBtn.addEventListener('click', () => {
    fetchWeather(url);
});

currentWeatherWrapper.addEventListener('click', () => {
    const currentWeatherLeft = document.querySelector('.current-weather-left');
    const currentWeatherRight = document.querySelector('.current-weather-right');

    forecast3DaysWrapper.classList.toggle('active-3-days-wrapper');
    forecastHourWrapper.classList.toggle('active-hour-wrapper');

    currentWeatherLeft.classList.toggle('active-current-weather-sides');
    currentWeatherRight.classList.toggle('active-current-weather-sides');
});