import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  //matcher = new MyErrorStateMatcher();
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  //Function for handling form submission
  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    this.authService.login(form)
      .subscribe(res => {
        console.log(res);
        if(res.token) {
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

//Handles form validations
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
