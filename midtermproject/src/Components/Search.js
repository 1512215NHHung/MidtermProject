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
            keyWord: ""
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

    onSubmit = () =>{
        this.props.onSearch(this.state.keyWord);
    }

    render() {
        return(
            <div className="search">
                <input 
                    type="text" 
                    onChange={(evt) => this.setState({ keyWord: evt.target.value })}
                    placeholder="search" />
                <i 
                    className="fa fa-search" 
                    onSubmit={this.onSubmit()}/>
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

