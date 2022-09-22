import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  isLoginError : boolean = false;

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/license');
    }
  }

  onSubmit(userName, password){
    this.formModel.UserName = userName;
    this.formModel.Password = password;
    this.userService
      .login(this.formModel)
      .subscribe(
        (data : any) => {
          localStorage.setItem('token',data.token);
          this.router.navigateByUrl('/license');
        },
        (err : HttpErrorResponse)=>{
          this.isLoginError = true;
        });
  }
}