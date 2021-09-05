import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { SignIn } from '../action/authActions';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from './Header/Header';
 class SignUp extends Component {
    state={
        email:"",
        password:""
        }
        static propTypes={
          history:PropTypes.object.isRequired,
          match:PropTypes.object.isRequired
        }
    

        handleLogin= ()=>{
            try{    
               this.props.signIn({email:this.state.email,password:this.state.password});
              
         }catch(err){
             this.setState({email:""})
              this.setState({password:""})
            alert(err.message);
         }
         this.props.history.push("/home")
        }
        
    render() {
      const{history}=this.props;
        return (<div>
          <Header/>
        
            <div className="login">
            <div className="container">
              <div className="head">
            <h1>Signup Details</h1>
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

        </div>
        </div>
        </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
      auth:state.user,
    loggedIn:state.loggedIn
    }
  }
  const mapDispatchToProps=(dispatch)=>{
   return{
     signIn:(userData)=>dispatch(SignIn(userData)),
   }
  }
  const SignUpWithRouter=withRouter(SignUp);
  export default connect (mapStateToProps,mapDispatchToProps) (SignUpWithRouter);