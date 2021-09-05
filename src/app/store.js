import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/authReducer"
import {reduxFirestore,getFirestore,createFirestoreInstance} from "redux-firestore"
import { ReactReduxFirebaseProvider,getFirebase } from "react-redux-firebase";
import { FirebaseApp } from "../context/firebase";

const reduxstore=createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    reduxFirestore(FirebaseApp))
    );

// export const store=configureStore({
//     reducer:{
//         reducer,
//     }
// })