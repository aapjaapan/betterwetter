var React = require('react');

  
var CityWeather = React.createClass({
  render: function (){
    return (
      <div className="row" >
        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{fontSize:70, textAlign:'center'}}>
          {this.props.temp}°
        </div>
        <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5" style={{marginTop:15}}>        
          <div  style={{fontSize:24}}>{this.props.name}</div>
          <div>{this.props.description}</div>
          <div>wind is {this.props.speed > 2  ? 'strong' : 'weak' } </div>
        </div>        
         <div className="col-sm-1" onClick={this.props.onClick} style={{marginTop:15, cursor:'pointer', color:'#fff'}}>x</div>

      </div>
    )
  }

});

module.exports = CityWeather;


