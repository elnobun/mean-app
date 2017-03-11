import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs";
import {Router, NavigationEnd} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;
  title = 'application works!';

  constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

  }

  ngOnDestroy() {
    return this.routerSubscription.unsubscribe();
  }
}


