import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //loginForm: FormGroup;
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

  //Function for handling form submission
  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.authService.login(form)
      .subscribe(res => {
        if(res.token) {
          console.log(res)
          localStorage.setItem('token', res.token);
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
