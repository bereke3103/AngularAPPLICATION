import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.servise';
import { IPost } from 'src/app/shared/IUser';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  pSub: Subscription;
  deleteSub: Subscription;
  searchStr: string;

  constructor(
    private postService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  remove(id: string): void {
    this.deleteSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
    this.alertService.danger('Пост был удален');
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
