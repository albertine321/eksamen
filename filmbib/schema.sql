CREATE DATABASE eksamen;
USE eksamen;

CREATE TABLE movies (
   movie_id INTEGER PRIMARY KEY AUTO_INCREMENT, //Dette oppretter en kolonne i movies-tabellen som heter movie_id. Denne kolonnen er satt som PRIMARY KEY, noe som betyr at den vil være unik for hver rad i tabellen og brukes til å identifisere hver film entydig. AUTO_INCREMENT betyr at verdien i denne kolonnen automatisk vil øke med 1 for hver ny film som legges til, så du trenger ikke å manuelt angi en ID for hver film.
   title VARCHAR(120),
   year_released INTEGER,
   poster_path VARCHAR(255)
);

CREATE TABLE rating (
   rating_id INTEGER PRIMARY KEY AUTO_INCREMENT,
   movie_id INTEGER, //Dette oppretter en kolonne i rating-tabellen som heter movie_id. Denne kolonnen vil brukes til å lagre ID-en til filmen som blir vurdert. Det er viktig for å kunne knytte hver rating til en spesifikk film i movies-tabellen.
   rating INTEGER,
   FOREIGN KEY (movie_id) REFERENCES movies(movie_id) //Dette oppretter en fremmednøkkel som knytter rating-tabellen til movies-tabellen basert på movie_id. Det betyr at hver rating må være knyttet til en gyldig film i movies-tabellen.
);