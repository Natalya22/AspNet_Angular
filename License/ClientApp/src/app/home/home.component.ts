import { UserService } from '../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './homeTest.component.html'
})
export class HomeComponent implements OnInit {
  userDetails: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe(
        res => {
          this.userDetails = res;
        },
        err => {
          console.log(err);
        },
        );
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
