var Card = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  componentDidMount: function() {
    var component=this;
    $.get("https://api.github.com/users/" + this.props.login, function(data) {
      component.setState(data);
    });
    
  },
   remove: function() {
        this.props.onRemove(this.props.index);
    },

 
  render: function() {

    return (
        <div className="dialog">
        
        <a href={this.state.html_url} target="_blank">
        <img src={this.state.avatar_url}/> </a>
        <button className="close" onClick= {this.remove}>X</button>
        <h3 name={this.state.name}>{this.state.name}</h3>
        <p>Location:{this.state.location}</p>
        <p>Followers:{this.state.followers}</p>

      </div>
     
    );
  }
});
var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = React.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = ''
  },
  sortBy:function(field){
   /* _.sortBy(cards, 'name');*/
      this.props.sortBy(field);
   /* this.props.onRemove(this.props.index)
    this.props.addCard(loginInput.value);
    loginInput.value = ''
   /* console.log(this.refs.field);*/
   /* this.props.onRemove(this.props.index);*/
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="github login" ref="login" className="searchbox"/>
        <button className="searchbox_button">Add</button>
        <div className="sort-section">
      </div>
        
      </form>
    );
  }
});

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      logins: []
    }
  },
  remove: function(index) {
        var arr = this.state.logins;
        arr.splice(index, 1);
        this.setState({logins: arr});
  },
  addCard: function(loginToAdd) {
    this.setState({
    logins: this.state.logins.concat(loginToAdd)
    })
  },
   sortBy:function(field){
    var cards = this.state.logins.map(function(login,index) {
        
      return (<Card login={login} key={index} index={index}  />)
    });
    console.log(cards.hasOwnProperty(name));

     var sortedLogins = this.state.logins.sort( (a, b) => {
      if (a > b) {
        return 1;
      }
      if (a< b) {
        return -1;
      }
      return 0;
    });
     
    // Your sorting algorithm here
    // it should push the sorted value by field in array called sortedPlayers 
    // Then call setState
        this.setState({logins: sortedLogins});
        
    },
 
  render: function() {
    var that=this;
    
    var cards = that.state.logins.map(function(login,index) {
        
      return (<Card login={login} key={index} index={index}  onRemove={that.remove}/>)
    });
    return (
      <div>
        <Form addCard={that.addCard} sortBy={that.sortBy}/>
        {cards}
      </div>
    );
  }
});
/*var Sort = React.createClass({
  render() {
    return (
      <div className="sort-section">
        <h1>Sort<br></br>by</h1>
        <div className="pill" onClick={this.sortRoster.bind(this,'Age')} >Age</div>
        <div className="pill" onClick={this.sortRoster.bind(this,'Meters')} >Height</div>
        <div className="pill" onClick={this.sortRoster.bind(this,'Name')} >Name</div>
        <div className="pill" onClick={this.sortRoster.bind(this,'position')} >Position</div>
        <div className="pill" onClick={this.sortRoster.bind(this,'number')} >Number</div>
        <div className="pill" onClick={this.sortRoster.bind(this,'Club')} >Club</div>
      </div>
    )
  }
});*/

React.render(<HelloWorld />, document.getElementById("react-container"));