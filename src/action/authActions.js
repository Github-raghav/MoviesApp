
export const logIn=({email,password})=>{
    return async(dispatch,getstate,{getFirebase})=>{
        dispatch({type:'LOGIN'})
        const firebase=getFirebase();

        try{
        // console.log(userData);
       let data=await firebase.auth().signInWithEmailAndPassword(email,password)
       dispatch({type:'LOGIN_SUCCESS',payload:{email,password}})
       console.log(data.user.uid);
        }catch(err){
            dispatch({type:'LOGIN_FAILED',error:err})
            alert(err);
        }
    }
       

}

export const logOut=()=>{
    return (dispatch,getstate,{getFirebase})=>{
        dispatch({type:'LOGOUT'})
     const firebase=getFirebase();
     firebase.auth().signOut().then(()=>{
         dispatch({type:'LOGOUT_SUCCESS'})
     }).catch((err)=>{
         dispatch({type:'LOGOUT_FAILED',error:err})
     })
    }
}

export const SignIn=(userData)=>{
    console.log("insideauthaction");
    console.log(userData);
    return(dispatch,getstate,{getFirebase,getFirestore})=>{
        dispatch({type:'SIGNIN_REQUEST'})
    const firebase=getFirebase();
    const firestore=getFirestore();
    console.log("beforeFirebaseauth");
    firebase.auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password
    ).then(async(data)=>{
        const response=await firestore.collection("users").doc(data.user.uid).set({
            email:userData.email,
            
        });
        dispatch({type:'SIGN_SUCCESS',payload:userData.email})
    }).catch((error)=>{
        dispatch({type:'SIGN_FAILED',error:error})
          alert(error);
        
    }
    )
    }
}

export const like=(state)=>{
return(dispatch,getstate)=>{
    dispatch({type:'liked',payload:state})
 
}
}