import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public user: any = null;
  public drawerState: boolean = false;
  public currentTab = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/types':
            this.currentTab = 'Types'
            break;
          case '/profile':
            this.currentTab = 'Profile'
            break;
          case '/documents':
            this.currentTab = 'Documents'
            break;
          default:
            this.currentTab = ''
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  logout() {
    this.authService.logout();
    this.drawerState = false;
  }

}