import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: any;

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(
    private authService: AuthService
  ) {
    authService.user$.subscribe((user)=>{
      this.user = user;
      console.log(user);
    })
  }

  ngOnInit(): void {
  }

}
