import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.servise';
import { Observable } from 'rxjs';
import { IPost } from '../shared/IUser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  posts$: Observable<IPost[]>;

  constructor(private postsSerive: PostsService) {}
  ngOnInit(): void {
    this.posts$ = this.postsSerive.getAll();
  }
}
