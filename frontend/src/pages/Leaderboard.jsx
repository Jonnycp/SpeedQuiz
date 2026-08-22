import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useUser } from "../contexts/UserContext";

import Header from "../components/Header";
import ResultPlayer from "../components/ResultPlayer";
import PodiumPlayer from "../components/PodiumPlayer";
import ConfirmButton from "../components/ConfirmButton";
import MainTitle from "../components/MainTitle";
import { MessagePage } from "../components/ProtectedRoute";


const Leaderboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLeaderboard } = useUser();

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLeaderboardData() {
      try {
        const data = await getLeaderboard(id);
        setPlayers(data.players);
      } catch (err) {
        setError(err.message || "Impossibile caricare la classifica");
      } finally {
        setLoading(false);
      }
    }
    getLeaderboardData();
  }, [id]);

if (loading) {
    return (
      <>
        <Header />
        <MessagePage loadingPage={true} />
      </>
    );
  }
  if (error) return <MessagePage loadingPage={false} />;

  // Separiamo i primi 3 per il podio dagli altri giocatori
  const podium = players.slice(0, 3);
    const first = podium[0];
    const second = podium[1];
    const third = podium[2];
    
  const others = players.slice(3);


  return (
    <>
      <Header />
      <Confetti recycle={false} />
      <section className="my-10">
        <MainTitle title="Partita conclusa!" className="text-5xl"/>
        <h2 className="text-xl text-semibold font-primary text-center text-secondary mt-4">
          3 finalisti, nessuna dignità: applausi
        </h2>
      </section>
        <section className="flex gap-3 md:gap-8 mx-4 md:mx-32 py-24 relative z-10 select-none justify-center">
          {second && <PodiumPlayer position={2} username={second.username} points={second.score} id={second.user}/>}
          {first && <PodiumPlayer position={1} username={first.username} points={first.score} id={first.user}/>}
          {third && <PodiumPlayer position={3} username={third.username} points={third.score} id={third.user}/>}
      </section>
      {others.length > 0 && (
        <section className="flex flex-col gap-4 mx-10 md:mx-40 relative z-10">
          {others.map((player, index) => (
            <ResultPlayer 
              key={player._id}
              id={player.user} 
              username={player.username} 
              position={index + 4}
              points={player.score} 
            />
          ))}
        </section>
      )}
      <section className="flex justify-center gap-4 mt-10 mb-6 mx-32 pt-6">
        <ConfirmButton color="red" onClick={() => navigate('/profile')}>          
          Esci
        </ConfirmButton>
      </section>
    </>
  );
};

export default Leaderboard;
