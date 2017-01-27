import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {Joke} from "../enteties/Joke";
import {Storage} from "@ionic/storage";

/*
  Generated class for the Joke provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JokeService {

  private _restUrl: string = 'https://api.icndb.com/jokes';

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello Joke Provider');
  }

  getJokesRandom(numberOfJokes) {

    var fullUrl = `${this._restUrl}/random/${numberOfJokes}`;
    console.log("getJokesRandom() " + fullUrl);
    return this.http
      .get(`${this._restUrl}/random/${numberOfJokes}`, {headers: this.getHeaders()})
      .map((response: Response) => <Joke[]> response.json().value)
      .do(data => console.log('All: ' +  JSON.stringify(data))) // This writes all data to the console
      .catch(this.handleError);
  }

  getJokeRandom() {
    let joke = this.http
      .get(`${this._restUrl}/random`, {headers: this.getHeaders()})
      .map((response: Response) => <Joke> response.json().value);
    return joke;
  }

  getJoke(id: string) {
    return this.storage.get(id).then((data) => {
      console.log("From storage: " + data);
      if (!data) {
        return this.getJokeRest(id);
      } else {
        return data;
      }
    });
  }

  private getJokeRest(id: string) {
    var fullUrl = `${this._restUrl}/${id}`;
    console.log(`getJokeRest(${id}) ` + fullUrl);
    let joke = this.http
      .get(`${this._restUrl}/${id}`, {headers: this.getHeaders()})
      .map((response: Response) => <Joke> response.json().value)
      .do(data => {
        this.storage.set(id,data);
        console.log(`storage set (${id}, ${data}) `);
      });

    return joke.toPromise();
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
