import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navToggle: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastsManager) {
  }

  ngOnInit() {
  }

  authNav(){
    if (this.authService.loggedIn()){
      return this.navToggle = true;
    }
  }

  onLogout() {
    this.authService.logout();
    this.toastr.success('You are logged out', 'Success');
    this.router.navigate(['/login']);
    return false;
  }

}
