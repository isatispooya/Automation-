import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { fadeIn } from "../Modules/auth/animations/fadeIn";

interface InputLineProps extends HTMLMotionProps<"div"> {
  type?: string;
  placeholder?: string;
  name?: string;
  label: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputBase: React.FC<InputLineProps> = ({
  type = "text",
  label,
  value,
  name,
  onChange,
  disabled,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  ...motionProps
}) => {
  return (
    <motion.div
      {...fadeIn(0.4, -20, 0.4)}
      className="relative mb-3"
      data-twe-input-wrapper-init
      {...motionProps}
    >
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className="peer px-7 w-full bg-gray-100 placeholder:text-slate-400 text-slate-700 text-sm rounded-lg transition duration-300 ease focus:outline-none py-4 focus:border-slate-400 hover:border-slate-300 shadow-inner focus:shadow"
        placeholder=" "
        aria-label={label}
        disabled={disabled}
      />
      <label
        className={`absolute cursor-text px-1 pt-1 right-2.5 text-slate-400 text-sm transition-all transform origin-right
          ${value ? "-top-2 right-2.5 text-xs scale-90" : "top-3"} 
          peer-focus:-top-2 peer-focus:right-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
      >
        {label}
      </label>
    </motion.div>
  );
};

export default InputBase;
