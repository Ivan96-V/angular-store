import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from 'firebase/auth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string | null = null;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  login(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then(() => { // se usa then porque es una promesa, esto empieza a correr desde que el usuario intenta hacer login
      auth.currentUser?.getIdToken()
      .then((token) => {
        this.token = token;
        this.router.navigate(['/']);
      })
    })
    .catch((error: any) => {
      console.error('Error al iniciar sesion', error)
    })
  }

  getIdToken(){
    return this.token;
  }

  // Verificar si el usuario esta autenticado
  isAuthenticated(){
    return this.token != null;
  }

  logout(){
    const auth = this.firebaseService.auth;
    auth.signOut().then(() => {
      this.token = null;
      this.router.navigate(['login'])
    })
    .catch((error) => {
      console.error('Error logout: ', error)
    })
  }



}



