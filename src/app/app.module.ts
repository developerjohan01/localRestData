import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {BuildingListPage} from "../pages/building-list-page/building-list-page";
import {BuildingService} from "../providers/building.service";
import {JokeService} from "../providers/joke.service";
import {JokeListPage} from "../pages/joke-list-page/joke-list-page";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BuildingListPage,
    JokeListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    BuildingListPage,
    JokeListPage
  ],
  providers: [
    BuildingService,
    JokeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage]
})
export class AppModule {}
