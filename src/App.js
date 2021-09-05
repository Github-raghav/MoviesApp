import React, { Component } from 'react';
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Pagination from "./Components/Pagination/Pagination.jsx";
import axios from "axios";
import { API_KEY, API_URL } from "./API/secret";
import Favourite from './Components/Favourite/Favourite.jsx';
import MoviePage from './Components/MoviePage/MoviePage.jsx';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { logIn, logOut, SignIn } from "./action/authActions"
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp.jsx';
import Home from './Components/Home.jsx';
class App extends Component {

  render() {
    console.log(this.props.user);

    return (
      <Router>
        <div className="App">


          <Switch>
            <Route path="/home" exact
              render={props =>
                this.props.user
                  ? ( <Home currentUser={this.props.user} {...props} />)
                  :( <Redirect
                    to='/'
                  />)
              }></Route>

            <Route path="/fav" exact component={Favourite}/>
            <Route path="/moviepage" exact component={MoviePage}></Route>
            <Route path="/" exact component={Login}></Route>

            <Route path="/signup" exact component={SignUp} />

          </Switch>

        </div>
      </Router>
    );
  }
}



function PrivateRoute({ component: Component, ...rest }) {
  // props ? jo component render hota h route m uske ilawa bahut sari cheeze hoti h like history match etc. 
  // so component ko alag nikala lo coz PrivateRoute m component ni bejte coz agr bejegay toh vo render function dekhte hi ni h
  return (
    <Route {...rest} render={(props) => {
      return (
        // check condition.of auth 

        this.props.user ? (<Component {...props}></Component>) :
          (
            <Redirect to="/login"></Redirect>
          )
      )
    }}>

    </Route>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    user: state.firebase.auth.email,
    isLiked: state.isLiked
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch(logIn()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);