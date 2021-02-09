import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Category } from './../../category/category';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  isLoadingResults = false;
  categories: Category[] = [];


  constructor(
    private router: Router,
    private api: PostService,
    private catApi: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.postForm = this.formBuilder.group({
      category : ['', Validators.required],
      postTitle : ['', Validators.required],
      postAuthor : ['', Validators.required],
      postDesc : ['', Validators.required],
      postContent : ['', Validators.required],
      postReference : ['', Validators.required],
      postImgUrl : ['', Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addPost(this.postForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/post/details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getCategories() {
    this.catApi.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
