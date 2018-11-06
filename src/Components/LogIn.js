import "../Styles/App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../Actions/action";
import PropTypes from "prop-types";

class LogIn extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    console.log("bbbbb");
    console.log(nextProps.auth);
    if (nextProps.auth) {
      console.log("ccc");
      this.context.router.history.push("/app");
    }
  }

  render() {
    return (
      <div className="row social-signin-container">
        <div className="col s10 offset-s1 text-align">
          <h4 id="sign-in-header">Sign In to start</h4>
          <a 
            href="#" className="icon-signin" 
            onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(LogIn);
