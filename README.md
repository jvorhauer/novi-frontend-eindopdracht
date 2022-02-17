# NOVI HBO SD - Eindopdracht FrontEnd 2021/03

Dit is de eindopdracht van de NOVI HBO Software Development Frontend module voor groep 2021/03.

Dit project bevat de documentatie en de React applicatie. De source code van dit project is te vinden op [Github frontend eindopdracht](https://github.com/jvorhauer/novi-frontend-eindopdracht).

## wireframes

De wireframes zijn, zoals gevraagd, getekend op papier en daarna gefotografeerd. Het resultaat is een X-tal foto's in de 
`wireframes` folder in de `docs` folder.

## prototype

Het Figma prototype is te vinden via
Figma: [Figma Prototype](https://www.figma.com/file/BanNpoylj79dg7Lnf6nT7v/Protoype-Eindopdracht-Novi?node-id=2%3A11)

## uitvoeren

De React applicatie kan uitgevoerd worden door 

```shell
npm start
```

in de root folder van het uitgepakte of geclone-de project.

## gebruik

Na het starten van de applicatie wordt automatisch de `Home` pagina geopend in de default browser.

Vandaar af zijn er twee opties: `Aanmelden` en `Registreren`.

NB: mocht het automatisch opstarten niet werken, open dan een pagina in de browser met als adres [Noviaal lokaal](http://localhost:3000)

### Registreren

Vul 
* een email adres in; dat mag fictief zijn, wordt niets mee gedaan, behalve gebruikt als gebruikersnaam van een account. Het moet wel een valide email adres zijn.
* een gebruikersnaam in. Dit mag van alles zijn, zolang het maar niet leeg gelaten wordt.
* een wachtwoord in
* nogmaals het wachtwoord van het vorige veld in. Een veel gebruikte methode om typefouten in het (niet leesbare) wachtwoord te voorkomen.

Nu alle velden zijn ingevuld, druk op `Maak account aan`.

Klaar. Het email adres en wachtwoord zijn direct te gebruiken voor het maken van notities, lijst van gebruikers tonen en hun notities te bewonderen.

### Aanmelden

Nu een account is aangemaakt kan er aangemeld worden, ook wel bekend als inloggen.

Vul
* het email adres van de aanmelding (zie Registreren) in,
* het bijbehorende wachtwoord in en

Druk op `Inloggen`.

### Gebruik

Na succesvol inloggen kan de gebruiker:
* zijn of haar notities zien en bewerken
* de lijst van gebruikers in zien
* in die lijst een gebruiker kiezen en dan
* de lijst met notities van die gebruiker te zien en
* een notitie in detail te zien en
* commentaar leveren op die notitie.
