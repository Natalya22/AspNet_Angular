import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  isRegistrationSuccessfull: boolean = false;
  errorMsg: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      userName: '',
      password: '',
      email: '',
      firstName: '',
      lastName: ''
    }
  }

  onSubmit(form: NgForm) {
    this.errorMsg = null;
    this.userService
      .register(form.value)
      .subscribe(
        res => {
          this.resetForm(form);
          this.isRegistrationSuccessfull = true;
        },
        err => {
          this.errorMsg = err.error;
          console.log(err);
        },);
  }

}