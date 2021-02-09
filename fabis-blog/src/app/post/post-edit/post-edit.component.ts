import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from './../../category/category';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  id = '';
  updated: Date = new Date();
  isLoadingResults = false;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: PostService,
    private catApi: CategoryService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPost(this.route.snapshot.params.id);
    this.postForm = this.formBuilder.group({
      postTitle : ['', Validators.required],
      postAuthor : ['', Validators.required],
      postDesc : ['', Validators.required],
      postContent : ['', Validators.required],
      postReference : ['', Validators.required],
      postImgUrl : ['', Validators.required]
    });
  }

  getPost(id: any) {
    this.api.getPost(id).subscribe((data: any) => {
      this.id = data.id;
      this.postForm.setValue({
        postTitle: data.postTitle,
        postAuthor: data.postAuthor,
        postDesc: data.postDesc,
        postContent: data.postContent,
        postReference: data.postReference,
        postImgUrl: data.postImgUrl
      });
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

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePost(this.id, this.postForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/post-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  postDetails() {
    this.router.navigate(['/post-details', this.id]);
  }
}
