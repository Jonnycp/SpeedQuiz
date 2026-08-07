import { useState, useEffect } from "react";

const TimeSlider = ({ tempoIniziale = 45 }) => {
  const [tempoRimanente, setTempoRimanente] = useState(tempoIniziale);


  useEffect(() => {
    if (tempoRimanente <= 0) return;
    const timerId = setInterval(() => {
      setTempoRimanente((tempoRimasto) => tempoRimasto - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [tempoRimanente]);

  const percentualeBarra = (tempoRimanente / tempoIniziale) * 100;

  return (
    <div className="flex flex-col items-center gap-3 w-[92%] md:w-full max-w-3xl mx-auto my-6 font-primary relative z-10">
      <div className="w-full h-6 md:h-8 bg-white border-3 border-neroNonNero rounded-full shadow-buttons overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${percentualeBarra}%` }}
        ></div>
      </div>

      <div className="bg-neroNonNero text-white font-black text-sm md:text-base uppercase px-6 py-1.5 rounded-full min-w-35 text-center">
        {tempoRimanente} secondi RIMASTI
      </div>
      
    </div>
  );
};

export default TimeSlider;