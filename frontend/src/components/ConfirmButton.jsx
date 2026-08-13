const ConfirmButton = ({ children, onClick, type, disabled, customClasses, color}) => {

  const colorVariants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-black",
    verdinoCarino: "bg-verdinoCarino text-black",
    terziary: "bg-terziary text-white",
    red: "bg-red-600 text-white",
    gray: "bg-gray-300 text-black"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-black px-6 py-2 uppercase border-3 border-neroNonNero transition-all duration-300 
        ${disabled 
          ? "bg-gray-400 text-white opacity-80 cursor-not-allowed shadow-buttons" 
          : `${colorVariants[color]} shadow-buttons cursor-pointer hover:scale-95 hover:brightness-95 active:translate-y-1 active:translate-x-1 active:shadow-none`
        } 
        ${customClasses || ""}
      `}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;