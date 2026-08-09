const ConfirmButton = ({ content, onClick, type, disabled, customClasses }) => {

  const defaultClasses = "w-full mt-4 -rotate-1 bg-verdinoCarino py-4 md:py-5 text-xl md:text-4xl text-black";
  const classToUse = customClasses || defaultClasses;

  return (
    <button 
      onClick={onClick}
      type={type}
      className={`border-3 border-neroNonNero shadow-buttons font-black uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer ${classToUse}`}
    >
      {content}
    </button>
  );
};

export default ConfirmButton;