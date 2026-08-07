const ResultPlayer = ({ username, position, points }) => {
  return (
    <div
      className={`flex items-center bg-white border-3 border-neroNonNero shadow-buttons py-2 md:py-5 px-5 font-primary`}
    >
      <div className="flex items-center grow gap-3">
        <span className="text-black/40 text-2xl font-bold mr-6">
          {position}
        </span>
        <img
          className="w-16 md:w-8 md:h-8 rounded-full border-3 border-neroNonNero shadow-buttons md:shadow-none"
          src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`}
          alt={`Avatar di ${username}`}
        />
        <span className="font-bold text-xs md:text-xl mt-3 md:mt-0 uppercase tracking-wide truncate max-w-full text-white md:text-black">
          {username}
        </span>
      </div>
      <span className="text-terziary text-xl font-normal mr-6">
        {points} PTS
      </span>
    </div>
  );
};

export default ResultPlayer;
