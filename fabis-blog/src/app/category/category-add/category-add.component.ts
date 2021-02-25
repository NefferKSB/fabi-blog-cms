import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Editor } from 'ngx-editor'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit, OnDestroy {
  categoryForm: FormGroup = new FormGroup({});
  isLoadingResults = false;
  editor: Editor;

  constructor(private router: Router, private api: CategoryService, private formBuilder: FormBuilder) {
    this.editor = new Editor();
   }

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
          this.router.navigate(['/category/details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
