import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

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
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');
        return this.http.get<{[key: string]: Post}>(
          'https://recipe-list-96492.firebaseio.com/posts.json',
          {
            headers: new HttpHeaders({'Custom-header': 'Hello'}),
            params: searchParams
            // params: new HttpParams().set('print', 'pretty')
          }
        )
        .pipe(map(responsedata => {
          const postsArray: Post[] = [];
          for (const key in responsedata) {
            if (responsedata.hasOwnProperty(key)) {
              console.log(key);
              postsArray.push({...responsedata[key], id: key});
            }
          }
          return postsArray;
        },
        catchError(errorRes => {
          return throwError(errorRes);
        })
      ));
    }

    deletePosts() {
        return this.http.delete('https://recipe-list-96492.firebaseio.com/posts.json');
    }
}
