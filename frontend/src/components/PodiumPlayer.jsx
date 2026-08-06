const PodiumPlayer = ({ position, username, points }) => {

    const transformClasses = {
        1: "translate-y-[-60px] rotate-1",
        2: "translate-y-[0px] -rotate-1",
        3: "translate-y-[50px] -rotate-2",
    };

    const colorPosition = {
        1: "bg-secondary",
        2: "bg-primary",
        3: "bg-terziary",
    };

  return (
    <div className={`relative grow flex flex-col uppercase w-fit p-4 px-8 text-2xl items-center justify-center bg-white shadow-buttons border-3 border-neroNonNero font-bold font-primary ${transformClasses[position] || ""}`}>
      <span className={`absolute -top-6 ${colorPosition[position] || ""} rounded-full border-3 w-12 h-12 flex items-center justify-center border-neroNonNero shadow-buttons`}>
        {position}
      </span>
      {position == 1 && (
        <span className="absolute -top-5 -right-10 rotate-10 text-sm font-bold bg-secondary py-2 px-3 shadow-buttons border-3 border-neroNonNero text-black">
          Vincitore
        </span>
      )}
      <img
        src={`https://api.dicebear.com/10.x/critters/svg?tags=animation&seed=${username}`}
        alt={`Avatar di ${username}`}
        className="w-20 rounded-full border-3 border-neroNonNero mb-3 mt-6"
      />
      <span className="truncate max-w-48 text-center"> {username} </span>
      <span className="text-terziary text-xl"> {points} PTS </span>
    </div>
  );
};

export default PodiumPlayer;
