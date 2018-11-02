# Maandag 29-10-2018
Introductie over de OBA. Connectie gelegd met de OBA API.
Er trad een gyp error op, dit heb ik opgelost door **node-gyp rebuild** te doen en **sudo apt-get install build essential** uit te voeren.


# Onderzoek
Op school gewerkt met aantal medestudenten. Geprobeerd data op te halen en onderzoeksvragen te bedenken. 


## Onderzoeksvraag
* Is er in de afgelopen 8 jaar veel verschil gekomen in de hoeveelheid engelse boeken?

### Deelvragen 
1. Hoeveel engelse boeken zijn er in totaal in de OBA te vinden in 2010?
2. Hoeveel engelse boeken zijn er op dit moment?
3. Wat is het verschil?



### Welke variabele heb ik nodig om de juiste data uit de API te halen?
1. Ik wil de **Titel** van het boek hebben
2. Ik wil de **Language** van een boek hebben
3. Ik wil het **Jaar** van uitgave hebben. 


## Notities
Ik kan op dit moment aangeven dat ik alleen engelse of alleen nederlandse boeken wil zien binnen een bepaald jaar. Ik krijg alleen nog steeds maar 20 resultaten terug en dus niet de hele lijst met boeken. Ik wil de aantallen tellen d.m.v een count.
* Filter Engels Nederlands
* Binnen een aantal jaar kunnen sorteren
* Meerdere resultaten terugkrijgen
* Aantal als int terug krijgen