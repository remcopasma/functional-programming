# Inhoud
* Search
* Onderzoek
* Bevindingen
* Problemen
* Waar ben ik trots op
# Search
Tijdens het kijken naar de OBA API heb ik gekeken naar **Search**. Ik ben door de lijst gaan kijken waar ik allemaal op kon zoeken om de api beter te begrijpen.
![Search](./search.png)

 
# Onderzoek
## Onderzoeksvragen
1. Is er in de afgelopen 8 jaar veel verschil gekomen in de hoeveelheid engelse boeken als je zoekt op het woord music?
2. Is er stijgende lijn tussen te zien in het aantal Engelse boeken ten opzichte van de Nederlandse boeken als je zoekt op het woord muziek?
3. Is er na de oorlog een stijging in het aantal duitse boeken te zien of juist helemaal niet?
4. Binnen de categorie romans zijn het aantal boeken de afgelopen 5 jaar gedaald?
5. Waar zijn de meeste boeken gepubliceerd in het afgelopen jaar.

## Uiteindelijk gekozen onderzoeksvraag
Is er in de afgelopen 8 jaar veel verschil gekomen in de hoeveelheid engelse boeken als je zoekt op het woord music?

## Hypothese
Er is de afgelopen jaar een daling in het aantal engelse boeken met het woord music erin.

## Bijbehorende Deelvragen 
1. Is het totale aantal 100 wat ik terugkrijg als ik count op 100 zet of zijn er boeken met een andere taal dan Nederlands of Engels?
2. Daalt het aantal Nederlandse boeken als je steeds een jaar verder gaat?
3. Is het aantal Engelse boeken steeds meer gaan stijgen als je een jaar verder gaat?
4. Wat zijn de verschillen per jaar vanaf 2010 tot nu?

## Welke variabele heb ik nodig om de juiste data uit de API te halen?
Ik ben in de search gaan kijken welke variabele ik in ieder geval moet gaan gebruiken om mijn onderzoeksvraag te kunnen beantwoorden.
1. Ik wil de **Titel** van het boek hebben
2. Ik wil de **Language** van een boek hebben
3. Ik wil het **Jaar** van uitgave hebben. 


## Verwachtingen
Ik verwacht dat van de 100 boeken die ik ophaal er een daling zit in het aantal Engelse boeken met het woord music. Dit omdat de mensen steeds meer online bekijken.

# Bevindingen 
Ik kreeg maar 20 resulaten terug ssc code Hierdoor kon ik geen conclusies trekken
Rond 2010 veel engelse daarna daling
Vanaf 2017 grote stijging

# Problemen
De problemen waar ik tegen aan ben gelopen de afgelopen 2 weken:
* Ik vond het lastig om een goede onderzoeksvraag te bedenken omdat ik in het begin nog niet de juiste data kon ophalen. Ik heb mijn onderzoeksvraag hierdoor aangepast. Mijn eerste onderzoeksvraag was: Is het aantal Engelse boeken de afgelopen 8 jaar juist gestegen of gedaald. Ik vond dat ik deze wat specifieker moest maken zodat ik wat betere data terug kon krijgen.
* Ik wilde weten hoeveel boeken engels waren in ieder jaar en had hiervoor een functie geschreven:
```
function calculate(book){
 let jaartal = (typeof book.publication === "undefined" || typeof book.publication.year === "undefined") ? 'Jaar onbekend' : book.publication.year.$t;
    if(jaartaal == 2016){
      return true;
    }
}
```
In de query had ik ```filter: calculate ``` en ```facet=language(eng)  ``` staan wat ervoor zorgt dat ik alle engelse boeken uit 2016 krijg. Ik kreeg hier ook resultaten uit maar kon hier geen conclusies uit trekken. Ik heb dus mijn onderzoeksvraag aangepast om betere data te krijgen 
* Ik kreeg het niet voor elkaar om meer dan 20 resultaten op te halen. Hierdoor kon ik geen conclusies trekken en mijn deelvragen moeilijk beantwoorden. Wouter heeft mij hier uiteindelijk bij geholpen.



## Meer dan 20 resultaten terugkrijgen

## stukje code waar ik het meest trots op ben

