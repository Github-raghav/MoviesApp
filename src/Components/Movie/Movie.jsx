import React, { Component } from 'react';
import{API_KEY, API_URL, IMAGE_URL} from "../../API/secret"
import "./Movie.css"
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from "axios";
import {connect} from "react-redux";
import {like} from "../../action/authActions"
import firebaseDb from "../../context/firebase"
import storage from "../../context/firebase";
import database from "../../context/firebase"
class Movie extends Component {
    state = { 
        detailedMovieObj:{},
        isLiked:false,
        arr:[]
        
     }

   
   async componentDidMount(){
    let response=await axios.get(`${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`);
    // console.log(response.data);
 let detailedMovieObj=response.data;
 let posterPath= IMAGE_URL +detailedMovieObj.poster_path;
//  console.log(this.props.movie.id);
    this.setState({
        detailedMovieObj:{...detailedMovieObj,poster_path:posterPath}, 
        // triple dot func-means jo obj m pehle se tha vo as it is copy and then uski jonsi key m change krna h h vo krdo coz baad wali mani jati h
    })


    if(this.props.movie?.id && this.state.isLiked==true){
        console.log(this.props.movie.id);
    }
  await database.users.doc(this.props.auth.uid).onSnapshot((snapshot)=>{
    //   let Liked=snapshot.docs.map((doc)=>{
        console.log("hello");
           let FirebaseArr= snapshot.data().liked;
            // console.log("arr"+ " "+arr);
            //       console.log(doc.data());
            //       return doc.data();
            //   })
            this.setState({arr:FirebaseArr })
            // console.log(this.state.arr);
        })
    }

toggleLikeIcon =async()=>{
    
    if(this.state.isLiked==true){
        
        //  this.props.isLiked:false
        this.setState({isLiked:false})
        //  remove from favData array.
        if(this.props.favData.includes(this.props.movie.id)){
            let idx=this.props.favData.indexOf(this.props.movie.id);
            this.props.favData.splice(idx,1);
 }
 let data=this.props.favData;
//  removing from firebase .
let obj={
    email:this.props.auth.email,
    liked:data
}
await database.users.doc(this.props.auth.uid).set(obj);


}else{
    
    this.setState({isLiked:true})
    if(!this.props.favData.includes(this.props.movie.id))
     this.props.favData.push(this.props.movie.id)
     //  adding in firebase
     let data=this.props.favData
     let obj={
        email:this.props.auth.email,
         liked:data
     }
     await  database.users.doc(this.props.auth.uid).set(obj);
 }
}

// async componentDidUpdate(){
//     if(this.props.movie?.id ){
//         this.props.isliked(this.state.isLiked)

//     }
// }


// getSnapshotBeforeUpdate(prevProps,prevState){
//     if(prevProps.favData.length >0)
//     if(prevProps.favData.includes(prevProps.movie.id)){
//         // console.log("true");
//        return this.setState({isLiked:true});
//     }
//     return null;
// }

//  componentDidUpdate(prevProps,prevState){
//     // console.log(prevProps);
//     // console.log(snapshot);
//     // console.log(prevState);
//     //  if(prevProps.favData.length >0)
//     if(prevState.arr.includes(prevProps.movie.id)){
//         console.log("true");
//         this.setState({isLiked:true});
//     }

// }

render() {
        
        let {poster_path,title,vote_average}=this.props.movie;
        let posterPath=IMAGE_URL + poster_path; 
       
        console.log(this.state.arr);
        return ( 
            <div className="movie-item">
                <div className="movie-poster">
           <Link to={{ pathname: "/moviepage", state: this.state.detailedMovieObj }}>
                    <img src={posterPath} alt="" />
                    </Link>
                </div>
                <div className="movie-info">
                    <div className="movie-title">{title}</div>
                    {/* <div className="fav-movie"  onClick={()=>this.props.setFavData(this.props.movie.id)}>
                        {
                            this.props.favData.indexOf(this.props.movie.id)==-1?<FavoriteIcon style={{cursor:"pointer" }}></FavoriteIcon>:<FavoriteIcon style={{cursor:"pointer",color:"red" }}></FavoriteIcon>
                        }

                    </div> */}
                    
                    {!this.state.isLiked ? (<FavoriteIcon style={{cursor:"pointer" }} onClick={()=>this.toggleLikeIcon()}/>):
                    (<FavoriteIcon style={{cursor:"pointer" , color:"red"}} onClick={()=>this.toggleLikeIcon()}
                       />) }

                     {/* {ID?(<FavoriteIcon style={{cursor:"pointer" }} onClick={()=>this.toggleLikeIcon()}/>):
                    (<FavoriteIcon style={{cursor:"pointer" , color:"red"}} onClick={()=>this.toggleLikeIcon()}
                    />) }   */}
                    
                    <div className="movie-rating">{vote_average} IMDB</div>
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
 
export default connect(mapStateToProps,mapDispatchToProps) (Movie);