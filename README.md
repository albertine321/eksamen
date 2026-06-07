# 🎬 Filmbibliotek

Et webbasert filmbibliotek der du kan utforske populære filmer fra TMDB og lagre dine favoritter med personlig rating.

## Teknologi

| Del | Teknologi |
|---|---|
| Frontend | Next.js (TypeScript) |
| Backend | Node.js + Express |
| Database | MariaDB |
| Eksternt API | The Movie Database (TMDB) |
| Kjøremiljø | Docker + Docker Compose |

## Funksjonalitet

- Utforsk populære filmer hentet fra TMDB
- Lagre filmer i ditt personlige bibliotek
- Gi filmer en personlig rating

## Kom i gang

### Forutsetninger

- [Docker](https://www.docker.com/products/docker-desktop) må være installert

### Oppsett

1. Klon repoet:
   ```bash
   git clone https://github.com/albertine321/eksamen.git
   cd eksamen
   ```

2. Lag en `.env`-fil i rotmappen:
   ```
   DB_HOST=db
   DB_USER=databasebruker
   DB_PASS=ditt_passord
   DB_NAME=eksamen
   DB_ROOT_PASS=ditt_root_passord
   TMDB_API_KEY=din_tmdb_api_nøkkel
   ```

3. Start applikasjonen:
   ```bash
   docker compose up --build
   ```

4. Åpne nettleseren:
   - Frontend: [localhost:3000](http://localhost:3000)
   - API: [localhost:3001/api/movies](http://localhost:3001/api/movies)

## Prosjektstruktur
 
```
eksamen/
├── docker-compose.yml
├── schema.sql
└── filmbib/
    ├── Dockerfile.frontend
    ├── app/
    │   ├── components/       # Gjenbrukbare komponenter
    │   ├── personvern/       # Personvernerklæringsside
    │   └── page.tsx          # Hovedside med filmvisning
    └── backend/
        ├── Dockerfile
        ├── app.js            # Express-server og endepunkter
        └── db.js             # Databasetilkobling
```

## API-endepunkter

| Metode | Endepunkt | Beskrivelse |
|---|---|---|
| GET | `/api/movies` | Hent alle lagrede filmer |
| POST | `/api/movies` | Lagre en ny film |
| POST | `/api/rating` | Gi en film rating |

## Database

Databasen består av to tabeller:

**movies** — lagrer filmer brukeren har lagt til i biblioteket

**rating** — lagrer brukerens ratings, koblet til movies via fremmednøkkel

## TMDB API

Filminformasjon hentes fra [The Movie Database (TMDB)](https://www.themoviedb.org). Du trenger en gratis API-nøkkel fra [TMDB sin nettside](https://www.themoviedb.org/settings/api).

## Lisens

MIT
