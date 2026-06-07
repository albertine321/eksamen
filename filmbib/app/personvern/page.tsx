export default function Personvern() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-8 py-10">

        <a href="/" className="text-zinc-400 hover:text-white text-sm mb-8 inline-block">
          ← Tilbake til forsiden
        </a>

        <h1 className="text-5xl font-bold mb-3 mt-6">
          🔒 Personvernerklæring
        </h1>

        <p className="text-zinc-400 mb-10">Sist oppdatert: juni 2026</p>

        <div className="space-y-6 text-zinc-400 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Om tjenesten</h2>
            <p>Filmbibliotek er en webtjeneste for å utforske og lagre filmer fra TMDB.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Data vi lagrer</h2>
            <p>Vi lagrer filmer du velger å legge til i biblioteket ditt, samt ratings du gir til filmer.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Tredjeparts API</h2>
            <p>Filminformasjon hentes fra The Movie Database (TMDB). Vi lagrer ikke data fra TMDB utover det du selv velger å lagre.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Informasjonskapsler</h2>
            <p>Vi bruker ingen sporings- eller markedsføringskapsler.</p>
          </section>

        </div>
      </div>
    </main>
  );
}