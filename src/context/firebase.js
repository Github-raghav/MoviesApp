import firebase from 'firebase';
export  const firebaseConfig = {
    apiKey: "AIzaSyBdGhed49dqeYtJmmShEGcyRcUnIuCL4LM",
    authDomain: "moviesapp-8cf78.firebaseapp.com",
    projectId: "moviesapp-8cf78",
    storageBucket: "moviesapp-8cf78.appspot.com",
    messagingSenderId: "176720852094",
    appId: "1:176720852094:web:2cd947863bfab16185142f"
  };

  export  const firebaseApp=firebase.initializeApp(firebaseConfig);
  export let firebaseAuth=firebase.auth();
  
  export   let firebaseDb=firebaseApp.firestore();
  export  let storage =firebase.storage();
 const database={
     users:firebaseDb.collection("users")
   }

   export default database;
  //  export default ={database,firebaseApp,firebaseAuth,firebaseConfig,firebaseDb,storage};