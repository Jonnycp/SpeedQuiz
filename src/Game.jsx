import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";

const Game = () => {
  return (
    <BrowserRouter>
      <main className="bg-background">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Game;
