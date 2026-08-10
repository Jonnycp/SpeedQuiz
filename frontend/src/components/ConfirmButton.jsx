const ConfirmButton = ({ content, onClick, type, disabled, customClasses, bgColor, textColor}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        text-${textColor} font-black px-6 py-2 uppercase border-3 border-neroNonNero transition-all duration-300 
        ${disabled 
          ? "bg-gray-400 opacity-80 cursor-not-allowed shadow-[4px_4px_0_0_#000]" 
          : `bg-${bgColor} shadow-buttons cursor-pointer hover:bg-${bgColor}-700 hover:scale-95 active:translate-y-1 active:translate-x-1 active:shadow-none`
        } 
        ${customClasses}
      `}
    >
      {content}
    </button>
  );
};

export default ConfirmButton;