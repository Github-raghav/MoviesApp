import React, { Component } from 'react'
import { Button, Container,TextField, Paper,Typography,CardContent,CardActions,makeStyles, Grid, CardMedia} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import {connect} from "react-redux";
import { logIn,logOut,SignIn } from '../../action/authActions';
import "./Login.css"
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from "prop-types";
import Header from '../Header/Header';

 class Login extends Component {
    state={
    email:"",
    password:""
    }
    static propTypes={
      history:PropTypes.object.isRequired,
      match:PropTypes.object.isRequired
    }

    handleLogin= async(e)=>{
        try{
            await this.props.logIn({email:this.state.email,password:this.state.password});
           
     }catch(err){
         this.setState({email:""})
          this.setState({password:""})
        alert(err.message);
     }
      this.props.history.push("/home");
    }
    
    componentDidUpdate(){

      if(this.props.auth){
        this.props.history.push("/home")
      }
    }


    render() {
       const{history}=this.props;
      
        // console.log("login");
        return (
          <div>

            <Header></Header> 
            <div className="login">
                <div className="container">
                  <div className="head">
                <h1>Login Details</h1>
                  </div>
               
               <div className="login__details">
            {/* Email input */}
              <input placeholder="Email" className="text" size='small'
              type="text" 
              value={this.state.email}
              onChange={(e)=> this.setState({email:e.target.value})} 
              />
            {/* Password input */}
            
              <input placeholder="Password" className="text"
              type="password" size="small"
              value={this.state.password}
              type="Password"
              onChange={(e)=>  this.setState({password:e.target.value})} 
              />
               

               <Button className="button"  variant="contained" 
              onClick={this.handleLogin} 
              >LOGIN</Button>
              
               </div>
               
          {/* </Card> */}

          
              <div className="foot" style={{ textAlign: "center",fontWeight:"Bold",color:"gray" }}>
                  Dont't have an account ? 
                  <Button  >
                  <Link style={{textAlign: "center",fontWeight:"Bold",color:"gray" }} to= "/Signup"> Signup</Link>
                  </Button>
              </div >
        
            </div>
            </div>
              </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      auth:state.firebase.auth.uid,
      loggedIn:state.auth.loggedIn
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    console.log(dispatch);
    return{
      logIn:(userData)=>dispatch(logIn(userData)),
      
    }
  }
  const LoginWithRouter=withRouter(Login);
  export default connect (mapStateToProps,mapDispatchToProps) (LoginWithRouter);