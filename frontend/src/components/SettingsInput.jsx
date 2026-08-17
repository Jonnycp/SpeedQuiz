import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import RangeSlider from "./RangeSlider";

const SettingsInput = ({
  label,
  name,
  type = "number",
  disabled = false,
  minValue = 0,
  maxValue = 10,
  value,
  onChange,
}) => {

  const [instantRangeValue, setInstantRangeValue] = useState(value);

  //* Aggiornamento se value cambia da esterno
  useEffect(() => {
    setInstantRangeValue(value);
  }, [value]);

  //* Debouncer per range slider
  useEffect(() => {
    if (instantRangeValue === value) return;

    const timer = setTimeout(() => {
      onChange(instantRangeValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [instantRangeValue]);

  return (
    <div className="flex flex-col basis-1/2">
      <label className="whitespace-nowrap text-center select-none" htmlFor={name}>
        {label}
        {type === "range" && (
          <span className="font-normal text-sm inline-block w-14 pl-2"> ({instantRangeValue} SEC)</span>
        )}
      </label>
      
      <div className={`flex w-full ${disabled ? 'justify-center' : 'justify-between'}`}>
        {type == "number" && !disabled && (
          <button
            type="button"
            className="bg-white px-2 py-2 text-xl border-2 border-neroNonNero cursor-pointer"
            disabled={disabled}
            onClick={(e) => onChange(Math.max(value - 1, minValue))}
          >
            <Icon icon="mdi:minus" />
          </button>
        )}
        {type == "range" ? (
          <RangeSlider
            name={name}
            min={minValue}
            max={maxValue}
            value={instantRangeValue}
            disabled={disabled}
            onChange={setInstantRangeValue}
          />
        ) : type === "checkbox" ? (
          <button
            type="button"
            onClick={() => onChange(!value)}
            disabled={disabled}
            className={`w-full disabled:cursor-not-allowed flex items-center justify-center py-2 text-sm md:text-base font-black uppercase border-2 border-neroNonNero cursor-pointer transition-colors duration-300 shadow-buttons disabled:shadow-buttons disabled:translate-0 active:translate-y-1 active:translate-x-1 active:shadow-none ${
              value 
                ? "bg-verdinoCarino text-black"
                : "bg-[#E53935] text-white"
            }`}
          >
            <div className="flex items-center gap-1 md:gap-2 w-24 md:w-30 justify-center">
              <Icon icon={value ? "mdi:earth" : "mdi:lock"} className="text-xl shrink-0" />
                {value ? "Pubblica" : "Privata"}
            </div>
          </button>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            min={minValue}
            max={maxValue}
            value={value}
            onChange={(e) =>
              onChange(e.target.value === "" ? "" : Math.max(minValue, Math.min(maxValue, e.target.value)))
            }
            className="text-center w-fit text-2xl focus:outline-none 
            [&::-webkit-inner-spin-button]:appearance-none"
          />
          /* apparence:none su webkit serve per eliminare la scrollbar dell'input inserita dal browser*/
        )}
        {type == "number" && !disabled && (
          <button
          type="button"
            className="bg-white px-2 py-2 text-xl border-2 border-neroNonNero cursor-pointer"
            onClick={() => onChange(Math.min(value + 1, maxValue))}
          >
            <Icon icon="mdi:plus" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsInput;
