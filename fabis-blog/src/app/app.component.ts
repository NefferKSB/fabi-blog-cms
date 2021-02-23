import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './category/category';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  categories: Category[] = [];
  private authStatusSub: Subscription = new Subscription;
  isLoggedIn = localStorage.getItem('isLoggedIn');

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        if(authStatus) {
          localStorage.setItem('isLoggedIn', 'true');
          this.isLoggedIn = 'true';
        }
      }
    );
  }

  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.isLoggedIn = 'false';
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
