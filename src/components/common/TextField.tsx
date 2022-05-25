import React, { useRef } from "react"
import { AiOutlineSearch } from "react-icons/ai";
import cn from "classnames";

export default function TextField({ className, classNameInput, label, placeholder, type, value, onChange, onClick }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={cn(className, "flex border")}>
      <input
        className={cn(
          classNameInput,
          "text-gray-700 border-gray-300 p-2 appearance-none w-full leading-tight",
          "focus:outline-none focus:border-blue-900",
          "active:outline-none active:border-blue-900",
        )}
        placeholder={placeholder || label}
        aria-label={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            onClick?.(inputRef?.current?.value)
          }
        }}
      />
      {
        onClick && (
          <div
            className="bg-neutral-800 text-white p-2 cursor-pointer hover:bg-blue-700 flex items-center"
            onClick={() => onClick(inputRef?.current?.value)}
          >
            <AiOutlineSearch />
          </div>
        )
      }

    </div>);
}

TextField.defaultProps = {
  className: "",
  classNameInput: "",
  label: '',
  placeholder: '',
  type: 'text',
  value: '',
  onChange: () => { },
  onClick: null
}

type Props = {
  className?: string,
  classNameInput?: string,
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onClick?: (value: string | undefined) => void;
}
