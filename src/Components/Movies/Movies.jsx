import React, { Component } from 'react';
import Movie from "../Movie/Movie";
import "./Movies.css";
import database from "../../context/firebase"
import {connect} from "react-redux";
import {like} from "../../action/authActions"

class Movies extends Component {
    state = {
    }

    render() {
        // console.log(this.state.finalarr)
        
        return (
            <div className="movies">

                {this.props.movies.map((movieObject) => {
                    return <Movie key={movieObject.id} movie={movieObject} favData={this.props.favData} setFavData={this.props.setFavData} ></Movie>;
                })}
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth,
        isLiked:state.isLiked,
    }
   }
   const mapDispatchToProps=(dispatch)=>{
    return{
    isliked:(state)=>dispatch(like(state))
    }
   }
    
   export default connect(mapStateToProps,mapDispatchToProps) (Movies);



