import { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, registerAPI, logoutAPI, updateProfileAPI, getGamesAPI, getGameLeaderboardAPI} from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("loggedUser");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  //* Login utente
  async function login(email, password) {
    const data = await loginAPI(email, password);
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("loggedUser", JSON.stringify(data.user));
    setUser(data.user);
  }

  //* Registra utente
  async function register(username, email, password) {
    const data = await registerAPI(username, email, password);
    localStorage.setItem("accessToken", data.token);
    localStorage.setItem("loggedUser", JSON.stringify(data.user));
    setUser(data.user);
  }

  //* Logout utente
  async function logout() {
    const data = await logoutAPI();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loggedUser");
    setUser(null);
  }

//* UPDATE PROFILE
  async function updateProfile(username, email, password){
    const data = await updateProfileAPI(username, email, password);
    localStorage.setItem("loggedUser", JSON.stringify(data.user));
    localStorage.setItem("accessToken", data.token);
    setUser(data.user);
  }

//* STATISTICHE UTENTE
  async function getUserGames() {
    const data = await getGamesAPI();
    return data;
  }

//* LEADERBOARD PARTITA
  async function getLeaderboard(gameId) {
    const data = await getGameLeaderboardAPI(gameId);
    return data;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, getUserGames, getLeaderboard }}>
      {children}
    </AuthContext.Provider>
  );
}

//* Hook personalizzato per accedere a context
export function useAuth() {
  return useContext(AuthContext);
}