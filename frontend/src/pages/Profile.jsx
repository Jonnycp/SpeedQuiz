import Header from "../components/Header";
import LobbyCard from "../components/LobbyCard";
import SectionTitle from "../components/SectionTitle";
import StatCardProfile from "../components/StatCardProfile";
import { Icon } from "@iconify/react";

const Profile = () => {
    const punti = 7083;
    const partiteVinte = 10;
    const partiteGiocate = 15;
    const percentualeVittoria = Math.round((partiteVinte / partiteGiocate) * 100);
    const username = "Jonny";
    const displayUsername = "GERARDO";
    const email = "jonny@speedquiz.it"; 

    return (
        <>

        <div>
            <Header username={username} />
        </div>

        <section className="bg-white border-4 border-neroNonNero shadow-[12px_12px_0_0_#000] w-full max-w-5xl p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8 -rotate-[0.5deg]">
        
        {/* Avatar Grande */}
        <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-neroNonNero shadow-[6px_6px_0_0_#000] bg-[#FFD13B] overflow-hidden flex items-center justify-center">
          <img 
            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`} 
            alt="Avatar" 
            className="w-[90%] h-[90%] object-cover"
          />
        </div>

        {/* Info Testuali & Statistiche */}
        <div className="flex flex-col w-full text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-black uppercase text-[#5945FF] tracking-wide mb-1">
            CIAO, {username}
          </h1>
          <p className="text-sm md:text-base font-bold text-gray-600 mb-6">
            {email}
          </p>

          {/* Griglia Statistiche */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-10 mx-5 md:mx-28 xl:mx-72">
            <StatCardProfile value='7083' label="Punti" bgColor="bg-primary" rotation="-rotate-1" />
            <StatCardProfile value='10' label="Partite vinte" bgColor="bg-secondary" rotation="-rotate-1" />
            <StatCardProfile value='15' label="Partite giocate" bgColor="bg-[#cac0ff]" rotation="-rotate-1" />
            <StatCardProfile value='66' label="Percentuale di vittoria" bgColor="bg-verdinoCarino" rotation="-rotate-1" />
        </div>
        </div>
      </section>

        <div>
            <SectionTitle title="Le tue partite" />
        </div>

        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* sx*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <LobbyCard title="Stanza di tizio 1" players={3} players_max={3} rotation="-rotate-1" content="Rivedi" />
            <LobbyCard title="Stanza di tizio 1" players={3} players_max={10} rotation="-rotate-1" content="Rivedi" />
            <LobbyCard title="Stanza di tizio 1" players={3} players_max={6} rotation="-rotate-1" content="Rivedi" />
            <LobbyCard title="Stanza di tizio 1" players={3} players_max={4} rotation="-rotate-1" content="Rivedi" />
        </div>
        {/* dx*/}
        <div>
          <SectionTitle title="IL TUO PROFILO" />     
          <div className="bg-white border-4 border-neroNonNero shadow-[12px_12px_0_0_#000] p-6 md:p-8 rotate-[0.5deg]">
            <form className="flex flex-col gap-2">
                <label htmlFor="username" className="font-extrabold text-lg md:text-xl uppercase text-black">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Inserisci il tuo username"
                    className="bg-gray-200 p-2 md:p-3 border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
                />
                <label htmlFor="email" className="font-extrabold text-lg md:text-xl uppercase text-black">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Inserisci la tua email"
                    className="bg-gray-200 p-2 md:p-3 border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
                />
                <label htmlFor="password" className="font-extrabold text-lg md:text-xl uppercase text-black">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Inserisci la tua password"
                    className="bg-gray-200 p-2 md:p-3 border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
                />
            </form>
              <button 
                type="button" 
                className="w-full mt-6 bg-verdinoCarino text-white border-3 border-neroNonNero py-4 font-black uppercase text-base md:text-lg shadow-[6px_6px_0_0_#000] hover:-translate-y-1 transition-transform flex justify-center items-center gap-2 cursor-pointer"
              >
                SALVA MODIFICHE <Icon icon="mdi:send" className="text-xl"/>
              </button>
          </div>
        </div>
      </section>
    </>
    )
}

export default Profile;