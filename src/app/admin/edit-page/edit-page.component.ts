import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { IPost } from 'src/app/shared/IUser';
import { PostsService } from 'src/app/shared/posts.servise';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: IPost;
  submitted: boolean = false;
  updatedSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getPostById(params['id']);
        })
      )
      .subscribe((post: IPost) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });
      });
  }

  sumbit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const updatedPostById: IPost = {
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title,
    };
    this.updatedSubscription = this.postsService
      .updatePostById(updatedPostById)
      .subscribe(() => {
        this.submitted = false;
        this.alertService.warning('Пост был изменен');
      });
  }
  ngOnDestroy(): void {
    if (this.updatedSubscription) {
      this.updatedSubscription.unsubscribe();
    }
  }
}
