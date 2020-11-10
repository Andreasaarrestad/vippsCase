import React,{Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      apiResponse: "",
      inputValue: "",
      isLoading:false
    };
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI() {
    this.setState({isLoading:true});
    
    fetch("http://localhost:8000/topicAPI/"+this.state.inputValue)
    .then(res => res.text())
    .then(res => this.setState({
      apiResponse: res,
      isLoading:false
    }));
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    const isLoading = this.state.isLoading;
    let output;
    if (isLoading) {
      output = <div class="loader"></div>
    } else {
      output = <span>{this.state.apiResponse}</span>;
    }

    return ( 
      <div className="App">
        <div className="wrapper">
          <div className="leftBox">
            <h1>Wikipedia topic occurence counter</h1>
            <hr style={{width:"20%"}}/>
            <input id="inputForm" onChange={evt => this.updateInputValue(evt)} type="text" placeholder="Insert a topic here"/>
            <button id="submitButton" onClick={this.callAPI}>Retreive</button>
          </div>
          
          <div className="rightBox">
            <p id="output">{output}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;