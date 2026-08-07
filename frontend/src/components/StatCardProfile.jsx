const StatCardProfile = ({ value, label, bgColor, rotation }) => (
  <div className={`flex flex-col items-center justify-center p-2 md:p-4 border-3 border-neroNonNero shadow-[4px_4px_0_0_#000] ${bgColor} ${rotation} w-full min-w-[80px] md:w-28 md:h-24 text-center hover:-translate-y-1 transition-transform`}>
    <span className="font-black text-xl md:text-2xl text-black">{value}</span>
        {label && (
        <span className="font-bold text-[10px] md:text-xs uppercase text-black">{label}</span>
        )}
  </div>
);

export default StatCardProfile;