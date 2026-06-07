
CREATE TABLE movies (
   movie_id INTEGER PRIMARY KEY AUTO_INCREMENT, 
   title VARCHAR(120),
   year_released INTEGER,
   poster_path VARCHAR(255)
);

CREATE TABLE rating (
   rating_id INTEGER PRIMARY KEY AUTO_INCREMENT,
   movie_id INTEGER, 
   rating INTEGER,
   FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);