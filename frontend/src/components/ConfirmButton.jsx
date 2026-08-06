const ConfirmButton = ({ content, onClick, color, text_color}) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full mt-4 md:-rotate-1 ${color || "bg-verdinoCarino"} border-3 border-neroNonNero shadow-buttons py-4 md:py-5 text-1xl md:text-4xl font-black uppercase ${text_color || "text-black"} hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer`}
    >
      {content}
    </button>
  );
};

export default ConfirmButton;