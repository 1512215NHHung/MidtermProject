import "../Styles/Homepage.css";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from "react-redux";

class ListUsers extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            keyword: ""
        }
    }

    static propTypes = {
        auth: PropTypes.object,
        uid: PropTypes.string,
        id: PropTypes.number,
        categories: PropTypes.arrayOf(PropTypes.string),
        listUsers: PropTypes.arrayOf(PropTypes.string),
        firebase: PropTypes.shape({
            login: PropTypes.func.isRequired,    
            logout: PropTypes.func.isRequired
        }),
    }

    render() {

        var {keyword} = this.props;

        //console.log("A: " + keyword);


        // if(keyword){
        //     console.log(this.props.listUsers);
        //     console.log("Here")
        //     listUsers = filter(listUsers,(user)=>{
        //         return user.Username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        //     })
        //     console.log(listUsers);
        // }
        
        var listUsers = this.props.listUsers.map((user, index)=>{
            if(user.Username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
                return(
                    <li className="clearfix" key={index}>
                        <img src={user.avatar} alt="avatar" />
                        <div className="about">
                            <div className="name">{user.Username}</div>
                            <div className={user.status === "online" 
                                                ? "status online"
                                                : "status offline"}>
                                <i className={user.status === "online" 
                                                ? "fa fa-circle online"
                                                : "fa fa-circle offline"} 
                                /> {user.status}
                            </div>
                        </div>
                    </li>
                )
            }
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

    if (!props.uid) return []
    return [
        {
            collection: 'listUsers',
            where: [
                ['uid', '==', props.uid],
            ],
            orderBy: ['id', 'asc']
        },
        {
            collection: 'categories',
            where: [
                ['uid', '==', props.uid],
            ]
        }

    ]
  })
)(ListUsers)


