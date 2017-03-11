import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Create the Login properties
  username: String;
  password: String;

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastsManager) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.toastr.success('You are logged in', 'Success');
        this.router.navigate(['dashboard'])
      } else {
        this.toastr.error(data.msg);
        this.router.navigate(['login'])
      }
    });
  }

}
