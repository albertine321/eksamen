const express = require("express");
const app = express();
const port = 3001;
const db = require("./db");

app.get("/", (req, res) => {
  res.send("Hei du - Velkommen til mitt filmbibliotek!");
});

app.get("/api/movies", async (req, res) => {
  let query = "SELECT * FROM movies;";
  try {
    let movies = await db.query(query);
    res.send(movies);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});