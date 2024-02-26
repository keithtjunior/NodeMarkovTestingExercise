const Markov = require('./markov');
let mm;

beforeAll(() => {
    let text = 'the cat in the hat chasing a rat on a mat'
    mm = new Markov(text);
});

describe('Markok()', () => {

    test('expect word/array length to be 100', function () {
        // remove any spaces & blank characters from text
        // & reassign to new array
        text = mm.makeText();
        textArr = text.split(' ');
        for(let i in textArr){
          if(textArr[i].replace(/\s/g, '') === ''){
            textArr.splice(i, 1);
          } 
        }
        expect(textArr).toHaveLength(100);
    })
    
    test('expect string to contain certain words', function () {
        expect(mm.makeText()).toContain('cat');
        expect(mm.makeText()).toContain('hat');
        expect(mm.makeText()).toContain('in');;
        expect(mm.makeText()).toContain('chasing');
        expect(mm.makeText()).toContain('rat');
        expect(mm.makeText()).toContain('mat.');
    });
    
    test('expect string to contain certain combinations', function () {
        expect(mm.makeText()).toContain('the cat');
        expect(mm.makeText()).toContain('the hat');
        expect(mm.makeText()).toContain('cat in');
        expect(mm.makeText()).toContain('hat chasing');
        expect(mm.makeText()).toContain('a rat');
        expect(mm.makeText()).toContain('a mat');
    });

});


