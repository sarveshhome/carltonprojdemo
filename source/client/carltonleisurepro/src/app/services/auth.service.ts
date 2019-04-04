import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
// import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtModule } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) {
       //this.isDev = false;  // Change to false before deployment
      }

  registerUser(user) {
    console.log(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3060/user/register', user, {headers: headers})
      // .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    console.log(user);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3060/user/authenticate', user, {headers: headers})
      // .map(res => res.json());
  }

  getProfile() {
    const headersProfile = new Headers();
    this.loadToken();
    headersProfile.append('Authorization', this.authToken);
    headersProfile.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3060/user/profile', {headers: headersProfile})
      // .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
}
}
