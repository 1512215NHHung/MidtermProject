import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../Actions/action";
import PropTypes from "prop-types";

class Homepage extends Component {
  render() {
    return (
    	<div>
    		<div>
    			Hello
    		</div>
    		<button onClick={this.props.signOut}>Log Out
    		</button>
    	</div>
    )
  }
}

export default connect(null, { signOut })(Homepage);