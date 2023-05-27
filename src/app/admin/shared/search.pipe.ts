import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from 'src/app/shared/IUser';

@Pipe({
  name: 'searchPosts',
})
export class SearchPipe implements PipeTransform {
  transform(posts: IPost[], search = ''): IPost[] {
    if (!search.trim()) {
      return posts;
    }

    const filteredPosts: IPost[] = posts.filter((post) => {
      const searchPostByTitle: boolean = post.title
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      return searchPostByTitle;
    });

    return filteredPosts;
  }
}
