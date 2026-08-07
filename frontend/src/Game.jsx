import { Icon } from "@iconify/react";
import { BrowserRouter, Route, Routes } from "react-router";

import background from "../assets/background.png";

import Home from "./pages/Home.jsx";
import Lobby from "./pages/Lobby.jsx";
import Vote from "./pages/Vote.jsx";
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <footer className="text-white/50 font-primary text-sm text-center py-5 font-extrabold uppercase selection:bg-primary selection:text-black">
          ©{new Date().getFullYear()} - SpeedQuiz Team ❤️
        </footer>
      </BrowserRouter>
    </main>
  );
};

export default Game;
