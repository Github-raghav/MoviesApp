import React, { Component } from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import { logOut } from '../../action/authActions';
import { connect } from 'react-redux';
class Header extends Component {
    state = {
        newMovieName: ""
    }

    handleonChange = (e) => {
        let value = e.target.value;
        this.setState({
            newMovieName: value,
        })
    }
    handlekeyPress = (e) => {
        if (e.key == "Enter") {
            this.props.setMovies(this.state.newMovieName);
        }
    };

    handleLogout=()=>{
        console.log(this.props.signOut);
        this.props.signOut();
        
    }

    render() {
        console.log(this.props.loggedIn);
        return (<div className="header">
            <div className="logo">

                <img src="logo.svg" alt="" />
            </div>
            <div className="search-btn">
                <input className="search-movies" value={this.state.newMovieName} type="text" placeholder="Search" onChange={this.handleonChange} onKeyPress={this.handlekeyPress} />
            </div>
          <div className="header-links">
            <div className="header-link">
            <Link to="/home">Home</Link>
            </div>

            {/* <div className="header-link">
                
            <Link to="/fav" favData={this.props.favData}>Favourites</Link>
            </div> */}

            <div className="header-link">
                
            <Link to="/signup" >Sign up</Link>
            </div>

            <div className="header-link">
                {!this.props.user?(

            <Link to="/">Login</Link>
                ):(
                    <div className="header__link">Logged in as {this.props.user}</div>
                )}
            </div>

            <div className="header-link" >
                <Link to="/" onClick={this.handleLogout} >Sign out</Link>
            
                </div>
          </div>
        </div>);
    }
}
const mapStateToProps=(state)=>{
return{
    user:state.firebase.auth.email,
    loggedIn:state.loggedIn
}
}
const mapDispatchToProps=(dispatch)=>{
    return{
        signOut:()=>dispatch(logOut())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);