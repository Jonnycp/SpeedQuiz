import { useState } from "react";
import Header from "../components/Header";
import LobbyCard from "../components/LobbyCard";
import SectionTitle from "../components/SectionTitle";
import StatCardProfile from "../components/StatCardProfile";
import { Icon } from "@iconify/react";

const Profile = () => {
    const datiUtente = {
        username: "Jonny",
        email: "jonny@speedquiz.it",
        punti: 7083,
        partiteVinte: 10,
        partiteGiocate: 15,
        partite: [
            { id: 1, title: "Stanza di tizio 1", players: 3, maxPlayers: 3, isWinner: false },
            { id: 2, title: "Vittoria #1", players: 2, maxPlayers: 3, isWinner: true },
            { id: 3, title: "Stanza di tizio 2", players: 1, maxPlayers: 3, isWinner: false },
            { id: 4, title: "Stanza di tizio 3", players: 5, maxPlayers: 6, isWinner: false }
        ]
    };
    const winRate = datiUtente.partiteVinte / datiUtente.partiteGiocate * 100;

    const initialFormData = {
        email: datiUtente.email,
        password: "",
        username: datiUtente.username
    };

    const [formData, setFormData] = useState(initialFormData);

    //i miei evetni
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const seModifico =
        formData.email !== initialFormData.email ||
        formData.password !== initialFormData.password ||
        formData.username !== initialFormData.username;

    const invioDati = () => {
        console.log("funziono");
    };

    return (
        <div className="font-primary">
            
            <Header username={datiUtente.username} />

            <main className="max-w-5xl mx-auto px-4 mt-8 flex flex-col items-center">
                <section className="bg-white border-4 border-neroNonNero shadow-[12px_12px_0_0_#000] w-full p-6 md:p-10 mb-12 flex flex-col md:flex-row items-center gap-8 -rotate-[0.5deg]">
                    
                    <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full border-4 border-neroNonNero shadow-[6px_6px_0_0_#000] overflow-hidden flex items-center justify-center">
                        <img 
                            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${datiUtente.username}`} 
                            alt="Avatar utente"
                        />
                    </div>

                    <div className="flex flex-col w-full text-center md:text-left">
                        <h1 className="text-xl md:text-2xl font-black uppercase text-terziary mb-1">
                            CIAO, {datiUtente.username}
                        </h1>
                        <p className="font-bold  mb-6">
                            {datiUtente.email}
                        </p>

                        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-8 mt-4 md:mt-10 mx-auto md:mx-0 w-full">
                            <StatCardProfile value={datiUtente.punti} label="Punti" bgColor="bg-primary" rotation="-rotate-1" />
                            <StatCardProfile value={datiUtente.partiteVinte} label="Partite vinte" bgColor="bg-secondary" rotation="-rotate-1" />
                            <StatCardProfile value={datiUtente.partiteGiocate} label="Partite giocate" bgColor="bg-[#cac0ff]" rotation="-rotate-1" />
                            <StatCardProfile value={`${winRate.toFixed(2)}%`} label="Win Rate" bgColor="bg-verdinoCarino" rotation="-rotate-1" />
                        </div>
                    </div>
                </section>

                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    {/* sx*/}
                    <div className="w-full">
                        <SectionTitle title="Le tue partite" />
                        
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 hide-scrollbar">
                                {datiUtente.partite.map((partita) => (
                                <div key={partita.id} className="w-[80vw] shrink-0 snap-center md:w-auto h-full">
                                    <LobbyCard
                                        title={partita.title} 
                                        players={partita.players} 
                                        players_max={partita.maxPlayers} 
                                        rotation="-rotate-1" 
                                        content={"RIVEDI"} 
                                        isWinner={partita.isWinner} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* dx */}
                    <div className="w-full">
                        <SectionTitle title="IL TUO PROFILO" />     
                        
                        <div className="bg-white border-4 border-neroNonNero shadow-[12px_12px_0_0_#000] p-6 md:p-8 rotate-[0.5deg]">
                            <form className="flex flex-col gap-2">

                                <label htmlFor="username" className="font-extrabold text-lg md:text-xl uppercase text-black">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}     
                                    onChange={handleInputChange}
                                    placeholder="Inserisci il tuo username"
                                    className="bg-gray-200 p-2 md:p-3 border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
                                />
                                
                                <label htmlFor="email" className="font-extrabold text-lg md:text-xl uppercase text-black mt-3">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Inserisci la tua email"
                                    className="bg-gray-200 p-2 md:p-3 border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
                                />
                                
                                <label htmlFor="password" className="font-extrabold text-lg md:text-xl uppercase text-black mt-3">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="*******"
                                    className="bg-gray-200 p-2 md:p-3 border-3 border-neroNonNero placeholder:text-gray-400 placeholder:text-lg placeholder:font-medium focus:outline-none"
                                />
                            </form>

                            <button 
                                type="button" 
                                onClick={invioDati}
                                disabled={!seModifico}
                                className={`w-full mt-6 text-white border-3 border-neroNonNero py-4 font-black uppercase text-base md:text-lg flex justify-center items-center gap-2 transition-all duration-300 ${
                                    seModifico 
                                    ? "bg-verdinoCarino shadow-[6px_6px_0_0_#000] hover:-translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer"
                                    : "bg-gray-400 shadow-[4px_4px_0_0_#000] cursor-not-allowed opacity-80"
                                }`}
                            >
                                SALVA MODIFICHE <Icon icon="mdi:send" className="text-xl"/>
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Profile;