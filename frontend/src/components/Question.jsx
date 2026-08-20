const Question = ({ question, hints }) => {
    if(!hints ||hints.length < 2){
        hints = ["domanda flash", "non mentire!"]
    }

  return (
      <div className="flex flex-col items-center mt-5 px-4 gap-3 w-full mx-auto md:max-w-3xl">
        <div className="relative w-full bg-white shadow-buttons border-3 border-neroNonNero px-6 py-7 md:px-20 md:py-10 rounded-2xl select-none">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center">
            {question.text}
          </h2>
          <p className="absolute uppercase -top-3 md:-top-5 -left-4 bg-[#FFDF9A] shadow-buttons text-xs px-3 py-1 font-bold -rotate-2 select-none md:text-base">
            {hints[0]}
          </p>
          <p className="absolute uppercase -bottom-3 -right-2 bg-[#C4C0FF] shadow-buttons text-xs px-3 py-1 rotate-3 text-[#2100A4] font-bold select-none md:text-base">
            {hints[1]}
          </p>
        </div>
      </div>
  );
};

export default Question;
