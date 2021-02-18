import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './category/category';
import { HomeService } from './services/home.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories: Category[] = [];
  loginStatus = false;

  constructor(private api: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.authService.isLoggedIn)
    if(this.authService.isLoggedIn)
      this.loginStatus = true;
  }

  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
    localStorage.removeItem('token');
  }
}
