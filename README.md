<p align="center">
  <img src="frontend/public/favicon.svg" width="200" alt="SpeedQuiz Logo"/>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/FrontEnd-React_19-61DAFB?style=flat-square" alt="FrontEnd">
    <img src="https://img.shields.io/badge/BackEnd-Express_5-303030?style=flat-square" alt="BackEnd">
    <img src="https://img.shields.io/badge/Realtime-Socket.IO-010101?style=flat-square" alt="Realtime">
    <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square" alt="Database">
</p>

* [Cos'è SpeedQuiz](#cosè-speedquiz)
* [Chi siamo](#chi-siamo)
* [Funzionalità principali](#funzionalità-principali)
* [Architettura del Sistema](#architettura-del-sistema)
* [Variabili d'ambiente](#variabili-dambiente)
* [Installazione](#installazione)
* [Comandi Utili](#comandi-utili)
* [Troubleshooting](#troubleshooting)
* [Licenza](#licenza)

# SpeedQuiz
> *Una domanda, 3 risposte, la più divertente vince!*

<p align="center">
    <a href="https://speedquiz-508b.onrender.com/" target="_blank">
      <img src="./frontend/public/og-image.png" width="600" alt="Screen Home desktop SpeedQuiz">
    </a>
</p>

## Cos'è SpeedQuiz
<b>SpeedQuiz</b> è un party game multiplayer in tempo reale: un host crea una stanza, pubblica o privata, e gli altri giocatori entrano per unirsi alla partita con un codice.

A ogni round i giocatori vengono divisi in coppie a rotazione: ciascuno partecipa a due match contro due avversari diversi, e ogni coppia riceve una propria domanda a cui entrambi rispondono entro un tempo limite. Conclusa la fase di risposta, i giocatori non coinvolti nel match votano la risposta che ritengono più divertente tra le due. I voti ricevuti, insieme a un bonus legato all'unanimità dei voti, determinano il punteggio. Al termine dei round configurati viene mostrata una classifica finale, salvata nello storico partite di ogni utente.

Il gioco richiede un account (registrazione/login) e gestisce la sessione con access token JWT e refresh token in cookie httpOnly. Le stanze e lo stato di gioco vivono in memoria sul server e vengono orchestrati via Socket.IO; solo utenti, domande e partite concluse sono persistenti su MongoDB.

<p align="center">
  <img src="./frontend/public/screenshots/screen-desktop-lobby.png" width="600" alt="Screen Lobby desktop SpeedQuiz"/>
   <img src="./frontend/public/screenshots/screen-mobile-lobby.png" width="168" alt="Screen Lobby mobile SpeedQuiz"/>
</p>

## Chi siamo
Progetto sviluppato da:
* **Angelica De Feudis**
* **Jonathan Caputo**
* **Luca Gentile**

## Funzionalità principali
* **Lobby pubbliche o private**, configurabili nel numero di round, tempo di risposta e numero massimo di giocatori.
* **Riconnessione automatica**: un giocatore disconnesso resta in partita per una finestra di tempo configurabile prima di essere rimosso.
* **Statistiche di profilo e storico partite** (partite giocate, vittorie, win rate, partite recenti).
* **Documentazione API interattiva** via Swagger UI.
* **Installabilità** via Progressive Web App PWA

<p align="center">
   <img src="./frontend/public/screenshots/screen-mobile-question.png" width="168" alt="Screen Question mobile SpeedQuiz">
    <img src="./frontend/public/screenshots/screen-desktop-home.png" width="600" alt="Screen Home desktop SpeedQuiz">
</p>

## Architettura del Sistema
Più informazioni nel file [`documentazione-tecnica.md`](/docs/documentazione-tecnica.md)

![Architettura](docs/diagrammi/architettura.png)

## Variabili d'ambiente

I due servizi hanno ciascuno un proprio file, da creare a partire dal template:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### Backend (`backend/.env`)

| Variabile | Descrizione | Esempio |
|---|---|---|
| `PORT` | Porta di ascolto del backend | `3000` |
| `MODE` | Ambiente di esecuzione | `local` |
| `FRONTEND_URL` | Origine consentita per CORS/Socket.IO | `http://localhost:5173` |
| `MONGODB_URI` | Connection string di MongoDB | `mongodb://localhost:27017/speedquiz` |
| `JWT_SECRET` | Chiave di firma dell'access token | *(generato con `npm run secret`)* |
| `JWT_REFRESH_SECRET` | Chiave di firma del refresh token | *(generato con `npm run secret`)* |
| `DISCONNECTED_TIME` | Ms prima di rimuovere un giocatore disconnesso | `60000` |
| `DEFAULT_ANSWER_TIME` / `MIN_ANSWER_TIME` / `MAX_ANSWER_TIME` | Limiti tempo di risposta (ms) | `15000` / `5000` / `30000` |
| `VOTING_TIME` / `REVEAL_TIME` | Durata fase voto/reveal (ms) | `10000` |
| `MAX_PLAYERS` | Giocatori massimi per lobby | `8` |
| `ROUNDS_DEFAULT` | Round di default per partita | `3` |
| `BONUS` | Punti bonus velocità | `150` |
| `CODE_LENGTH` | Lunghezza del codice lobby | `5` |

> ⚠️ **Con Docker Compose**, `MONGODB_URI` e `FRONTEND_URL` vengono impostati automaticamente da `docker-compose.yml` (sezione `environment` del servizio `backend`) e **sovrascrivono** l'eventuale valore presente in `backend/.env`. Gli altri campi (JWT, timer, ecc.) vengono invece letti dal file `.env`.

Per generare i due secret JWT (da eseguire due volte, uno per `JWT_SECRET` e uno per `JWT_REFRESH_SECRET`):
```bash
cd backend && npm install && npm run secret
```
Copia i valori generati in `backend/.env`.

### Frontend (`frontend/.env`)

| Variabile | Descrizione | Esempio |
|---|---|---|
| `VITE_BACKEND_URL` | URL del backend usato dal client (HTTP e Socket.IO) | `http://localhost:3000` |
| `MODE` | Ambiente di esecuzione | `local` |
| `VITE_MIN_ANSWER_TIME` / `VITE_MAX_ANSWER_TIME` / `VITE_DEFAULT_ANSWER_TIME` | Limiti tempo di risposta lato UI. (ms) | `5000` / `40000` / `15000` |
| `VITE_ROUNDS_DEFAULT` | Round di default mostrati in UI | `3` |
| `VITE_CODE_LENGTH` | Lunghezza attesa del codice lobby | `5` |

> ⚠️ **Con Docker Compose**, `VITE_BACKEND_URL` viene definito come build-arg in `docker-compose.yml` (servizio `frontend`, `build.args`) e viene "inserito" nella build statica: il valore in `frontend/.env` **non** ha effetto sull'immagine Docker, solo sull'esecuzione con `npm run dev`/`vite build` locale.

> ⚠️ I valori `MIN_ANSWER_TIME`, `MAX_ANSWER_TIME`, `DEFAULT_ANSWER_TIME`, `ROUNDS_DEFAULT`, `CODE_LENGTH` DEVONO corrispondere con la configurazione backend.

## Installazione

### Requisiti preliminari
* Docker e Docker Compose (opzione consigliata), **oppure**
* Node.js ≥ 22 e un'istanza MongoDB raggiungibile, per lo sviluppo locale senza container.

### Passaggi

1. Clona la repository:
   ```bash
   git clone https://github.com/Jonnycp/SpeedQuiz.git
   cd SpeedQuiz
   ```

2. Configura le [variabili d'ambiente](#variabili-dambiente) di backend e frontend.

3. Avvia lo stack con Docker Compose dalla root del progetto:
   ```bash
   docker compose up --build -d
   ```
   Al primo avvio del container backend il dataset di domande viene popolato automaticamente (il `Dockerfile` esegue `npm run seed` prima di `npm start`).

### Servizi disponibili dopo l'avvio

| Servizio | URL / Porta |
|---|---|
| **Frontend (via Nginx)** | http://localhost |
| **API diretta backend** | http://localhost:3000 |
| **Swagger UI** | http://localhost:3000/api-docs |
| **MongoDB** | `localhost:27017` |

## Comandi utili

Popola/ripopola manualmente il database con le domande (svuota e reinserisce la collection):
```bash
cd backend && npm run seed
```

Genera una chiave segreta casuale da usare come `JWT_SECRET` o `JWT_REFRESH_SECRET`:
```bash
cd backend && npm run secret
```

Avvia il backend in locale con auto-reload:
```bash
cd backend && npm run dev
```

Avvia il frontend in locale con hot-reload:
```bash
cd frontend && npm run dev
```

Gestione dello stack Docker:
```bash
docker compose up --build -d       # build + avvio in background
docker compose ps                  # stato dei servizi
docker compose logs -f backend     # log del backend in tempo reale
docker compose restart backend     # riavvia solo il backend
docker compose down                # ferma e rimuove i container (mantiene i dati)
docker compose down -v             # ... e rimuove anche il volume del database
```

## Troubleshooting

| Problema | Causa probabile / Soluzione |
|---|---|
| Il backend non si connette a MongoDB | Verifica `MONGODB_URI`. Con Docker Compose l'host è il nome del servizio (`mongo`/`mongodb` in `docker-compose.yml`), in locale è `localhost`. Assicurati che MongoDB sia attivo. |
| Errori CORS o Socket.IO che non si connette | `FRONTEND_URL` nel `.env` del backend non corrisponde all'origine reale del frontend. Con Docker Compose viene impostato automaticamente; in locale aggiornalo a mano. |
| Il frontend non raggiunge il backend in sviluppo locale (senza Docker) | Controlla `VITE_BACKEND_URL` in `frontend/.env` e che il backend sia avviato (`npm run dev` in `backend/`). |
 Nessuna domanda disponibile in partita | Il seeder non è stato eseguito: `docker compose exec backend npm run seed` (o `cd backend && npm run seed` in locale). |

## Licenza
Il progetto è distribuito con una licenza proprietaria a uso accademico: nessuna parte del codice può essere riprodotta, distribuita o riutilizzata senza il consenso scritto degli autori. Testo completo in [LICENSE.md](LICENSE.md).

© 2026 Angelica De Feudis, Jonathan Caputo, Luca Gentile. Tutti i diritti riservati.
