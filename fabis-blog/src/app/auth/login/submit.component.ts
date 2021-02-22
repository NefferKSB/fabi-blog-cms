import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn.emit(false);
  }

  //Function for handling form submission
  onFormSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }

    //Emit isLoggedIn as true so other components are aware
    this.isLoggedIn.emit(true);

    this.authService.login(form)
      .subscribe(res => {
        if(res.token) {
          console.log(res)
          localStorage.setItem('token', res.token); //To do update this so session cookies are used instead
          this.router.navigate(['admin']);
        }
      }, err => {
        console.log(err);
      });
  }
}
