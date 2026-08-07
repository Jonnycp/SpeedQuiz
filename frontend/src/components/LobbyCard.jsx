const LobbyCard = ({ title, players,players_max, rotation, content}) => {
  const extraPlayers = players_max - players;
  return (
    <div className={`bg-white border-3 border-neroNonNero shadow-buttons p-6 py-8 ${rotation} flex flex-col justify-between font-primary hover:-translate-y-2 transition-transform cursor-pointer`}>
      <div>
        <h4 className="font-extrabold text-xl uppercase mb-2 text-black">{title}</h4>
        <p className="font-extrabold text-sm mb-6 text-gray-700 uppercase">Players: {players}/{players_max}</p>
      </div>
      <div className="flex items-center justify-between gap-5">
        {/* iconcine fake */}
        <div className="flex -space-x-3 gap-1 items-center">
          <img
            className="w-8 h-8 rounded-full border-3 border-neroNonNero"
            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=antonio`}
            alt={`Avatar di Antonio`}
          />
          <img
            className="w-8 h-8 rounded-full border-3 border-neroNonNero"
            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=genbi`}
            alt={`Avatar di Genbi`}
          />
          <img
            className="w-8 h-8 rounded-full border-3 border-neroNonNero"
            src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=genbi`}
            alt={`Avatar di Genbi`}
          />
            {extraPlayers > 0 && <span className="ml-2">+{extraPlayers}</span>}

        </div>

        <button className="uppercase px-4 py-2 bg-secondary text-black shadow-buttons border-3 border-neroNonNero font-extrabold">
          {content} →
        </button>
      </div>
    </div>
  );
};

export default LobbyCard;

