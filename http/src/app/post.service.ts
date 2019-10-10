import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {title, content};
        console.log(postData);
        // Send Http request
        this.http
          .post<{name: string}>(
            'https://recipe-list-96492.firebaseio.com/posts.json',
            postData
          )
          .subscribe(responseData => {
            console.log(responseData);
          }, error => {
            this.error.next(error.message);
          });
    }

    fetchPosts() {
        return this.http.get<{[key: string]: Post}>('https://recipe-list-96492.firebaseio.com/posts.json')
        .pipe(map(responsedata => {
          const postsArray: Post[] = [];
          for (const key in responsedata) {
            if (responsedata.hasOwnProperty(key)) {
              console.log(key);
              postsArray.push({...responsedata[key], id: key});
            }
          }
          return postsArray;
        }));
      }

    deletePosts() {
        return this.http.delete('https://recipe-list-96492.firebaseio.com/posts.json');
    }
}
