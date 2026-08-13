const RangeSlider = ({ min, max, value, onChange, name }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="mt-2 w-full h-4 bg-white rounded-md border-3 border-neroNonNero relative">
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20 top-0 left-0"
        />
        {/* tondino custom */}
        <div
          className="bg-primary w-8 h-5 absolute -top-1.25 border-3 border-neroNonNero rounded-md -translate-x-1/2 z-10"
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        ></div>

        {/* track custom */}
        <div
          className="bg-primary h-full absolute top-0 left-0 z-0"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-2 font-normal text-sm select-none">
        <span>{min}SEC</span>
        <span>{max}SEC</span>
      </div>
    </div>
  );
};

export default RangeSlider;
