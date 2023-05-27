import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from 'src/app/shared/IUser';
import { PostsService } from 'src/app/shared/posts.servise';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const post: IPost = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    };
    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      this.alertService.success('Пост был создан');
    });
    console.log(post);
  }
}
