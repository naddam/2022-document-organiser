import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string ="";
  id: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  tryLogin(email: string, password: string){
    this.authService.login(email, password).subscribe((res) => {
      if(res.success){
        this.username = res.data.name;
        this.id = res.data.userId;
      }
    })
  }

}
