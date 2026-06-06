//Denne filen er ansvarlig for å snakke med omverdenen. Den lytter etter forspørsler fra nettleseren, og bestemmer hva som skal skje på hvilken adresse, og bruker db.js til å hente eller lagre data. 

//Henter inn express-biblioteket og lager en app instansvariabel(en variabel som tilhører et objekt, i dette tilfellet app-objektet som representer express-applikasjonen). )
const express = require("express");
const app = express();


const port = 3001;

//henter inn blant annet query og close funksjonene fra db.js slik at jeg kan bruke dem i denne filen for å utføre SQL-spørringer og lukke tilkoblingen når jeg er ferdig.
const db = require("./db");

//Dette er et endepunkt. app.get betyr at det er en GET-forespørsel, og "/" betyr at det er på rotadressen. Når noen besøker denne adressen i nettleseren, vil serveren svare med "Hei du - Velkommen til mitt filmbibliotek!". req er forespørselen som kommer inn, og res er svaret serveren sender tilbake.  
app.get("/", (req, res) => {
  res.send("Hei du - Velkommen til mitt filmbibliotek!");
});

//Viktig endepunkt. Når noen besøker localhost:3001/api/movies kjøres denne funksjonen. Den sender SQL-spørringen "SELECT * FROM movies;" til databasen ved bruk av db.query, og venter på svaret. Når svaret kommer, sendes listen med filmer tilbake til nettleseren som JSON-data. Hvis noe går galt under spørringen fanges feilen opp av "catch" og sendes tilbake til nettleseren som et svar. Dette endepunktet er det som gjør at jeg kan hente ut alle filmene fra databasen og vise dem i frontend.
app.get("/api/movies", async (req, res) => {
  let query = "SELECT * FROM movies;";
  try {
    let movies = await db.query(query);
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

//Starter serveren og sier "begynn å lytte etter forespørsler på port 3001". Når serveren starter, vil den logge "Server kjører på port 3001" i konsollen. Dette gjør at jeg kan åpne nettleseren og gå til localhost:3001 for å se at serveren fungerer, og for å teste endepunktene jeg har satt opp.
app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});