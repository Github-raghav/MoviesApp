import initialState from "./initialState.json";

export default function authReducer(state=initialState.auth,action={}){
  // console.log(action);
    switch(action.type )
    {
        
            case 'LOGIN_SUCCESS':return {
             ...state,
               loggedIn:true,
               user:action.user
             
            }
            case 'LOGIN_FAILED':return{
              ...state,
              
                  loggedIn:false,
                   message:action.error.message
              
            }
            case 'LOGOUT_SUCCESS':return{
              ...state,
                user:null,
                loggedIn:false,
              
            }
            case 'LOGOUT_FAILED':return{
              ...state,
              
                message:action.error.message
              
            }
            case 'SIGN_SUCCESS':return{
              ...state,
              loggedIn:true,
              user:action.user
            }
            console.log(action.user);
            case 'SIGN_FAILED':return{
              ...state,
              
                message:action.error.message,
              
            }
            case 'liked':return{
              ...state,
              
                isLiked:action.payload,
              
            }
          default:return state
    }
}