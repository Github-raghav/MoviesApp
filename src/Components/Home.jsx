import React, { Component } from 'react';
import Header from "./Header/Header";
import Movies from "./Movies/Movies";
import Pagination from "./Pagination/Pagination";
import axios from "axios";
import { API_KEY, API_URL } from "../API/secret";
import Favourite from './Favourite/Favourite';
import MoviePage from './MoviePage/MoviePage';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {connect} from "react-redux";
import {logIn,logOut,SignIn} from "../action/authActions"

class App extends Component {
  state = {
    moviesData: [],
    currentMovie: "avengers",
    pages: [],
    currPage: 1,
    favData:[],
    isLiked:false
  };
     
  



  async componentDidMount() {
    // API call
    // params => api key , page , query
    // https://api.themoviedb.org/3/search/movie?api_key=bdd243ea847239dc0799805e63e189f0&query=avengers&page=1&include_adult=false

    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: this.state.currentMovie },
    });
    // console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      pages: pages,
    });
  }
  async componentDidUpdate(){
    // ({this.state.isLiked=isLiked})
    // console.log(this.props.isLiked);
  }

  setMovies = async (newMovieName) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    this.setState({
      moviesData: moviesData,
      currentMovie: newMovieName,
      pages: pages,
      
    });
  };

  nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage + 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage + 1,
    });
  };

  previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: this.state.currPage - 1,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: this.state.currPage - 1,
    });
  };

  setPage = async (pageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: {
        api_key: API_KEY,
        page: pageCount,
        query: this.state.currentMovie,
      },
    });
    console.log(data);
    let moviesData = data.data.results.slice(0, 10);
    this.setState({
      moviesData: moviesData,
      currPage: pageCount,
    });
  };

  setFavData=(id)=>{
      let newarr=[];
      for(let i=0;i<this.state.favData.length;i++){
           newarr[i]=this.state.favData[i];
      }
      newarr.push(id);
      this.setState({favData:newarr})
  }
  render() {
    // console.log(this.props.user);
    
    return (
    
        <div className="App">
          <Header  movies={this.state.moviesData} setMovies={this.setMovies} favData={this.state.favData}></Header>
                  
              {this.state.moviesData.length ? (
                <React.Fragment>
                  <Movies movies={this.state.moviesData} favData={this.state.favData}  setFavData={this.setFavData}></Movies>
                  <Pagination
                    pages={this.state.pages}
                    currPage={this.state.currPage}
                    nextPage={this.nextPage}
                    previousPage={this.previousPage}
                    setPage={this.setPage}
                    ></Pagination>
                </React.Fragment>
              ) : (
                <h1>Oops No Movies Found !</h1>
                )}
        
        </div>
      
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    loggedIn:state.loggedIn,
    user:state.firebase.auth.email,
    isLiked:state.isLiked
  }
}
const mapDispatchToProps=(dispatch)=>{
 return{
   logIn:()=>dispatch(logIn()),
 }
}
export default connect (mapStateToProps,mapDispatchToProps) (App);