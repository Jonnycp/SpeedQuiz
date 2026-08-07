const QuestionCard = ({domanda}) => {
  return (
    <div className="flex flex-col items-center px-4 gap-6 w-full max-w-2xl mx-auto">
      <div className="relative w-full bg-white shadow-buttons border-3 border-neroNonNero px-6 py-6 md:px-17 md:py-8 rounded-2xl select-none">
        <h2 className="text-lg md:text-3xl font-extrabold text-center">
          {domanda}
        </h2>
        <p className="absolute uppercase -top-5 -left-10 bg-[#FFDF9A] shadow-buttons text-xs px-3 py-1 font-bold -rotate-2 select-none md:text-base">
          domanda flash
        </p>
        <p className="absolute uppercase -bottom-3 -right-2 bg-[#C4C0FF] shadow-buttons text-xs px-3 py-1 rotate-3 text-[#2100A4] font-bold select-none md:text-base">
          non mentire!
        </p>
      </div>
    </div>
  );
};
export default QuestionCard;

// mx-30 nel primo div al posto di max-w-2xl mx-auto
// w-[80%] nel form
