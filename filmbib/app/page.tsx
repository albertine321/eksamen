//Claude
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
      <div className="max-w-7xl mx-auto px-8 py-10">
        <h1 className="text-5xl font-bold mb-3">
          🎬 Filmbibliotek
        </h1>

        <p className="text-zinc-400 mb-10">
          Populære filmer hentet fra TMDB
        </p>
      </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies?.results?.map((movie: Movie) => (
            <div
              key={movie.id}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
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
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}