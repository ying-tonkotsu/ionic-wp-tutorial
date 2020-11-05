import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
// モジュールを作成するためのオブジェクトを読み込む

import { HomePage } from './home';
// ./homeをモジュール化

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule{}