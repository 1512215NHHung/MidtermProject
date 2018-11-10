import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import { firebaseConnect,withFirebase } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

class Homepage extends Component {
    // static propTypes = {
    //     router: PropTypes.object,
    //     auth: PropTypes.object,
    //     firebase: PropTypes.shape({
    //         login: PropTypes.func.isRequired,    
    //         logout: mapStateToPropsropTypes.func.isRequired,
    //     }),
    // }

    componentDidMount() {
        //Authenticate user
        const uid = this.props.auth.uid
        this.props.firebase.auth().onAuthStateChanged((user) => {
            //this.props.history.push('/login');
        });
    }

    onLogout(){
        const uid = this.props.auth.uid
        this.props.firebase.logout().then(() => {
            console.log('sign out successful');
            this.props.history.push('/login')
        }).catch(function (error) {
        });
        //this.props.history.replace("/");
        
    }

    render() {
        return (
            <div>
                <div>
                    Hello
                </div>
                <button onClick={() => this.onLogout()}>Log Out
                </button>
            </div>
        )
    }
}

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
)(Homepage)



// export default compose(
//     firebaseConnect((props) => [
//         { path: 'users' } // string equivalent 'todos'
//     ]),
//     connect((state, props) => ({
//         users: state.firebase.data.users,
//         profile: state.firebase.profile,
//         auth: state.firebase.auth
//     }))
// )(withRouter(Homepage));