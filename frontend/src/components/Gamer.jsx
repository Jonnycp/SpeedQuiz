const Gamer = ({username, imageUser, isHost = false, rotation}) => {
  return (
<div className={`flex flex-col md:flex-row items-center md:justify-between md:w-full md:max-w-2xl md:bg-white md:border-3 md:border-neroNonNero md:shadow-buttons md:py-3 md:px-5 font-primary md:mx-auto ${rotation}`}>
        <div className="relative flex flex-col items-center md:flex-row md:gap-4 w-18 md:w-full">
            <img
                className="w-16 md:w-8 md:h-8 rounded-full border-3 border-neroNonNero shadow-buttons md:shadow-none"
                src={imageUser}
                alt={`Avatar di ${username}`}
            />
            <span className="font-bold text-xs md:text-xl mt-3 md:mt-0 uppercase tracking-wide truncate max-w-full text-white md:text-black">
                {username}
            </span>
        {isHost && (
        <div className="absolute top-0 -right-3 md:static bg-verdinoCarino border-3 border-neroNonNero px-1 py-0.5 md:px-3 md:py-1 font-extrabold text-[9px] md:text-sm uppercase text-black">
          HOST
        </div>
      )}
        </div>
    </div>
);
};

export default Gamer;
