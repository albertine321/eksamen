//Claude
import MovieGrid from "./components/MovieGrid";

async function getMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Kunne ikke hente filmer");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-10 pb-16">
        <h1 className="text-5xl font-bold mb-3">
          🎬 Filmbibliotek
        </h1>

        <p className="text-zinc-400 mb-10">
          Populære filmer hentet fra TMDB
        </p>
      </div>
      {movies?.results?.length === 0 && (
        <p className="text-zinc-400">Kunne ikke hente filmer fra TMDB. Prøv igjen senere.</p>
      )}

      <MovieGrid movies={movies.results} />
    </main>
  );
}