import ConfirmButton from "./ConfirmButton";
const LobbyCard = ({ title, players, players_max, date, rotation, content,
  avatars = ["jonny", "genbi", "angelica", "marco", "andrea"] 
}) => {
  

  const visibleAvatars = avatars.slice(0, Math.min(players, 3));
  const extraPlayers = players > 3 ? players - 3 : 0;

  return (
    <div className={`bg-white border-3 border-neroNonNero shadow-buttons p-4 md:p-6 py-6 md:py-8 ${rotation} flex flex-col justify-between font-primary hover:-translate-y-2 transition-transform cursor-pointer h-full`}>
      <div>
        <h4 className="font-extrabold text-lg md:text-xl uppercase mb-2 text-black leading-tight">{title}</h4>
        {date ? (
          <p className="font-extrabold text-xs md:text-sm mb-4 md:mb-6 text-gray-700 uppercase">
            DATA: {new Date(date).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" })}
          </p>
        ) : (
          <p className="font-extrabold text-xs md:text-sm mb-4 md:mb-6 text-gray-700 uppercase">
            PLAYERS: {players}/{players_max || "?"}
          </p>
        )}
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-3 md:gap-5 mt-auto">
        

        <div className="flex -space-x-3 gap-1 items-center">
          {visibleAvatars.map((name, index) => (
            <img
              key={index}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 md:border-3 border-neroNonNero bg-white z-10 relative"
              src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${name}`}
              alt={`Avatar di ${name}`}
            />
          ))}
          
          {extraPlayers > 0 && (
            <span className="ml-2 font-bold text-xs md:text-sm text-black">
              +{extraPlayers}
            </span>
          )}
        </div>
        
        <ConfirmButton color="secondary" customClasses="w-full">
          {content +  " →"}
        </ConfirmButton>
      </div>
    </div>
  );
};

export default LobbyCard;