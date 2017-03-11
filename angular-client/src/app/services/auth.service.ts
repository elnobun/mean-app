import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

  // Declare some properties for the service
  authToken: any;
  user: any;


  constructor(private http: Http) {
  }

  // Declare a function to register the User
  registerUser(user) {

    // This is where we will reach to our express-server API and make the request to register a user.
    // Add the Content-Type of JSON
    // return an observable with respose. Note that it is a post request
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getUserInfo(){
    let headers = new Headers();
    this.authToken;
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    this.authToken = localStorage.getItem('id_token');
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
