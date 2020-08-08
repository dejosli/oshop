import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase, ) { 

  }
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
     name: user.displayName,
     email: user.email
   })
 }
}
