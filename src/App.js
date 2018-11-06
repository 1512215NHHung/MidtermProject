import React, { Component } from "react";
import LogIn from "./Components/LogIn";
import Homepage from "./Components/Homepage";
import authen from "./Components/authen";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./Actions/action";

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }
  render(){
	return(
		<BrowserRouter>
            <div className="container">
               <Route exact path="/" component={LogIn} />
               <Route path="/app" component={authen(Homepage)} />
            </div>
        </BrowserRouter>)      
  	}
}

export default connect(null, {fetchUser})(App);
