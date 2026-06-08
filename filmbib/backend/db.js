//Fil hentet fra https://github.com/Madelelo/demokode/blob/main/backend/dbconnector.js + Claude
//Denne filen er ansvarlig for å snakke med databasen. Den setter opp tilkoblingen til databasen, og tilbyr funksjoner for å utføre SQL-spørringer. 


require("dotenv").config({ path: __dirname + "/../../.env" }); //Laster inn .env-filen til filen slik at passord  og annen data ikke hardkodes i koden. __dirname betyr at den ser etter .env-filen i mappen over backend-mappen, altså i rotmappen til prosjektet. Dette gjør at sensitive data som passord og API-nøkler ikke blir eksponert i koden, og det gjør det enklere å endre disse verdiene uten å måtte redigere selve koden.
const mariadb = require("mariadb"); //Importerer MariaDB-biblioteket som brukes for å koble til og kommunisere med en mariadb-database

//En pool er en samling av databasetilkoblinger som venter på å bli brukt. Når en applikasjon trenger å utføre noe med databasen, kan den be om en tilkobling fra poolen i stedet for å opprette en ny tilkobling hver gang. Det gjør applikasjonen mer effektiv og raskere. Når en tilkobling er ferdig brukt, blir den returnert til poolen slik at den kan gjenbrukes. 
const pool = mariadb.createPool({ 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5, //Angir hvor mange samtidige tilkoblinger som kan opprettes i poolen. I dette tilfellet er det satt til 5, noe som betyr at opptil 5 tilkoblinger kan være aktive samtidig. Hvis flere enn 5 tilkoblinger forsøker å opprettes, vil de bli satt i kø og vente på at en eksisterende tilkobling blir frigjort før de kan opprettes. Dette hjelper med å håndtere belastningen på databasen og unngå overbelastning.
});

//Denne funksjonen bruker jeg for å utføre SQL-spørringer til databasen. Den henter en ledig tilkobling fra poolen, sender SQL-spørringen med eventuelle parametere til databasen, og returnerer resultatet til den som kaller funksjonen. Try catch gjør at eventuelle feil som oppstår under tilkoblingen eller spørringen blir fanget og håndtert på en kontrollert måte. Til slutt frigjøres tilkoblingen tilbake til poolen, uansett om spørringen var vellykket eller om det oppsto en feil. Async/await betyr at funksjonen venter på svar fra den asynkrone oppgaven før den går videre i programmet, men programmet kan gjøre andre oppgaver imens den venter. 
async function query(sql, params) { 
  let connection;
  try {
    connection = await pool.getConnection();
    const res = await connection.query(sql, params);
    return res;
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.release();
  }
}
//: Forteller JavaScript at funksjonen vil kjøre asynkront og at den returnerer et løfte (Promise), slik at andre deler av koden kan vite når funksjonen er ferdig.
//Denne funksjonen kjøres aynkront og sier da at den vil returnere et promise når den er ferdig slik at await vet når den kan fortsette. Funksjonen brukes til å lukke databasetilkoblingen og signaliserer at jeg er ferdig med poolen.
async function close() {
  await pool.end();
}
//Eksporterer query og close-funksjonene slik at de kan brukes i andre filer i prosjektet, for eksempel i app.js der jeg trenger å utføre SQL-spørringer og lukke tilkoblingen når jeg er ferdig. Det er Node.js sin måte å si at disse funksjonene skal være tilgjengelige for andre filer som importerer denne modulen.
module.exports = { query, close };

//Denne delen av koden er en testblook som sjekker om denne filen (db.js) kjøres direkte (for eksempel ved å kjøre "node db.js" i terminalen). Det er nyttig for å teste om databasetilkoblingen fungerer uten å starte hele serveren. Hvis denne filen kjøres direkte, vil den utføre en enkel SQL-spørring ("SELECT 1 AS ok") for å sjekke om tilkoblingen til databasen fungerer. Hvis spørringen er vellykket, vil den logge resultatet til konsollen. Hvis det oppstår en feil, vil den logge feilen også. Etter at testen er utført, vil den lukke poolen for å frigjøre ressurser og logge at poolen er lukket før den avslutter programmet. Dette er en enkel måte å verifisere at databasetilkoblingen fungerer som forventet uten å måtte starte hele applikasjonen.
if (require.main === module) {
  (async () => {
    try {
      const res = await query("SELECT 1 AS ok");
      console.log("DB test result:", res);
    } catch (err) {
      console.error("DB test failed:", err);
    } finally {
      await close();
      console.log("Pool closed, exiting.");
    }
  })();
}