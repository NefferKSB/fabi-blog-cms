import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //loginForm: FormGroup;
  isLoadingResults = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    // this.loginForm = formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    //   remember_me: [false]
    // });
   }

   ngOnInit() {

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
