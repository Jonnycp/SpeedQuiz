const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SpeedQuiz API",
            version: "1.0.0",
            description: "API backend per il gioco SpeedQuiz",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
            {
                url: "https://speedquiz-api.onrender.com/",
                description: "Public server",
            },
        ],
        tags: [
            { name: "AuthController", description: "Gestione autenticazione, registrazione e profilo utente" },
            { name: "GameController", description: "Gestione statistiche e classifiche delle partite" },
            { name: "LobbyController", description: "Creazione e ricerca delle stanze di gioco" },
            { name: "HealthController", description: "Verifica lo stato del server" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Inserisci il token JWT ottenuto dal login",
                },
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "refreshToken",
                    description: "Refresh token httpOnly impostato al login/register",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "6a79a933ef286d120db6a52a" },
                        username: { type: "string", example: "genbi" },
                        email: { type: "string", format: "email", example: "genbi@esempio.it" },
                    },
                },
                AuthResponse: {
                    type: "object",
                    properties: {
                        token: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
                        user: { $ref: "#/components/schemas/User" },
                    },
                },
                RefreshResponse: {
                    type: "object",
                    properties: {
                        accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
                    },
                },
                GameStats: {
                    type: "object",
                    properties: {
                        points: { type: "number", example: 1250 },
                        gamesWon: { type: "number", example: 4 },
                        gamesPlayed: { type: "number", example: 10 },
                        winRate: { type: "string", example: "40.00" },
                    },
                },
                RecentGame: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "6a79a933ef286d120db6a52a" },
                        title: { type: "string", example: "STANZA DI genbi" },
                        players: { type: "number", example: 4 },
                        date: { type: "string", format: "date-time" },
                        isWinner: { type: "boolean", example: true },
                    },
                },
                Player: {
                    type: "object",
                    properties: {
                        user: { type: "string", example: "6a79a933ef286d120db6a52a" },
                        username: { type: "string", example: "genbi" },
                        score: { type: "number", example: 350 },
                        isWinner: { type: "boolean", example: true },
                    },
                },
                LobbyPlayer: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "6a79a933ef286d120db6a52a" },
                        username: { type: "string", example: "genbi" },
                        socketId: { type: "string", example: "aBcD1234" },
                        connected: { type: "boolean", example: true },
                        disconnectedAt: { type: "number", nullable: true, example: null },
                        score: { type: "number", example: 0 },
                    },
                },
                LobbyConfig: {
                    type: "object",
                    properties: {
                        public: { type: "boolean", example: true },
                        rounds: { type: "number", example: 5 },
                        minPlayers: { type: "number", example: 3 },
                        maxPlayers: { type: "number", example: 8 },
                        answerTimeMs: { type: "number", example: 30000 },
                        votingTimeMs: { type: "number", example: 30000 },
                        revealTimems: { type: "number", example: 15000 },
                    },
                },
                Lobby: {
                    type: "object",
                    properties: {
                        code: { type: "string", example: "A1B2C3" },
                        hostId: { type: "string", example: "6a79a933ef286d120db6a52a" },
                        hostUsername: { type: "string", example: "genbi" },
                        status: { type: "string", example: "LOBBY", description: "LOBBY, ANSWERING, VOTING, REVEAL, PAUSED, ENDED" },
                        config: { $ref: "#/components/schemas/LobbyConfig" },
                        currentRound: { type: "number", example: -1 },
                        currentVoting: { type: "number", example: -1 },
                        phaseEndAt: { type: "number", nullable: true, example: null },
                        players: { type: "array", items: { $ref: "#/components/schemas/LobbyPlayer" } },
                        rounds: { type: "array", items: { type: "object" } },
                        gameId: { type: "string", nullable: true, example: "6a79a933ef286d120db6a52a" },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Errore interno del server" },
                    },
                },
            },
        },
        paths: {
            
            //* HEALTH CONTROLLER
            "/api/v1/health": {
                get: {
                    tags: ["HealthController"],
                    summary: "Verifica lo stato del server",
                    description: "Endpoint di health check, non richiede autenticazione.",
                    responses: {
                        200: {
                            description: "Server attivo e funzionante",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: { type: "string", example: "Il server funziona" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },

            //* AUTH CONTROLLER
            "/api/v1/auth/register": {
                post: {
                    tags: ["AuthController"],
                    summary: "Registrazione nuovo utente",
                    description: "Crea un nuovo utente ed effettua automaticamente il login, impostando l'access token nella risposta e il refresh token in un cookie httpOnly.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["username", "email", "password"],
                                    properties: {
                                        username: { type: "string", minLength: 2, maxLength: 15, example: "genbi" },
                                        email: { type: "string", format: "email", example: "genbi@esempio.it" },
                                        password: { type: "string", minLength: 8, example: "passwordSicura123" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: "Registrazione completata", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
                        400: { description: "Dati non validi o utente esistente", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        500: { description: "Errore del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },
            "/api/v1/auth/login": {
                post: {
                    tags: ["AuthController"],
                    summary: "Login utente",
                    description: "Verifica le credenziali e restituisce un access token, impostando il refresh token in un cookie httpOnly.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["email", "password"],
                                    properties: {
                                        email: { type: "string", format: "email", example: "genbi@esempio.it" },
                                        password: { type: "string", example: "passwordSicura123" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: "Login effettuato", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
                        400: { description: "Parametri mancanti", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        401: { description: "Credenziali non valide", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        500: { description: "Errore del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },
            "/api/v1/auth/logout": {
                post: {
                    tags: ["AuthController"],
                    summary: "Logout utente",
                    description: "Invalida il refresh token del dispositivo corrente (se presente nel cookie) e cancella il cookie. Non richiede autenticazione: se il cookie è assente la richiesta ha comunque successo. Lascia attive le sessioni su altri dispositivi.",
                    responses: {
                        200: { description: "Logout effettuato con successo" },
                        500: { description: "Errore del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },
            "/api/v1/auth/refresh": {
                post: {
                    tags: ["AuthController"],
                    summary: "Ottieni un nuovo access token tramite il refresh token nei cookie",
                    description: "Verifica il refresh token httpOnly, esegue la rotation (invalida il vecchio e ne emette uno nuovo) e restituisce un nuovo access token.",
                    security: [{ cookieAuth: [] }],
                    parameters: [
                        {
                            name: "refreshToken",
                            in: "cookie",
                            required: true,
                            schema: { type: "string" },
                            description: "Refresh token httpOnly impostato al login/register",
                        },
                    ],
                    responses: {
                        200: { description: "Nuovo access token generato", content: { "application/json": { schema: { $ref: "#/components/schemas/RefreshResponse" } } } },
                        401: { description: "Refresh token mancante, scaduto o non valido", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },
            "/api/v1/auth/profile": {
                put: {
                    tags: ["AuthController"],
                    summary: "Aggiorna i dati del profilo utente",
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", minLength: 2, maxLength: 15 },
                                        email: { type: "string", format: "email" },
                                        password: { type: "string", minLength: 8 },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Dati aggiornati con successo",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: { type: "string" },
                                            user: { $ref: "#/components/schemas/User" },
                                        },
                                    },
                                },
                            },
                        },
                        400: { description: "Dati inseriti non validi o già in uso", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        401: { description: "Non autorizzato", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        500: { description: "Errore del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },

            //* GAME CONTROLLER
            "/api/v1/games": {
                get: {
                    tags: ["GameController"],
                    summary: "Recupera le statistiche utente e lo storico partite (Profilo)",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Statistiche e storico partite recuperati con successo",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            stats: { $ref: "#/components/schemas/GameStats" },
                                            games: { type: "array", items: { $ref: "#/components/schemas/RecentGame" } },
                                        },
                                    },
                                },
                            },
                        },
                        401: { description: "Non autorizzato", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        404: { description: "Utente non trovato", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        500: { description: "Errore del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },
            "/api/v1/games/{id}": {
                get: {
                    tags: ["GameController"],
                    summary: "Recupera la classifica finale di una specifica partita",
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "ID della partita (Game ID)",
                        },
                    ],
                    responses: {
                        200: {
                            description: "Classifica recuperata con successo",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            title: { type: "string", example: "Stanza di genbi" },
                                            players: { type: "array", items: { $ref: "#/components/schemas/Player" } },
                                        },
                                    },
                                },
                            },
                        },
                        401: { description: "Non autorizzato", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        404: { description: "Partita non trovata o inesistente", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        500: { description: "Errore interno del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },

            //* LOBBY CONTROLLER
            "/api/v1/lobbies": {
                post: {
                    tags: ["LobbyController"],
                    summary: "Crea una nuova stanza di gioco (in RAM)",
                    description: "Se l'utente possiede già una stanza attiva, ne restituisce il codice invece di crearne una nuova.",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Restituisce il codice della stanza già esistente",
                            content: { "application/json": { schema: { type: "object", properties: { message: { type: "string" }, code: { type: "string", example: "A1B2C3" } } } } },
                        },
                        201: {
                            description: "Nuova stanza creata con successo",
                            content: { "application/json": { schema: { type: "object", properties: { message: { type: "string" }, code: { type: "string", example: "A1B2C3" } } } } },
                        },
                        401: { description: "Non autorizzato", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        500: { description: "Errore del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },
            "/api/v1/lobbies/public": {
                get: {
                    tags: ["LobbyController"],
                    summary: "Recupera la lista di tutte le lobby pubbliche attive",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: {
                            description: "Lista delle lobby pubbliche restituita con successo",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: { type: "string" },
                                            lobbies: { type: "array", items: { $ref: "#/components/schemas/Lobby" } },
                                        },
                                    },
                                },
                            },
                        },
                        401: { description: "Non autorizzato", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                        500: { description: "Errore del server", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
                    },
                },
            },
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
