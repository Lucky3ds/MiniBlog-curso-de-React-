import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe_w8tJWs_1cBGX3Zu5SVozswtUSlpHIU",
  authDomain: "miniblog-soft.firebaseapp.com",
  projectId: "miniblog-soft",
  storageBucket: "miniblog-soft.appspot.com",
  messagingSenderId: "1053323172664",
  appId: "1:1053323172664:web:e971d0619f942898c3bfcd"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};