import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  // get appUser$() : Observable<AppUser> {
  //   return this.user$.pipe(switchMap(user => {
  //     if (user) this.userService.get(user.uid);
  //     return of(null);
  //   }));
  // }

  get appUser$(): Observable<AppUser> {
    // uid is the property of the 'user' object is the user represented by firebase as part of authentication and not the user object stored in the database
    // We need to get the firebase 'user' object to read and read the actual application 'user' object from the database
    return this.user$.pipe(
      switchMap(user => {
        if (user)
          return this.userService.get(user.uid);
        else
          return of(null);
      })
    );
  }

}