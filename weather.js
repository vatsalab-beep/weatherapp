class Weather {

    constructor (input,currTempUrl,forecastUrl,divWithTempData, divwithForecastData)
    {
      this.input = input;
      this.currTempUrl = currTempUrl;
      this.divWithTempData = divWithTempData;
      this.forecastUrl = forecastUrl;
      this.divwithForecastData = divwithForecastData;
    
    }
  
    async getCurrTempData (){
     
        const response = await axios.get(this.currTempUrl, {
          params:{
            q: this.input.value,
            units: 'imperial',
            appid: 'fe4fa4212c8255438f8a4734f0df2757',
        
          }
        });
        return response.data;

      
    }
    async displayCurrTempData (){
      const data = await this.getCurrTempData();

      this.divWithTempData.innerHTML = `
      <h1 class = 'mainTemp'> ${data.main.temp} <span>&#8457;</span></h1> 
      <h3 >  ${data.name} </h3>
      <h3> ${data.weather[0].description}</h3>
      <h5> Humidity: ${data.main.humidity}% </h5>
      <h5> Wind: ${data.wind.speed} mph </h5>
      <h5> Feels Like: ${data.main.feels_like}</h5> `;
    }
    async getForecastData (){
     
      const response = await axios.get(this.forecastUrl, {
        params:{
          q: this.input.value,
          units: 'imperial',
          appid: 'fe4fa4212c8255438f8a4734f0df2757',
      
        }
      });
    
      return response.data;
    
    }
    async filterForecastData (){

      const data = await this.getForecastData();
      console.log(data.list)
      let dates = [];
      let forecastData = [];
      for ( let item of data.list){
        const date = new Date (item.dt_txt).getDate();
          if ( dates.includes(date)){
          }
          else{
            dates.push(date);
            forecastData.push(item);
          }
      }
      this.divwithForecastData.innerHTML = '';
      forecastData.shift();
     return forecastData;
    }

    async displayForecastData (){
     
      const forecastData = await this.filterForecastData();

        for ( let item of forecastData)
        {
          const day = this.findDayofWeek(new Date(item.dt_txt).getDay());
          let iconCode = item.weather[0].icon;
          this.divwithForecastData.innerHTML += 
          `
          <div class="day">
          <h3> ${day}</h3>
          <img class = 'icon' src= ${"http://openweathermap.org/img/w/" + iconCode + ".png"} alt="weather img">
          <h2 class = 'high'>${item.main.temp_max}</h2> 
          <h2 class = 'low'>${item.main.temp_min}</h2>
        </div>
          `

        }
    }
    findDayofWeek (date){

      let day;
  switch(date){
    
    case 0: 
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2: 
      day = 'Tuesday';
      break;
  
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
  
    case 6:
      day = 'Saturday';
      break;
  }
  return day;
    }

    
    }

  
  
  
  
