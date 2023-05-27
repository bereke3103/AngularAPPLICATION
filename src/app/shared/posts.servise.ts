import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbCreateResponse, IPost } from './IUser';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: IPost): Observable<IPost> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post).pipe(
      map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getAll(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.fbDbUrl}/posts.json`).pipe(
      map((post: { [key: string]: any }) => {
        const postFromDb = Object.keys(post).map((key) => ({
          ...post[key],
          id: key,
          date: new Date(post[key].date),
        }));
        return postFromDb;
      })
    );
  }

  getPostById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment.fbDbUrl}/posts/${id}.json`).pipe(
      map((post: IPost) => {
        const gotPostById = {
          ...post,
          id: id,
          date: new Date(post.date),
        };
        return gotPostById;
      })
    );
  }

  updatePostById(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(
      `${environment.fbDbUrl}/posts/${post.id}.json`,
      post
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
