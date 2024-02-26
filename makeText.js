/** Command-line tool to generate Markov text. */

const Markov = require('./markov');
const fs = require('fs');
const axios = require('axios');


buildMarkov = (data) => {
    let mm = new Markov(data.toLowerCase());
    return mm.makeText();
}

readTxt = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){ console.log(`${err}`); process.exit(1); }
        console.log(`... generated text from ${path} ...`);
        console.log(buildMarkov(data)); 
    });
}

async function readUrl(url) {
    try {
        let res = await axios.get(`${url}`);
        if(res){
            //https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/
            data = res.data.replace(/(<([^>]+)>)/ig, '');
            console.log(`... generated text from ${url} ...`);
            console.log(buildMarkov(data));
        }
      } catch(err) { console.log(`${err}`); process.exit(1); }
}

// check if string is valid url
// https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
isUrl = (str) => {
    let urlPattern = new RegExp('^(https?:\\/\\/)'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(str) && !str.endsWith('txt');
}

const main = () => {
    let token;
    let input = process.argv.slice(-1)[0];
    for(let arg of process.argv){
        if(arg === 'txt' || arg === 'url'){ token = arg; break; }
    }
    if(token){ 
        if(isUrl(input)) readUrl(input);
        else readTxt(input);
    }else{
        console.log(`Error: Missing/Invalid argument. Expected token "txt" or "url" before "${input}"`);
        process.exit(1);
    }
}

main();
