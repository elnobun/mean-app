import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  // Register all fields validation
  validateRegister(user){
    return !(user.name == undefined || user.username == undefined || user.email == undefined ||
    user.password == undefined);
  }

  // Email validation
  validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
