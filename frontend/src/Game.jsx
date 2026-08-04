import { Icon } from "@iconify/react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";

const Game = () => {
  return (
    <BrowserRouter>
      <main>
        <div className="absolute top-32 left-10 text-9xl -rotate-12 select-none pointer-events-none"><Icon icon="noto:star"/></div>
        <div className="absolute bottom-10 right-10 text-9xl -rotate-12 select-none pointer-events-none"><Icon icon="noto:party-popper"/></div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Game;
