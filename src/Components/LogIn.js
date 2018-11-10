import "../Styles/App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'


class LogIn extends Component {
    // componentDidMount() {
    //     console.log("Line: 11");
    //     console.log(this.props);
    //     this.props.firebase.auth().onAuthStateChanged(user => {
    //         console.log("aaaaa");
    //         if (user) {
    //             this.props.history.replace('/homepage');
    //             console.log("ccccc");
    //         }
    //     });
    // }

    onLogin(){
        this.props.firebase.login({provider: 'google', 
                                   type: 'popup'})
                            .then(()=>{})
                            .catch((err) =>{});
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/homepage');
            }
        });        
    }

    render() {
        console.log(this.props.auth);
        if (!isLoaded(this.props.auth)) {
            return null;
        }
            return(
                <div className="row social-signin-container">
                    <div className="col s10 offset-s1 text-align">
                        <h4 id="sign-in-header">Sign In to start</h4>
                        <a 
                        href="#" className="icon-signin" 
                        onClick={()=>this.onLogin()}>
                        <i className="fa fa-google social-signin-icon" />
                        Sign In With Google
                        </a>
                    </div>
                </div>
            )                
    }
}

//export default withFirebase(LogIn);

const mapStateToProps = state => {
    return { 
        auth: state.firebase.auth 
    }
}

const mapDispatchToProps = () => {
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(LogIn)
