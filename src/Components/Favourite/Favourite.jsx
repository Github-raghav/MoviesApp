import React, { Component } from 'react';
import{API_KEY, API_URL, IMAGE_URL} from "../../API/secret"
import axios from "axios";
import Header from '../Header/Header';
import database from "../../context/firebase";
import {connect} from "react-redux";
import {like} from "../../action/authActions"

class Favourite extends Component {
    state = {
    favMovDetails:[],
     }

    //  async componentDidMount(){
    //      let arr=[];
    //      console.log("fav"+this.props.favData);
    //      let allFavMovie=this.props;
    //     //  console.log(allFavMovie);
    //     for(let i=0;i<allFavMovie;i++){
    //         let response=await axios.get(`https://api.themoviedb.org/3/movie/${allFavMovie[i]}?api_key=${API_KEY}&language=en-US`);
    //         arr.push(response.data);
    //         this.setState({
    //             favMovDetails:arr
    //         })
    //     }
    //     // console.log(response.data);
    // //  let posterPath= IMAGE_URL +favMovDetails.poster_path;
    // //  console.log(this.props.movie.id);
    //     this.setState({
    //         // favMOvDetails:{...favMOvDetails,poster_path:posterPath}, 
    //         // triple dot func-means jo obj m pehle se tha vo as it is copy and then uski jonsi key m change krna h h vo krdo coz baad wali mani jati h
    //     })
    //     }
    async componentDidMount (){
        let Firebasearr=[];
        console.log(this.props.auth.uid);
        await database.users.doc(this.props.auth.uid).onSnapshot((snapshot)=>{
            
            Firebasearr=snapshot.data().liked ;
                // console.log(Firebasearr);
            })
        //  fetching data
        let arr=[];
        let allFavMovie=Firebasearr;
        for(let i=0;i<allFavMovie;i++){
            let response=await axios.get(`https://api.themoviedb.org/3/movie/${allFavMovie[i]}?api_key=${API_KEY}&language=en-US`);
            arr.push(response.data);
            this.setState({
                favMovDetails:arr
            })
        }
             let posterPath= IMAGE_URL +this.state.favMovDetails.poster_path;
    //      console.log(this.props.movie.id);
        this.setState({
           favMovDetails:{...this.state.favMovDetails,poster_path:posterPath}, 
            // triple dot func-means jo obj m pehle se tha vo as it is copy and then uski jonsi key m change krna h h vo krdo coz baad wali mani jati h
        })

        }
        
        render() { 
        console.log("in favourite");
        return (
            <div>
          <Header/>
            <div className="favContent">
            <h1>hello</h1>
              {/* {this.state.favMovDetails.map((movieObj)=>{
                  let{poster_path,title,vote_average}=movieObj;
                  return (<div className="fav-movie-item">
                      <div className="fav-movie-poster">
                        <img src={IMAGE_URL+poster_path} alt=""/>
                      </div>
                      <div className="fav-movie-info">
                          <div className="fav-movie-title">{title}</div>
                          <div className="fav-movie-rating">{vote_average} IMDB</div>
                      </div>
                  </div>)
              })} */}
        </div> 
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
    
   export default connect(mapStateToProps,mapDispatchToProps)(Favourite);