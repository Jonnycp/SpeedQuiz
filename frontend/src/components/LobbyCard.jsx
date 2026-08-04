const LobbyCard = ({ title, players,players_max, rotation }) => {
  return (
    <div className={`w-90 h-50 bg-white border-3 border-neroNonNero shadow-buttons p-6 ${rotation} flex flex-col justify-between font-primary hover:-translate-y-2 transition-transform cursor-pointer`}>
      <div>
        <h4 className="font-extrabold text-xl uppercase mb-2 text-black">{title}</h4>
        <p className="font-extrabold text-sm mb-6 text-gray-700 uppercase">Players: {players}/{players_max}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <p>non so mettere le icone</p>
        </div>
        <button className="uppercase px-4 py-2 bg-secondary text-black shadow-buttons border-3 border-neroNonNero font-extrabold">
          Unisciti →
        </button>
      </div>
    </div>
  );
};

export default LobbyCard;