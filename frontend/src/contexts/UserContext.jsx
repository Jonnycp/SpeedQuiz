import { createContext, useContext, useState } from "react";
import { createLobbyAPI, getGamesAPI, getGameLeaderboardAPI, getPublicLobbiesAPI } from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {

    //* statistiche utente
    async function getUserGames() {
        const data = await getGamesAPI();
        return data;
    }
    //* leaderboard
    async function getLeaderboard(gameId) {
        const data = await getGameLeaderboardAPI(gameId);
        return data;
    }

    async function createLobby(){
        const data = await createLobbyAPI();
        return data;
    }

    //* lobbies pubbliche
    async function getPublicLobbies(gameId){
        const data = await getPublicLobbiesAPI(gameId);
        return data;
    }

    return (
    <UserContext.Provider value={{ createLobby, getUserGames, getLeaderboard, getPublicLobbies }}>
      {children}
    </UserContext.Provider>
  );
}

//* Hook personalizzato per accedere al context
export function useUser() {
    return useContext(UserContext);
}