import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import rootReducer from './reducer/rootReducer';
import firebase from 'firebase';
import "firebase/auth";
import { getFirestore } from "redux-firestore"
import {applyMiddleware} from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import {reduxFirestore,createFirestoreInstance} from "redux-firestore"
import { ReactReduxFirebaseProvider ,getFirebase} from "react-redux-firebase";
import { createStore } from "redux";
import thunk from "redux-thunk";
import firebaseConfig from "./context/firebase";
import { FirebaseApp } from "./context/firebase";


// const firebaseConfig = {
//   apiKey: "AIzaSyBdGhed49dqeYtJmmShEGcyRcUnIuCL4LM",
//   authDomain: "moviesapp-8cf78.firebaseapp.com",
//   projectId: "moviesapp-8cf78",
//   storageBucket: "moviesapp-8cf78.appspot.com",
//   messagingSenderId: "176720852094",
//   appId: "1:176720852094:web:2cd947863bfab16185142f"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.firestore();


const reduxstore=createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
  reduxFirestore(firebase))
  );

ReactDOM.render( 
  <Provider store={reduxstore}>
<ReactReduxFirebaseProvider
  firebase={firebase}
  config={firebaseConfig}
  dispatch={reduxstore.dispatch}
  createFirestoreInstance={createFirestoreInstance}>
    <App />
</ReactReduxFirebaseProvider>
  </Provider>,

  document.getElementById('root')
);

