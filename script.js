const currentTemperature = document.querySelector('.current-temperature');
const currentLocation = document.querySelector('.current-location');
const weatherIconImg = document.querySelector('.weather-icon-img');

const url = 'http://api.weatherapi.com/v1/current.json?key=f307338ed98942f6a28203223232406&q=Moscow&aqi=no';
fetch(url, {
    method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    currentLocation.textContent = data.location.name;
    currentTemperature.textContent = data.current.temp_c + '°C';
    weatherIconImg.setAttribute('src', data.current.condition.icon);
  });