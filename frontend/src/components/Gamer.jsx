import { Link } from "react-router";

const Gamer = ({username, imageUser, isHost = false, rotation}) => {
  return (
<div className={`flex items-center justify-between w-full max-w-2xl bg-white border-3 border-neroNonNero shadow-buttons rounded-xl py-3 px-5 mb-4 font-primary mt-4 mx-auto px-2 ${rotation}`}>
        <div className="flex items-center gap-4 md:gap-5">
            <img
                className="w-8 h-8 rounded-full border-3 border-neroNonNero"
                src={imageUser}
                alt={`Avatar di ${username}`}
            />
            <span className="font-extrabold text-lg md:text-xl uppercase tracking-wide text-black">
                {username}
            </span>
        </div>
        {isHost && (
        <div className="bg-[#3dd97e] border-3 border-neroNonNero px-3 py-1 font-extrabold text-xs md:text-sm uppercase text-black">
          HOST
        </div>
      )}
    </div>
);
};

export default Gamer;
