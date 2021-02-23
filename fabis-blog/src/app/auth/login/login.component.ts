import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @Output() isLoggedin: EventEmitter<any> = new EventEmitter();
  isLoadingResults = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedin.emit(false);
  }

  setLoginStatus() {
    this.isLoggedin.emit(true);
  }

  //Function for handling form submission
  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.authService.login(form)
      .subscribe(res => {
        if(res.token) {
          localStorage.setItem('token', res.token); //To do update this so session cookies are used instead
          this.router.navigate(['admin']);
        }
      }, err => {
        console.log(err);
      });
  }

  //Navigate to the register page
  register() {
    this.router.navigate(['register']);
  }
}
