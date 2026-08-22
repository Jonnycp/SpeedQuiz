import { Icon } from "@iconify/react";
import { useGame } from "../contexts/GameContext";

const MiniPlayer = ({ id, username, isMini=false}) => {
    const { lobby } = useGame();

    const player = lobby?.players.find(p => p.id === id);
    const hostId = lobby?.hostId;

    const sizeClassImg = isMini ? "w-8 h-8" : "w-12 h-12";
    const sizeClassText = isMini ? "text-[10px]" : "text-xs";
    
  return (
    <div className={`flex items-center gap-2 ${isMini ? "animate-pulse-fade-in animate-delay-600" : ""}`}>
      <div className={`${sizeClassImg} rounded-full border-3 border-neroNonNeroflex items-center justify-center overflow-hidden z-10`}>
        <img
          src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${id}`}
          alt={`Avatar di ${username || player?.username}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`bg-neroNonNero text-white flex items-center gap-1 font-extrabold ${sizeClassText} uppercase px-3 py-1.5 -ml-7 pl-5 rounded-r-lg border-2 border-neroNonNero`}>
        @{username ||player?.username}
        {id === hostId && (
          <Icon
            icon="mdi:crown"
            className="text-secondary text-sm md:text-base"
          />
        )}
      </div>
    </div>
  );
};

export default MiniPlayer;