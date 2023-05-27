import { Component, Input } from '@angular/core';
import { IPost } from '../../IUser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: IPost;
}
