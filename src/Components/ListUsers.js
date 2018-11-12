import "../Styles/Homepage.css";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from "react-redux";

class ListUsers extends Component {
    
    static propTypes = {
        auth: PropTypes.object,
        uid: PropTypes.string,
        id: PropTypes.number,
        firebase: PropTypes.shape({
            login: PropTypes.func.isRequired,    
            logout: PropTypes.func.isRequired,
            categories: PropTypes.arrayOf(PropTypes.string),
            listUsers: PropTypes.arrayOf(PropTypes.string)
        }),
    }


    // getDatabase = () =>{
    //     console.log("2");
    //     console.log(this.props);
    //     console.log(this.props.categories);
    //     //return this.props.categories;
    // }


    render() {
        console.log(this.props.uid);
        console.log(this.props.listUsers);
        var listUsers = this.props.listUsers.map((user, index)=>{
            return(
                <li className="clearfix" key={index}>
                    <img src={user.avatar} alt="avatar" />
                    <div className="about">
                        <div className="name">{user.Username}</div>
                        <div className="status">
                            <i className="fa fa-circle online" /> {user.status}
                        </div>
                    </div>
                </li>
            )
        });
        return(
            <div>
                <ul className="list">
                    {listUsers}
                </ul>
            </div>
        )                
    }
}

const mapStateToProps = state => {

    return { 
        auth: state.firebase.auth,
        uid: state.firebase.auth.uid,
        listUsers: state.firestore.ordered.listUsers 
            ? state.firestore.ordered.listUsers 
            : [],       
        categories: state.firestore.ordered.categories 
            ? state.firestore.ordered.categories.map(c => c.name) 
            : []       
    }
}

const mapDispatchToProps = () => {
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    console.log(props);
    if (!props.uid) return []
    return [
        {
            collection: 'listUsers',
            where: [
                ['uid', '==', props.uid],
            ]
        }
    ]
  })
)(ListUsers)


