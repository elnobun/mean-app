import {Component, OnInit} from '@angular/core';
import {ValidationService} from "../../services/validation.service";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasWarning: boolean = false;

  // Create a property for each field of the user
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidationService,
              private toastr: ToastsManager,
              private authService: AuthService,
              private router: Router
              ) {}

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Validate all Field
    if (!this.validateService.validateRegister(user)) {
      this.toastr.warning('Please fill in all fields.', 'Fields Alert!');
      return false;
    }

    // Validate Email Field
    if (!this.validateService.validateEmail(user.email)) {
      this.toastr.warning('Please use a valid email.', 'Email Alert');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data =>{
      if (data.success){
        this.toastr.success('Registered Successfully. Please login', null, {toastLife: 5000});
        this.router.navigate(['/login'])
      } else {
        this.toastr.error('Something went wrong', 'Failed registeration');
        this.router.navigate(['/register'])
      }
    });
  }
}
