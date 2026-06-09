//Fil hentet fra https://github.com/Madelelo/demokode/blob/main/backend/app.js
//Denne filen er ansvarlig for å snakke med omverdenen. Den lytter etter forspørsler fra nettleseren, og bestemmer hva som skal skje på hvilken adresse, og bruker db.js til å hente eller lagre data. 

//Henter inn express-biblioteket og lager en app instansvariabel(en variabel som tilhører et objekt, i dette tilfellet app-objektet som representer express-applikasjonen). )
const express = require("express");
const app = express();


const port = 3001;

//henter inn blant annet query og close funksjonene fra db.js slik at jeg kan bruke dem i denne filen for å utføre SQL-spørringer og lukke tilkoblingen når jeg er ferdig.
const db = require("./db");
const cors = require("cors");
app.use(cors());
app.use(express.json()) //Trengs for at express skal kunne forstå JSON-data som sendes fra frontend, for eksempel når jeg sender en POST-forespørsel med en ny film til databasen. 

//Dette er et endepunkt. app.get betyr at det er en GET-forespørsel, og "/" betyr at det er på rotadressen. Når noen besøker denne adressen i nettleseren, vil serveren svare med "Hei du - Velkommen til mitt filmbibliotek!". req er forespørselen som kommer inn, og res er svaret serveren sender tilbake.  
app.get("/", (req, res) => {
  res.send("Hei du - Velkommen til mitt filmbibliotek!");
});

//Viktig endepunkt. Express lytter etter get-forespørsler på endepunktet Når noen besøker localhost:3001/api/movies kjøres denne funksjonen. Den sender SQL-spørringen "SELECT * FROM movies;" til databasen ved bruk av db.query, og venter på svaret. Når svaret kommer, sendes listen med filmer tilbake til nettleseren som JSON-data. Hvis noe går galt under spørringen fanges feilen opp av "catch" og sendes tilbake til nettleseren som et svar. Dette endepunktet er det som gjør at jeg kan hente ut alle filmene fra databasen og vise dem i frontend.
app.get("/api/movies", async (req, res) => {
  let query = "SELECT * FROM movies;";
  try {
    let movies = await db.query(query);
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

//Når frontend sender en film skjer post-requesten
//req.body.title og de andre henter dataen som frontend sender i forespørselen. 
//SQL-spørringen setter filmen inn i movies-tabellen
//result.insertId er den nye movie_id-en databasen laget automatisk for den nye filmen, og det sendes tilbake til frontend sammen med en melding om at filmen er lagt til. 
// Hvis noe går galt, fanges feilen opp og sendes tilbake til frontend.
app.post("/api/movies", async (req, res) => {
    let title = req.body.title;
    let year_released = req.body.year_released;  
    let poster_path = req.body.poster_path;
    let query = "INSERT INTO movies (title, year_released, poster_path) VALUES (?, ?, ?);"; 
    
  try {
    const result = await db.query(query, [title, year_released, poster_path]);
    res.send({ movie_id: Number(result.insertId), message: "Film lagt til!" });
  } catch (error) {
    res.send(error);
  }
});

//Samme prinsipp, men her sendes movie_id og rating inn i stedet for title osv.
//movie_id er den samme id-en som ble returnert fra POST /api/movies — det er sånn databasen vet hvilken film ratingen tilhører via fremmednøkkelen. 
app.post("/api/rating", async (req, res) => {
    let movie_id = req.body.movie_id;
    let rating = req.body.rating;
    let query = "INSERT INTO rating (movie_id, rating) VALUES (?, ?);";
    
try {
    const result = await db.query(query, [movie_id, rating]);
    res.send({ rating_id: Number(result.insertId), message: "Film rangert!" });
  } catch (error) {
    res.send(error);
  }
});

//Starter serveren og sier "begynn å lytte etter forespørsler på port 3001". Når serveren starter, vil den logge "Server kjører på port 3001" i konsollen. Dette gjør at jeg kan åpne nettleseren og gå til localhost:3001 for å se at serveren fungerer, og for å teste endepunktene jeg har satt opp.
app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});