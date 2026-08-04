const ConfirmButton = ({content}) => {
  return (
    <button className="bg-verdinoCarino border-3 border-neroNonNero px-4 py-2 font-extrabold text-sm md:text-base uppercase text-black shadow-buttons hover:scale-110 transition-all duration-300">
      {content}
    </button>
  );
};

export default ConfirmButton;