import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Joke} from "../../enteties/Joke";
import {JokeService} from "../../providers/joke.service";

/*
  Generated class for the JokeListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-joke-list-page',
  templateUrl: 'joke-list-page.html'
})
export class JokeListPage {

  jokes: Joke[] = [];
  errorMessage: string;
  private clickedJoke: Joke;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _service: JokeService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad JokeListPage');
  }

  ngOnInit(): void {
    this.loadJokes();
  }

  itemSelected(joke: Joke) {
    console.log("Joke: " + joke.id + " : " + joke.joke);
    this._service.getJoke(joke.id.toString())
      .then(jokeData => {
      console.log("jokeData.joke: " + jokeData.joke);
      this.clickedJoke = jokeData
    })
  }

  private loadJokes() {
    this._service.getJokesRandom(5).
      subscribe(jokes => this.jokes = jokes,
      error => this.errorMessage = <any> error);
  }
}
