import { AuthService } from './auth.service';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) {

  }

  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(switchMap(user => {
  //     if (user) 
  //       return this.userService.get(user.uid)
  //     return of(null);
  //   })).pipe(map(appUser => appUser.isAdmin));

  //   // return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
  // }
  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(
  //     switchMap(({uid}) => {
  //       return this.userService.get(uid);
  //     }),
  //     map(user => {
  //       return user.isAdmin;
  //     })
  //   );
  // }
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin) // Mapping App user observable to a boolean observable
    );
  }

}
