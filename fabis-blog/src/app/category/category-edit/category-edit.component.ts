import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  public Editor = ClassicEditor;
  categoryForm: FormGroup = new FormGroup({});
  updated: Date = new Date();
  isLoadingResults = false;
  id = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCategory(this.route.snapshot.params.id);
    this.categoryForm = this.formBuilder.group({
      catName : ['', Validators.required],
      catDesc : ['', Validators.required],
      catImgUrl : ['', Validators.required],
      catContent : ['', Validators.required]
    });
  }

  getCategory(id: any) {
    this.api.getCategory(id).subscribe((data: any) => {
      this.id = data.id;
      this.categoryForm.setValue({
        prod_name: data.prod_name,
        prod_desc: data.prod_desc,
        prod_price: data.prod_price
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCategory(this.id, this.categoryForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/category-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  categoryDetails() {
    this.router.navigate(['/category-details', this.id]);
  }
}
