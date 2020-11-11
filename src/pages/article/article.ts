import { Component } from '@angular/core';
// ローディングを追加
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
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
  // プロバイダを追加
  providers: [ WordpressProvider ]
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
    public loadingCtrl: LoadingController,
    public wp: WordpressProvider
    ) {
  }

  ionViewDidLoad() {
    const id =  this.navParams.get('id');

    let loading = this.loadingCtrl.create();
    loading.present();

    // 返り値の型を事前に指定（APIのレスポンスと一致させる為）
    // provideから呼び出し
    this.wp.getArticle(id)
      .subscribe(data => {
        this.post = data;
        loading.dismiss();
      });
  }
  // HTTP通信の処理をProviderに移した
}

