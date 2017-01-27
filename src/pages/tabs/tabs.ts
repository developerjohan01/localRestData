import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {BuildingListPage} from "../building-list-page/building-list-page";
import {JokeListPage} from "../joke-list-page/joke-list-page";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab4Root: any = BuildingListPage;
  tab5Root: any = JokeListPage;

  constructor() {

  }
}
