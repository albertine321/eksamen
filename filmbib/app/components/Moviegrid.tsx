//Claude + internett

"use client"
import { useState } from "react";

//beskriver hvordan film-objektet skal se ut, slik at typescript kan hjelpe oss med å unngå feil
type Movie = {
  id: number;
  title: string;
  release_date: number;
  poster_path: string;
  vote_average: number;
};

export default function MovieGrid({ movies }: { movies: Movie[] }) {
//To huskelapper som holder styr på hvilken film som ble lagret:
  const [savedMovieId, setSavedMovieId] = useState<number | null>(null); //id-en filmen fikk i din database
  const [savedTmdbId, setSavedTmdbId] = useState<number | null>(null); //id-en filmen har hos TMDB

//En asynkron funksjon som tar imot et film-objekt. async fordi den må vente på svar fra backend.
  async function lagreFilm(movie: Movie) {

//Sender filmdata til Express-backenden din med POST-metoden. JSON.stringify konverterer JavaScript-objektet til tekst som kan sendes over internett.
    const res = await fetch("http://localhost:3001/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: movie.title,
        year_released: movie.release_date?.slice(0, 4),
        poster_path: movie.poster_path,
      }),
    });
//Leser svaret fra backenden — data.movie_id er id-en databasen laget. Begge states oppdateres så vi vet hvilken film som ble lagret.
    const data = await res.json();
    setSavedMovieId(data.movie_id);
    setSavedTmdbId(movie.id);
  }
//return-funksjon som viser filmene på nettsiden. 
  return (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies?.map((movie: Movie) => (
            <div
              key={movie.id}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="w-full"
                />
              ) : (
                <div className="h-[450px] flex items-center justify-center bg-zinc-800">
                  Ingen plakat
                </div>
              )}

              <div className="p-4">
                <h2 className="font-semibold text-lg">
                  {movie.title}
                </h2>

                <p className="text-zinc-400">
                  {movie.release_date?.slice(0, 4)}
                </p>

                <p className="mt-2">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
                <button className="mt-2 w-full bg-zinc-700 hover:bg-zinc-600 text-white text-sm py-1 rounded" //lagreFilm-knappen. onClick kaller lagreFilm-funksjonen når knappen trykkes, og sender med film-objektet som argument.
                    onClick={() => lagreFilm(movie)}
                    >
                    Lagre
                </button>
              </div>
            </div>
          ))}
        </div>
  );
}