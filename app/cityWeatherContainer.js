  var React = require('react');
  var AddCityForm = require('./addCityForm');
  var CityWeather = require('./cityWeather');
  var axios = require('axios');

  var CitiesList = React.createClass({  
    getInitialState: function (){   
     return { 
      cities: [] 
    };
  },
  componentWillMount: function(){
    this.getGeoLocation();  

  },

  getGeoLocation: function(){
    var lat;
    var lon;
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(location) {
        lat = Math.round(location.coords.latitude);
        lon = Math.round(location.coords.longitude);    
        this.getWeatherByCoord(lat, lon)
      }.bind(this));
    }

  },

  getWeatherByCoord: function(lat, lon){
    return axios.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat +'&lon=' + lon +'&&APPID=3c2743f72d4f2a6d3ce8916cd1cc060c&units=metric').then(function(info){
      this.setState({ 
        cities: this.state.cities.concat([info.data])
      })
    }.bind(this))
  },

  getWeatherByCity: function(cityName){
    return axios.get('http://api.openweathermap.org/data/2.5/weather?q='+ cityName + '&APPID=3c2743f72d4f2a6d3ce8916cd1cc060c&units=metric').then(function(info){
      return info.data
    })
  },

  handleClick: function (newCity) {  
    this.getWeatherByCity(newCity).then(function(cityObject){
      if(cityObject.main){
        this.setState({ 
          cities: this.state.cities.concat([cityObject])
        })
      }
    }.bind(this));  
  },

  removeCity: function(index){
    var cities = this.state.cities.filter(function(city, i) {
      return index !== i;
    });
    this.setState(
      {cities: cities}
      );
  },

  render: function () {
    return(
      <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 col-lg-offset-3 col-md-offset-2 col-sm-offset-1">
      <AddCityForm onClick={this.handleClick}/>
      {this.state.cities.map(function(item, i) {    
        var boundClick = this.removeCity.bind(this, i);   
        return (
          <CityWeather key={i} name={item.name} temp={item.main.temp} description={item.weather[0].description} wind={item.wind.speed} onClick={boundClick}  />
          );
      }, this)}        
      </div>
      );
  }
});

module.exports = CitiesList;


