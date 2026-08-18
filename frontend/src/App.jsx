import { Icon } from "@iconify/react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import background from "../assets/background.png";
import { ProtectedRoute, MessagePage } from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Lobby from "./pages/Lobby.jsx";
import Game from "./pages/Game.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Profile from "./pages/Profile.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { GameProvider } from "./contexts/GameContext.jsx";

const App = () => {
  return (
    <main
      style={{ backgroundImage: `url(${background})` }}
      className="bg-repeat bg-center"
    >
      <BrowserRouter>
        <div className="absolute top-15 left- 5 md:top-32 md:left-10 text-9xl -rotate-12 select-none pointer-events-none">
          <Icon icon="noto:star" opacity={0.8} />
        </div>
        <div className="absolute top-160 right-5 md:top-130 md:right-10 text-9xl -rotate-12 select-none pointer-events-none">
          <Icon icon="noto:party-popper" opacity={0.7} />
        </div>
        <ToastContainer hideProgressBar={true} position="top-center" theme="colored" />
        <AuthProvider>
          <GameProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
              <Route path="/lobby/:code" element={<ProtectedRoute> <Lobby /></ProtectedRoute>} />
              <Route path="/game" element={<ProtectedRoute> <Game /> </ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
              <Route path="*" element={<MessagePage/>}/>
            </Routes>
          </GameProvider>
        </AuthProvider>
        <footer className="text-white/50 font-primary text-sm text-center py-5 font-extrabold uppercase selection:bg-primary selection:text-black">
          ©{new Date().getFullYear()} - SpeedQuiz Team ❤️
        </footer>
      </BrowserRouter>
    </main>
  );
};

export default App;