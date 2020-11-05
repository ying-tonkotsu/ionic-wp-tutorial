import { Component } from '@angular/core';
// HTTP通信ができるような状態にする
import { HttpClient } from '@angular/common/http';
// ローディングを追加
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { stringify } from '@angular/core/src/util';

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    // パラメーターの受け渡し　URL構造の設定
  segment: 'article/:id',
  // defaultHistory：配列で親ページ名を格納する
  defaultHistory:['HomePage']
})
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  // 記事情報を追加
  // １つなので配列ではなくオブジェクトで用意する プロパティ：post,初期値：null とする
  post:{
    ID: number,
    title: string,
    content: string,
    date: string
  } = {
    ID: null,
    title: null,
    content: null,
    date: null
  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();

    const id =  this.navParams.get('id');
    // 返り値の型を事前に指定（APIのレスポンスと一致させる為）
    this.http.get<{
      ID: number,
      title: string,
      content: string,
      date: string
    }>('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/' + id)
      .subscribe(data => {
        this.post = data;
        loading.dismiss();
      });
  }
}

