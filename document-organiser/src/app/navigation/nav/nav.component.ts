import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public login: boolean = true;

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.user){
      this.login = true;
    }
  }

}