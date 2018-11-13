import React, { Component } from "react";
import LogIn from "./Components/LogIn";
import Homepage from "./Components/Homepage";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  // componentWillMount() {
  //   this.props.fetchUser();
  // }
    render(){
    	return(
    		<BrowserRouter>
                <div className="container">
                   <Route exact path="/" component={LogIn} />
                   <Route path="/login" component={LogIn} />
                   <Route path="/homepage" component={Homepage} />
                </div>
            </BrowserRouter>
        )      
    }
}

export default App;
