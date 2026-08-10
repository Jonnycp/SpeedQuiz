import { useState } from "react";
import { Icon } from "@iconify/react";

const SingleInput = ({
  label,
  type,
  name,
  value,
  minLength,
  maxLength,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 mb-6">
      <label htmlFor={name} className="font-bold uppercase text-black">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={name}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          required
          minLength={minLength}
          onChange={onChange}
          autoComplete={type === "email" ? "email" : "false"}
          className="w-full bg-white px-4 py-3 border-3 shadow-buttons border-neroNonNero placeholder:text-gray-500"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-4 right-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}>
            <Icon icon={showPassword ? "mdi:eye-off" : "mdi-eye"} width={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleInput;
