import "../Styles/App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'


class LogIn extends Component {
    
    static propTypes = {
        router: PropTypes.object,
        auth: PropTypes.object,
        firebase: PropTypes.shape({
            login: PropTypes.func.isRequired,    
            logout: PropTypes.func.isRequired,
        }),
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/homepage');
            }
        });
    }

    onLogin(){
        this.props.firebase.login({provider: 'google', 
                                   type: 'popup'})
                            .then(()=>{})
                            .catch((err) =>{});
        
    }

    render() {
        console.log("A");
        console.log(this.props.auth);
        if (!isLoaded(this.props.auth)) {
            return null;
        }
        return(
            <div className="row social-signin-container">
                <div className="col s10 offset-s1 text-align">
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
        //auth is the props of this component
        //state.firebase.auth: get state of store Reducer
    }
}

const mapDispatchToProps = () => {
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(LogIn)
