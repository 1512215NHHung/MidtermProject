import "../Styles/Homepage.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from "react-redux";


class Search extends Component {
        
    constructor(props){
        super(props);
        this.state = {
        	category: ""
        }
    }
    static propTypes = {
        auth: PropTypes.object,
        uid: PropTypes.string,
        id: PropTypes.number,
        firestore: PropTypes.shape({
            add: PropTypes.func.isRequired,
            listUsers: PropTypes.arrayOf(PropTypes.string)
        }),
    }

    // onSubmit = (event) =>{
    // 	this.props.firestore.add(
    // 	{ 
    // 		collection: 'listUsers' 
    // 	},
    // 	{
    //     	uid: this.props.uid,
    //     	Username: "Peyton Mckinney",
    //     	avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_10.jpg",
    //     	id: 10,
    //     	status:"online"
    //   	}
    // 	)
    // }

    render() {
        return(
            <div className="search">
                <input 
                	type="text" 
                	onChange={(evt) => this.setState({ category: evt.target.value })}
                	placeholder="search" />
{/*                <i 
                	className="fa fa-search" 
                	onSubmit={this.onSubmit()}/>*/}
                <button onClick={this.onSubmit}> Submit
                </button>
            </div>
        )                
    }
}

const mapStateToProps = state => {
	return {
		uid: state.firebase.auth.uid,
	}
}

const mapDispatchToProps = {}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(),
)(Search)

//export default Search;

