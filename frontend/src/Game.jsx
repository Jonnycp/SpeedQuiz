import { Icon } from "@iconify/react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import background from "../assets/background.png";
import { ProtectedRoute, MessagePage } from "./components/ProtectedRoute";

import Home from "./pages/Home.jsx";
import Lobby from "./pages/Lobby.jsx";
import Vote from "./pages/Vote.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Question from "./pages/Question.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Profile from "./pages/Profile.jsx";

const Game = () => {
  return (
    <main
      style={{ backgroundImage: `url(${background})` }}
      className="bg-repeat bg-center"
    >
      <BrowserRouter>
        <div className="absolute top-15 left- 5 md:top-32 md:left-10 text-9xl -rotate-12 select-none pointer-events-none">
          <Icon icon="noto:star" />
        </div>
        <div className="absolute top-160 right-5 md:top-130 md:right-10 text-9xl -rotate-12 select-none pointer-events-none">
          <Icon icon="noto:party-popper" />
        </div>
        <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
              <Route path="/lobby" element={<ProtectedRoute> <Lobby /></ProtectedRoute>} />
              <Route path="/vote" element={<ProtectedRoute> <Vote /> </ProtectedRoute>} />
              <Route path="/question" element={<ProtectedRoute> <Question /> </ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute> <Leaderboard /> </ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
              <Route path="*" element={<MessagePage/>}/>
            </Routes>
        </AuthProvider>
        <footer className="text-white/50 font-primary text-sm text-center py-5 font-extrabold uppercase selection:bg-primary selection:text-black">
          ©{new Date().getFullYear()} - SpeedQuiz Team ❤️
        </footer>
      </BrowserRouter>
    </main>
  );
};

export default Game;