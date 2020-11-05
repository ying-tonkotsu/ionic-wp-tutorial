import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

// プロバイダーとつなげる
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // プロバイダーを追加
  providers: [ WordpressProvider ]
})
export class HomePage {
  // 返り値を格納するためのプロパティPostsの型定義
  // [] = 初期値
  posts:{
    ID: number,
    title: string,
    content: string,
    date: string
  }[] = [];

  constructor (
    public NavCtrl: NavController,
    public wp: WordpressProvider,
    //記事を読み込んでいる間ローディング画面を表示する
    public loadingCtrl: LoadingController
  ){}
  // ionViewDidLoad(ライフサイクルイベント)を使ってこのページの表示と同時にWPにHTTP通信して記事を取得させる
  ionViewDidLoad(){
    // ionViewDidLoadm開始直後にローディング中。。。画面を表示
    let loading = this.loadingCtrl.create();
    loading.present();
    // provideから呼び出す
    this.wp.getPosts()
      // subscribe:非同期処理を行う
      // 取得したデータをここで利用
      .subscribe(data => {
        this.posts = data['posts'];
        // data['posts']をpostsに代入
        // ローディング画面終了
        loading.dismiss();
      });
  }
}
