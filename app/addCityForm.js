var React = require('react');

var Button = React.createClass({
  getInitialState: function () {
  return {
    userInput: ''
  };
},

  handleUserInput: function(e){
    this.setState({
      userInput: e.target.value
    })
  },

  handleClick: function(){
  	this.props.onClick(this.state.userInput)
  },

  render: function () {
    return (
      <div className="input-group">
      <input type="text"
      		 onChange={this.handleUserInput}
          	 value={this.state.userInput}
          	 className="form-control"
          	 placeholder="City name goes here"/ >
          	 <span className="input-group-btn">
      <button onClick={this.handleClick} className="btn btn-default">
        Add city
      </button>
      </span>
      </div>
    );
  }
});

module.exports = Button;