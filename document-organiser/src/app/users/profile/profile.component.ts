import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: any;

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  role = new FormControl('');

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    authService.user$.subscribe((user) => {
      if (user) {
        console.log(user);
        this.user = user;
        this.name.setValue(user.name)
        this.name.disable();
        this.email.setValue(user.email)
        this.email.disable();
        this.password.setValue('--------')
        this.password.disable();
        this.role.setValue(user.role);
        this.role.disable();
        console.log(user);
      }
    })
  }

  ngOnInit(): void {
  }

  saveChanges(){
    let promise;
    if(this.password.value==='--------'){
      promise = this.userService.patchUser(true, this.user.userId, this.name.value, this.email.value);
    }
    else{
      promise = this.userService.patchUser(true, this.user.userId, this.name.value, this.email.value, this.password.value);
    }
    promise.subscribe((res)=>{
      console.log(res);
    })
  }

  changePW(){
    this.name.disable();
    this.email.disable();
    this.password.setValue('');
    this.password.enable();
  }

  changeName(){
    this.password.disable();
    this.email.disable();
    this.name.enable();
    if(this.password.value===''){
      this.password.setValue('--------')
    }
  }

  changeEmail(){
    this.name.disable();
    this.password.disable();
    this.email.enable();
    if(this.password.value===''){
      this.password.setValue('--------')
    }
  }

  cancelNameEdit(){
    this.name.setValue(this.user.name)
    this.name.disable();
  }

  cancelEmailEdit(){
    this.email.setValue(this.user.email)
    this.email.disable();
  }

  cancelPWEdit(){
    this.password.setValue('--------')
    this.password.disable();
  }

}
