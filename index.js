


const searchBtn = document.querySelector('#searchBtn'); 
const input = document.querySelector('input');
const currTemp = document.querySelector('.currTemp');
const dayOfWeek = document.querySelector('.dayofweek');
const icon = document.querySelector('.icon');
const forecast = document.querySelector('.weatherForecast');
let currTempUrl = 'http://api.openweathermap.org/data/2.5/weather' ;
let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast' ;

const weather1 = new Weather (input,currTempUrl,forecastUrl,currTemp, forecast);

searchBtn.addEventListener('click', () =>{
  
weather1.displayCurrTempData();
  weather1.displayForecastData();
});


  
