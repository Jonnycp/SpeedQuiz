import { Icon } from "@iconify/react";

const SettingsInput = ({
  label,
  name,
  type = "number",
}) => {
  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={name}>{label}</label>
      <div className="flex gap-2">
        <button className="bg-white px-2 py-2 shadowbuttons border-3 border-neroNonNero">
          <Icon icon="mdi:plus" />
        </button>
        <input
          type={type}
          id={name}
          name={name}
          min="1"
          max="10"
          defaultValue={3}
        />
        <button className="bg-white px-2 py-2 shadowbuttons border-3 border-neroNonNero">
          <Icon icon="mdi:minus" />
        </button>
      </div>
    </div>
  );
};

export default SettingsInput;
