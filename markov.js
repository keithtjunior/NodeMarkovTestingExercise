/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    return this.words.reduce((obj, word) => {
      return {
        ...obj,
        [word]: this.words.map((val, i, arr) => { if(val===word){ return arr[i+1] }})
                .filter((item) => item)
      }
    }, '');
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

let m = new MarkovMachine("the cat in the hat")
console.log(m.makeChains())