import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("loginForm") loginForm: NgForm;

  user: User = new User();

  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {
  }

  login() {
    this.user.username = this.loginForm.controls['username'].value;
    this.user.password = this.loginForm.controls['password'].value;
    this.authService.login(this.user).subscribe(res => {
      const returnTo = this.aRoute.snapshot.queryParams['returnTo'];
      this.router.navigate([returnTo || "/" ]);
    });
  }

  logout() {
    this.authService.isLoggedIn = false;
    sessionStorage.setItem("loggedInUser", null);
    this.router.navigate(["/login"]);
  }
}
