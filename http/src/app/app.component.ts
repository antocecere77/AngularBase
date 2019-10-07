import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http
      .post(
        'https://recipe-list-96492.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get('https://recipe-list-96492.firebaseio.com/posts.json')
    .pipe(map(responsedata => {
      const postsArray = [];
      for (const key in responsedata) {
        if (responsedata.hasOwnProperty(key)) {
          postsArray.push({...responsedata[key], id: key});
        }
      }
      return postsArray;
    }))
    .subscribe(
      posts => { console.log(posts);
      }
    );
  }
}
