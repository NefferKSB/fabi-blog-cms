import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor'
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../category';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  editor: Editor;
  catForm: Category = new Category;
  catName = new FormControl('');
  catDesc = new FormControl('');
  catImgUrl = new FormControl('');
  catContent = new FormControl('');
  updated: Date = new Date();
  isLoadingResults = false;
  id = '';


  constructor(private router: Router, private route: ActivatedRoute, private api: CategoryService) {
    this.editor = new Editor();
   }

  ngOnInit(): void {
    this.getCategory(this.route.snapshot.params.id);
  }

  getCategory(id: any) {
    this.api.getCategory(id).subscribe((data: any) => {
      this.id = data._id;
      this.catName.setValue(data.catName);
      this.catDesc.setValue(data.catDesc);
      this.catImgUrl.setValue(data.catImgUrl);
      this.catContent.setValue(data.catContent);
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.catForm = {
      id: undefined,
      catName: this.catName.value,
      catDesc: this.catDesc.value,
      catImgUrl: this.catImgUrl.value,
      catContent: this.catContent.value,
      updated: this.updated
    };
    this.api.updateCategory(this.id, this.catForm)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/category/details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  categoryDetails() {
    this.router.navigate(['/category/details', this.id]);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
