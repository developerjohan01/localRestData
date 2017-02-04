/**
 * Created by johannilsson on 2017/01/16.
 */
// export interface Joke {
//   id: number;
//   joke: string;
// }

export class Joke {
  id: number;
  joke: string;

  constructor(id: number, joke: string) {
    this.id = id;
    this.joke = joke;
  }
}
