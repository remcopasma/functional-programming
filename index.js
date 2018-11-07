const OBA = require('./obaMaanWrapperDing'); // Wouter heeft dit bestand geschreven en mij hierbij geholpen//
const fs = require('fs');

const client = new OBA({
  public: '1e19898c87464e239192c8bfe422f280',
  secret: '4289fec4e962a33118340c888699438d'
});

client.get('search', {
  q: 'year:2018 music',                    
  //librarian: true,
  refine: true,
  facet:'type(book)',
  count:100,
  log:true,
 // filter: calculate
  })
  .then(results =>{ 
   // Van de results die we krijgen na de search.
    let boeken = results.map(book => makeBookObject(book))
    console.log(boeken)
    boekendut=[]
    boekeneng=[]
   
    boeken.forEach(function(boek){ // Checken of de boeken voldoen aan de talen Nederlands of Engels.
      if(boek.taal === 'dut'){
        boekendut.push(boek)
      } else if (boek.taal === 'eng'){boeken
        boekeneng.push(boek)
      }
    })
    fs.writeFile('log.json', JSON.stringify(boeken), 'utf8', function() {})  // De resultaten van boeken naar log.json schrijven
    console.log('Er zijn',boekendut.length,'Nederlandse boeken gevonden') // Nederlandse boeken teruggeven 
    console.log('Er zijn',boekeneng.length,'Engelse boeken gevonden') // Engelse boeken terug geven
  })
  

  // .then(function(){
  //   let calculateArray = calculate(array);
  //   console.log(calculateArray)
    //fs.writeFile('log.json', JSON.stringify(array), 'utf8', function() {})  // Schrijft naar log.json
  // })

  .catch(err => console.log(err))   // Vangt de error af

  function makeBookObject(book) {
  bookObject = {
    // Credits van Joost | Afvangen van de undefined properties en die netjes als een string weergeven
    title: book.titles.title.$t,
    taal: (typeof book.languages === "undefined" || typeof book.languages.language === "undefined") ? 'Taal onbekend' : book.languages.language.$t,
    jaartal: (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t,
    auteur: (typeof book.authors === "undefined" || typeof book.authors['main-author'] === "undefined") ? "Auteur onbekend" : book.authors['main-author'].$t
  }
  return(bookObject)
};

//function calculate(book){
 // let jaartal = (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t;
    //if(jaartaal == 2016){
      return true;
   // }
//}