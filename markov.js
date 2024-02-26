/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.markov;
    this.makeChains();
  }

  /** set markov chains */

  makeChains() {
    // reduce word array into object
    // each word in array becomes a object key
    // map/filter next word in array into arrays for object values
    this.markov = this.words.reduce((obj, word) => {
      return {
        ...obj,
        [word]: this.words.map((val, i, arr) => { if(val===word){ return arr[i+1] }})
                .filter((item) => item)
      }
    }, '');
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let textArr = [];
    let keys = Object.keys(this.markov);
    let key = keys[Math.floor(Math.random() * keys.length)]

    //select object with values in array
    while(!this.markov[key] || !this.markov[key].length)
      key = keys[Math.floor(Math.random() * keys.length)]

    // add first key value
    textArr.push(key + ' ');

    do {
      // check if object has values in array
      if(this.markov[key] && this.markov[key].length){
        key = this.markov[key][(Math.floor(Math.random() * this.markov[key].length))];
      }else{
        // select random value if last value added was a duplicate
        while(textArr.slice(-1)[0] === key + ' ' || textArr.slice(-1)[0] === key + '. ')
          key = keys[Math.floor(Math.random() * keys.length)]  
      }
      // add key value
      if(this.markov[key] && this.markov[key].length && 
        textArr.length < numWords-1 ) textArr.push(key + ' ');
      else textArr.push(key + '. ')

    } while (textArr.length < numWords);

    return textArr.join('');
  }

}

module.exports = MarkovMachine