import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post/post';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  post: Post = {
    category: '',
    id: '',
    postTitle: '',
    postAuthor: '',
    postDesc: '',
    postContent: '',
    postReference: '',
    postImgUrl: '',
    created: new Date(),
    updated: new Date()
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getPostDetails(this.route.snapshot.params.id);
  }

  getPostDetails(id: any) {
    this.api.getPost(id)
      .subscribe((data: any) => {
        this.post = data;
        console.log(this.post);
        this.isLoadingResults = false;
      });
  }
}
