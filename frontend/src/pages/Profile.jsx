import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/AuthContext";

import Header from "../components/Header";
import LobbyCard from "../components/LobbyCard";
import SectionTitle from "../components/SectionTitle";
import StatCardProfile from "../components/StatCardProfile";
import ConfirmButton from "../components/ConfirmButton";
import SingleInput from "../components/SingleInput";

import EmptyState from "../components/EmptyState";

import { getProfileStatsAPI } from "../services/api";

const Profile = () => {
  const { user, updateProfile } = useAuth();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  
  const [stats, setStats] = useState({
    points: 0,
    gamesWon: 0,
    gamesPlayed: 0,
    winRate: "0.00",
  });
  const [tuePartite, setTuePartite] = useState([]);

  async function handleSubmit(e){
    e.preventDefault();
    setError("");
    setIsDisabled(true);
    try{
        await updateProfile(username, email, password)
    }catch(error){
        setError(error || {message: "Al momento abbiamo qualche problema :("});
    }finally{
        setIsDisabled(false);
    }
  }

  useEffect(() => {
    if(username !== user.username || email !== user.email || password.length > 8){
        setIsDisabled(false);
    }else{
        setIsDisabled(true);
    }
  }, [username, email, password]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getProfileStatsAPI();
        setStats(data.stats);
        setTuePartite(data.games);
      } catch (err) {
        console.error("Errore nel caricamento delle statistiche:", err);
      }
    }

    fetchStats();
  }, []);


  return (
    <div className="font-primary">
      <Header />

      <main className="md:max-w-7xl max-w-5xl mx-auto px-4 mt-8 flex flex-col items-center">
        <section className="bg-white border-4 border-neroNonNero shadow-buttons w-full p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8 -rotate-[0.5deg]">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-neroNonNero shadow-buttons overflow-hidden flex items-center justify-center">
            <img
              src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${user.id}`}
              alt={"Avatar di " + user.username}
            />
          </div>

          <div className="flex flex-col w-full text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-black uppercase text-terziary mb-1">
              CIAO, {user.username}
            </h1>
            <p className="font-bold  mb-6">{user.email}</p>

            <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-8 mt-4 md:mt-10 mx-auto md:mx-0 w-full">
              <StatCardProfile
                value={stats.points}
                label="Punti"
                bgColor="bg-primary"
                rotation="-rotate-1"
              />
              <StatCardProfile
                value={stats.gamesWon}
                label="Partite vinte"
                bgColor="bg-secondary"
                rotation="-rotate-1"
              />
              <StatCardProfile
                value={stats.gamesPlayed}
                label="Partite giocate"
                bgColor="bg-[#cac0ff]"
                rotation="-rotate-1"
              />
              <StatCardProfile
                value={`${stats.winRate}%`}
                label="Win Rate"
                bgColor="bg-verdinoCarino"
                rotation="-rotate-1"
              />
            </div>
          </div>
        </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* sx*/}
          <div className="w-full">
            <SectionTitle title="Le tue partite" />

            <div className="flex overflow-x-auto gap-5 pb-6 -mx-4 px-4 md:mx-0 md:px-0 min-[1265px]:grid md:grid-cols-2 md:max-h-[480px] md:overflow-y-auto hide-scrollbar pr-2">             
                {tuePartite.length > 0 ? (
                tuePartite.map((partita) => (
                  <div
                    key={partita.id}
                    className="w-[85vw] max-w-[300px] md:w-full shrink-0 snap-center h-auto"                  
                    >
                    <LobbyCard
                      title={partita.title}
                      players={partita.players}
                      date={partita.date}
                      rotation="-rotate-1"
                      content={"RIVEDI"}
                      isWinner={partita.isWinner}
                    />
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 w-full mt-4">
                  <EmptyState message="Non hai giocato nessuna partita" />
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <SectionTitle title="modifica il tuo profilo" />

            <div className="bg-white border-4 border-neroNonNero shadow-buttons p-6 md:p-8 rotate-[0.5deg]">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-center text-md mb-2">{error.message}</p>}
                <SingleInput
                  label="Username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome di gioco"
                  minLength={2}
                  maxLength={15}
                />

                <SingleInput
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@esempio.it"
                />

                <SingleInput
                  label="Nuova Password"
                  type="password"
                  name="password"
                  value={password}
                  required={false}
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="• • • • • • • •"
                />
                <ConfirmButton type="submit" disabled={isDisabled} color="verdinoCarino" customClasses="w-full mt-6 py-4 text-base md:text-lg">
                    <span className="flex items-center justify-center gap-2">
                      SALVA MODIFICHE
                      <Icon icon="mdi:send" className="text-xl" />
                    </span>
                </ConfirmButton>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
