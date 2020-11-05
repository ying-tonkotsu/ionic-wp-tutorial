import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WordpressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordpressProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WordpressProvider Provider');
  }
  // 記事一覧の取得と記事詳細のメソッドを追加
  // 記事を取得する
  getPosts(){
    return this.http
      .get('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/')
  }

  // 記事IDの受け渡しが必要な為、引数を
  getArticle(id: number){
    return this.http.get<{
            ID: number,
            title: string,
            content: string,
            date: string
          }>('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/' + id)
        }
}
