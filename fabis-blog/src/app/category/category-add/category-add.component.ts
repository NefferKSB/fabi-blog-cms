import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({});
  isLoadingResults = false;

  constructor(private router: Router, private api: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      catName : ['', Validators.required],
      catDesc : ['', Validators.required],
      catImgUrl : ['', Validators.required],
      catContent : ['', Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCategory(this.categoryForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/category-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
