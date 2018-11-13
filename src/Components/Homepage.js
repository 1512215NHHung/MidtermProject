import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from 'redux';
import PropTypes from 'prop-types';
import "../Styles/Homepage.css";
import Search from "./Search";
import { firestoreConnect } from 'react-redux-firebase';
import ListUsers from "./ListUsers";
import Chat from "./Chat";

class Homepage extends Component {

    constructor(props){
        super(props);
        this.state = {
            keyword: ""
        }
    }
    static propTypes = {
        auth: PropTypes.object,
        uid: PropTypes.string,
        firebase: PropTypes.shape({
            login: PropTypes.func.isRequired,    
            logout: PropTypes.func.isRequired,
            uid: PropTypes.string,
            categories: PropTypes.arrayOf(PropTypes.string)
        }),
    }

    componentDidMount(){
        //this.getMessages();
    }

    onLogout(){
        this.props.firebase.logout().then(() => {
            console.log('sign out successful');
            this.props.history.push('/login')
        }).catch(function (error) {
        });
        //this.props.history.replace("/");
        
    }

    onSearch = (params) =>{
        this.setState({
            keyword: params
        })
    }

    render() {
        return (   
            <div className="container clearfix">
                <div className="button">
                    <button 
                        onClick={() => this.onLogout()}>Log Out
                    </button>
                </div>
                <div className="people-list" id="people-list">
                    
                    <Search onSearch={this.onSearch}>
                    </Search>

                    <ListUsers keyword={this.state.keyword}>
                    </ListUsers>
                </div>

                <div className="chat">
                    <Chat>
                    </Chat>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = () => {
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect()
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