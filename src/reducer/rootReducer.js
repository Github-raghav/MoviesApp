import initialState from "../reducer/initialState.json";
import authReducer from "./authReducer";
import { firebaseReducer,firestoreReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

const appReducer=combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    auth:authReducer
})

const rootReducer =(state=initialState,action)=>{
    if(action.type=='LOGOUT'){
        state=undefined
    }
    return appReducer(state,action)
}
export default rootReducer;