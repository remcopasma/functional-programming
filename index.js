const OBA = require('./obaMaanWrapperDing'); // Wouter heeft dit bestand geschreven en mij hierbij geholpen//
const fs = require('fs');

const client = new OBA({
  public: '1e19898c87464e239192c8bfe422f280',
  secret: '4289fec4e962a33118340c888699438d'
});

client.get('search', {
  q: 'music',             // Language: 'eng'       
  refine: true,
  facet:'type(book)',
  count:200,
  log:true,
  })
  .then(results =>{ 
  
    let boeken = results.map(book => makeBookObject(book)) // Geeft array terug op voorwarde van de makeBookObject functie
    let jaartalObject = jaartalFormatObject(boeken)
    let aantalboeken = aantalboekFunctie(jaartalObject)
    let sorteerJaar = aantalboeken.sort(sorteerBoeken)  // Parameter  aantalboeken wordt in functie
    let filterOpTaal = filterfunctie(sorteerJaar)

    console.log(filterOpTaal)
    // boekendut=[]
    // boekeneng=[]
   
    // boeken.forEach(function(boek){ // Checken of de boeken voldoen aan de talen Nederlands of Engels.
    //   if(boek.taal === 'dut'){
    //     boekendut.push(boek)
    //   } else if (boek.taal === 'eng'){boeken
    //     boekeneng.push(boek)
    //   }
    // })

    fs.writeFile('log.json', JSON.stringify(filterOpTaal), 'utf8', function() {})  // De resultaten van boeken naar log.json schrijven
   // console.log('Er zijn',boekendut.length,'Nederlandse boeken gevonden') // Nederlandse boeken teruggeven 
   // console.log('Er zijn',boekeneng.length,'Engelse boeken gevonden') // Engelse boeken terug geven
  })

  .catch(err => console.log(err))   // Vangt de error af
  
  function sorteerBoeken(a, b){ // Vergelijken van de jaren van een boek. Op basis daarvan 1 stapje omhoog of naar beneden
    if (a.jaartal < b.jaartal)
      return -1;
    if (a.jaartal > b.jaartal)
      return 1;
    return 0;
   } 


  function aantalboekFunctie(boekenlijst){   // Er wordt een object item aangemaakt, waarin ik jaartal meegeef en het aantalBoeken
    let array=[]
    boekenlijst.forEach(function(book){
      item={
        jaartal: book.jaartal,
        aantalBoeken: book.title.length,
        taal: book.taal
      }
      array.push(item)
    })
    return array
  }


  function filterfunctie(booklijst){      // filteren op boeken uit het jaartal 2010 of hoger en alleen de engelse boeken tonen
    let array = booklijst.filter(function(book){
      if(book.jaartal >= 2010 && book.taal =='eng'){
        return book
      }
    })
    return array
  }


  function jaartalFormatObject(boeken) {
    // Credits lock en wouter
    let array = [];
    boeken.forEach(object => {
      // console.log(object)
      let item = array.find(item => item.jaartal === object.jaartal);
      if (!item) {
        item = {
          jaartal: object.jaartal,
          title: [],
          taal: object.taal
        };
        array.push(item);
      }
      var merged = [].concat(object.title);
      item.title = item.title.concat(object.title);
    });
   
    return array
   }
   

  function makeBookObject(book) {
  bookObject = {
// Credits Joost | Afvangen van de undefined properties en die netjes als een string weergeven
    title: book.titles.title.$t,
    taal: (typeof book.languages === "undefined" || typeof book.languages.language === "undefined") ? 'Taal onbekend' : book.languages.language.$t,
    jaartal: (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t,
    auteur: (typeof book.authors === "undefined" || typeof book.authors['main-author'] === "undefined") ? "Auteur onbekend" : book.authors['main-author'].$t
  }
  return(bookObject)
};
