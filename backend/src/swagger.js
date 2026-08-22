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
        ],
        tags: [
            { name: "AuthController", description: "Gestione autenticazione, registrazione e profilo utente" },
            { name: "GameController", description: "Gestione statistiche e classifiche delle partite" },
            { name: "LobbyController", description: "Creazione e ricerca delle stanze di gioco" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Inserisci il token JWT ottenuto dal login",
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
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Errore interno del server" },
                    },
                },
            },
        },
        paths: {
            //* AUTH CONTROLLER
            "/api/v1/auth/register": {
                post: {
                    tags: ["AuthController"],
                    summary: "Registrazione nuovo utente",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["username", "email", "password"],
                                    properties: {
                                        username: { type: "string", example: "genbi" },
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
                        500: { description: "Errore del server" },
                    },
                },
            },
            "/api/v1/auth/login": {
                post: {
                    tags: ["AuthController"],
                    summary: "Login utente",
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
                        500: { description: "Errore del server" },
                    },
                },
            },
            "/api/v1/auth/logout": {
                post: {
                    tags: ["AuthController"],
                    summary: "Logout utente",
                    responses: {
                        200: { description: "Logout effettuato con successo" },
                        500: { description: "Errore del server" },
                    },
                },
            },
            "/api/v1/auth/refresh": {
                post: {
                    tags: ["AuthController"],
                    summary: "Ottieni un nuovo access token tramite il refresh token nei cookie",
                    responses: {
                        200: { description: "Nuovo token generato" },
                        401: { description: "Refresh token scaduto o non valido" },
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
                                        username: { type: "string" },
                                        email: { type: "string" },
                                        password: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: "Dati aggiornati con successo" },
                        400: { description: "Dati inseriti non validi o già in uso" },
                        401: { description: "Non autorizzato" },
                        500: { description: "Errore del server" },
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
                        200: { description: "Statistiche e storico partite recuperati con successo" },
                        401: { description: "Non autorizzato" },
                        404: { description: "Utente non trovato" },
                        500: { description: "Errore del server" },
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
                        200: { description: "Classifica recuperata con successo" },
                        401: { description: "Non autorizzato" },
                        404: { description: "Partita non trovata o inesistente" },
                        500: { description: "Errore interno del server" },
                    },
                },
            },

            //* LOBBY CONTROLLER
            "/api/v1/lobbies": {
                post: {
                    tags: ["LobbyController"],
                    summary: "Crea una nuova stanza di gioco (in RAM)",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: "Restituisce il codice della stanza già esistente" },
                        201: { description: "Nuova stanza creata con successo" },
                        401: { description: "Non autorizzato" },
                        500: { description: "Errore del server" },
                    },
                },
            },
            "/api/v1/lobbies/public": {
                get: {
                    tags: ["LobbyController"],
                    summary: "Recupera la lista di tutte le lobby pubbliche attive",
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: "Lista delle lobby pubbliche restituita con successo" },
                        401: { description: "Non autorizzato" },
                        500: { description: "Errore del server" },
                    },
                },
            },
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;