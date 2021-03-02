import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category = new Category;
  isLoadingResults = true;
  updatedDate = '';

  constructor(private route: ActivatedRoute, private api: CategoryService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id)
    this.getCategoryDetails(this.route.snapshot.params.id);
  }

  getCategoryDetails(id: any) {
    this.api.getCategory(id)
      .subscribe((data: any) => {
        this.category = data;
        this.category.id = data._id;

        //Set date string
        const date = new Date(this.category.updated);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        this.updatedDate = date.toLocaleDateString('en-US', options);

        console.log(this.updatedDate);
        this.isLoadingResults = false;
      });
  }

  deleteCategory(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCategory(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/category']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
