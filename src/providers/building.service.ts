import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Building} from "../enteties/Building";
import {Observable} from "rxjs";

/*
  Generated class for the Building provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BuildingService {

  private _restUrl = 'http://localhost:8080/building-all';

  constructor(public http: Http) {
    console.log('Hello Building Provider');
  }

  getBuildings(): Observable<Building[]> {
    console.log("using getBuildings");
    return this.http.get(this._restUrl)
      .map((response: Response) => <Building[]> response.json())
      //.do(data => console.log('All: ' +  JSON.stringify(data))) // This writes all data to the console
      .catch(this.handleError);
  }

  getBuilding(id: number): Observable<Building> {
    console.log("using geBuilding");
    return this.getBuildings()
      .map((building: Building[]) => building.find(b => b.id == id));
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
