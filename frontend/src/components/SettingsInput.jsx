import { useState } from "react";
import { Icon } from "@iconify/react";
import RangeSlider from "./RangeSlider";

const SettingsInput = ({
  label,
  name,
  type = "number",
  minValue = 0,
  maxValue = 10,
}) => {
  const [value, setValue] = useState(minValue);

  return (
    <div className="flex flex-col basis-1/2">
      <label className="whitespace-nowrap text-center select-none" htmlFor={name}>
        {label}
        {type === "range" && (
          <span className="font-normal text-sm"> ({value} SEC)</span>
        )}
      </label>
      <div className="flex w-full justify-between">
        {type == "number" && (
          <button
            className="bg-white px-2 py-2 text-xl border-2 border-neroNonNero"
            onClick={() => setValue(Math.max(value - 1, minValue))}
          >
            <Icon icon="mdi:minus" />
          </button>
        )}
        {type == "range" ? (
          <RangeSlider
            min={minValue}
            max={maxValue}
            value={value}
            onChange={setValue}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            min={minValue}
            max={maxValue}
            value={value}
            onChange={(e) =>
              setValue(Math.max(minValue, Math.min(maxValue, e.target.value)))
            }
            className="text-center w-fit text-2xl focus:outline-none 
            [&::-webkit-inner-spin-button]:appearance-none"
          />
          /* apparence:none su webkit serve per eliminare la scrollbar dell'input inserita dal browser*/
        )}
        {type == "number" && (
          <button
            className="bg-white px-2 py-2 text-xl border-2 border-neroNonNero"
            onClick={() => setValue(Math.min(value + 1, maxValue))}
          >
            <Icon icon="mdi:plus" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsInput;
