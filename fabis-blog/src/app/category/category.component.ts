import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CategoryService } from '../services/category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['catName', 'catDesc'];
  data: Category[] = [];
  isLoadingResults = true;
  loginStatus = false;

  constructor(private api: CategoryService, private authService: AuthService) {
    this.authService.isLoggedIn.subscribe((status: any) => {

      console.log(status)
      if (status === true) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    });
   }

  ngOnInit() {
    this.api.getCategories()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
