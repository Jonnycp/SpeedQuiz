import Confetti from "react-confetti";

import GamePhase from "../components/GamePhase";
import Header from "../components/Header";
import ResultPlayer from "../components/ResultPlayer";
import PodiumPlayer from "../components/PodiumPlayer";
import ConfirmButton from "../components/ConfirmButton";
import MainTitle from "../components/MainTitle";

import { useNavigate } from "react-router"
import { useAuth } from "../contexts/AuthContext";

const Leaderboard = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout(){
    try{
      await logout();
      navigate("/ ");
    }catch(err){
      console.log("Impossibile uscire.")
    }
  }

  return (
    <>
      <Header />
      <Confetti />
      <section className="my-10">
        <MainTitle title="Partita conclusa!" className="text-5xl"/>
        <h2 className="text-xl text-semibold font-primary text-center text-secondary mt-4">
          3 finalisti, nessuna dignità: applausi
        </h2>
      </section>
      <section className="flex gap-3 md:gap-8 mx-4 md:mx-32 py-24 relative z-10 select-none">
        <PodiumPlayer position={2} username="Maria" points={800} />
        <PodiumPlayer position={1} username="Antonio" points={1000} />
        <PodiumPlayer position={3} username="Luca" points={600} />
      </section>
      <section className="flex flex-col gap-4 mx-10 md:mx-40 relative z-10">
      <ResultPlayer username="Jonathan" position={4} points={500} />
      <ResultPlayer username="Charlie" position={5} points={300} />
      </section>
      <section className="flex justify-center gap-4 mt-10 mb-6 mx-32 pt-6">
        <ConfirmButton
          onClick={handleLogout}
          content="Esci dal gioco" 
          bgColor="red-600" 
          textColor="white"/>
      </section>
    </>
  );
};

export default Leaderboard;
