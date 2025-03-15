import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Auth, getAuth } from 'firebase/auth';
import 'firebase/database';
import {Firestore, getFirestore} from 'firebase/firestore'
 
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyBTwbeEdcD6KXiwWuZQ79JxQlGcaZQdels",
    authDomain: "tienda-online-27783.firebaseapp.com",
    databaseURL: "https://tienda-online-27783-default-rtdb.firebaseio.com",
    projectId: "tienda-online-27783",
    storageBucket: "tienda-online-27783.firebasestorage.app",
    messagingSenderId: "991109868759",
    appId: "1:991109868759:web:5ba8361fc3ca74c2b31492"
  };

  public auth: Auth;
  public firebase: Firestore;

  constructor() {
    const app = firebase.initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.firebase = getFirestore(app);
   }
}
