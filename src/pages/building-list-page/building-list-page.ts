import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BuildingService } from "../../providers/building.service";
import { ModalController } from 'ionic-angular';
import { ModalPage } from './modal-page';
import {Building} from "../../enteties/Building";

/*
  Generated class for the BuildingListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-building-list-page',
  templateUrl: 'building-list-page.html'
})
export class BuildingListPage {

  buildingList: Building[] = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController,  private _service: BuildingService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingListPage');
  }

  ngOnInit(): void {
    this.loadBuildings();
  }

  loadBuildings() {
    this._service.getBuildings().
      subscribe(buildings => this.buildingList = buildings,
      error => this.errorMessage = <any>error);
  }

  itemSelected(building: Building) {
    console.log(building);
    // let modal = this.modalController.create(ModalPage);
    // modal.present();
  }
}
