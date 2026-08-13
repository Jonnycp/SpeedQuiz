import ConfirmButton from "./ConfirmButton";
import { Icon } from "@iconify/react";

const VoteCard = ({ username, phrases = [], host=false, isSelected, onSelect }) => {
    return(
        <div className="relative m-8 bg-white font-primary font-extrabold flex flex-col items-start pt-12 pb-6 px-4 md:py-10 md:px-8 border-3 border-neroNonNero shadow-buttons hover:-translate-y-1 transition-transform">
            
            <div className="absolute -top-6 left-6 flex items-center z-10">
                <div className="w-12 h-12 rounded-full border-3 border-neroNonNero flex items-center justify-center overflow-hidden z-10 ">
                    <img 
                        src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`} 
                        alt={`Avatar di ${username}`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="bg-neroNonNero text-white flex items-center gap-1 font-extrabold text-xs uppercase px-3 py-1.5 -ml-3 pl-5 rounded-r-lg border-2 border-neroNonNero">
                    @{username}
                    {host && (  
                        <Icon icon="mdi:crown" className="text-[#FFD13B] text-sm md:text-base" />
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full mt-2">
                {phrases.map((phrase, index) => (
                    <span key={index} className="text-neroNonNero italic text-lg md:text-xl font-extrabold leading-tight">
                        "{phrase}"
                    </span>
                ))}
            </div>
            <div className="w-[92%] mx-auto md:w-full mt-5">
                <ConfirmButton 
                    color="secondary"
                    onClick={onSelect} 
                    disabled={isSelected}
                    customClasses="w-full py-4 md:py-5 text-xl md:text-2xl"
                >
                    {isSelected ? "GIÀ VOTATO" : "VOTA"}
                </ConfirmButton>
            </div>
        </div>
    );
};

export default VoteCard;