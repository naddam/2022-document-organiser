import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public registrationMode: boolean = false;
  public loginError: boolean = false;


  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  email2 = new FormControl('');
  password2 = new FormControl('');


  ngOnInit(): void {
  }

  tryLogin() {
    this.loginError = false;
    this.authService.login(this.email2.value, this.password2.value).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/']);
      }
      if (!res.success) {
        this.loginError = true;
      }
    })
  }

  register() {
    this.loginError = false;
    this.authService.register(this.name.value, this.email.value, this.password.value).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/']);
      }
      if (!res.success) {
        this.loginError = true;
      }
    })

  }

  switchMode() {
    this.registrationMode = !this.registrationMode;
    this.loginError = false;
  }

}
