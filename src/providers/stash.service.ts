import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite } from 'ionic-native';
import {Joke} from "../enteties/Joke";

const DB_NAME: string = '__ionicstorage';
const win: any = window;

@Injectable()
export class Stash {
  private _database: any;

  constructor() {

    console.log('Hello Stash Provider');

    if (win.sqlitePlugin) {
      this.setUpDb();
    } else {
      this.setUpFallBackDb();
    }
  }

  private setUpFallBackDb() {
    console.warn('Stash: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
    this._database = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
    this._tryInit();
  }

  // Initialize DB
  _tryInit() {
    console.log('Trying to init the Stash');
    this.query('CREATE TABLE IF NOT EXISTS jokes(joke_id INTEGER PRIMARY KEY,joke_text TEXT)')
      .then(succ => {
        console.log('Stash: CREATEed tables: ', succ);
      })
      .catch(err => {
        console.error('Stash: Unable to CREATE initial stash tables: ', err.tx, err.err);
    });
  }

  setUpDb() {
    this._database = new SQLite();

    this._database.openDatabase({
      name: DB_NAME,
      location: 'default' // the location field is required
    }).then(() => {
      console.log('Stash: database opened')
      this._tryInit();
    }, (err) => {
      console.error('Stash: Unable to open database: ', err);
    });

  }

  /**
   * Perform an arbitrary SQL operation on the database. Use this method
   * to have full control over the underlying database through SQL operations
   * like SELECT, INSERT, and UPDATE.
   *
   * @param {string} query the query to run
   * @param {array} params the additional params to use for query placeholders
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._database.transaction((tx: any) => {
            console.log('Stash: in transaction query: '  + query + ' with params: ' + params);
            tx.executeSql(query, params,
              (tx: any, res: any) => resolve({ tx: tx, res: res }),
              (tx: any, err: any) => reject({ tx: tx, err: err }));
          },
          (err: any) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }

  /**
   * Get the value in the database identified by the given key.
   * @param {string} key the key
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  get(key: string): Promise<any> {
    return this.query('select joke_id, joke_text from jokes where joke_id = ? limit 1', [key]).then(data => {
      if (data.res.rows.length > 0) {
        let theJoke = new Joke(data.res.rows.item(0).joke_id, data.res.rows.item(0).joke_text);
        return theJoke;
      }
    });
  }

  /**
   * Set the value in the database for the given key. Existing values will be overwritten.
   * @param {string} key the key
   * @param {string} value The value (as a string)
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  set(key: string, value: any): Promise<any> {
    return this.query('insert or replace into jokes(joke_id, joke_text) values (?, ?)', [key, value]);
  }

  /**
   * Remove the value in the database for the given key.
   * @param {string} key the key
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  remove(key: string): Promise<any> {
    return this.query('delete from jokes where joke_id = ?', [key]);
  }

  /**
   * Clear all keys/values of your database.
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
  clear(): Promise<any> {
    return this.query('delete from jokes');
  }

}
