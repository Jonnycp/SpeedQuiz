const ResultPlayer = ({ id, username, position, points, className }) => {
  return (
    <div
      className={`flex items-center bg-white border-3 border-neroNonNero shadow-buttons py-2 md:py-5 px-5 font-primary ${className}`}
    >
      <div className="flex items-center grow gap-3">
        <span className="text-black/40 text-2xl font-bold mr-6">
          {position}
        </span>
        <img
          className="w-14 md:w-10 md:h-10 rounded-full border-3 border-neroNonNero shadow-buttons md:shadow-none"
          src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${id}`}
          alt={`Avatar di ${username}`}
        />
        <span className="font-bold text-xl ml-3 uppercase tracking-wide truncate max-w-full md:text-black">
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
