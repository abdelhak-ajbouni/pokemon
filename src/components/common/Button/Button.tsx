import React from "react"
import cn from "classnames"
import { FiRefreshCcw } from "react-icons/fi"

export default function Button({ className, label, type, secondary, loading, disabled, onClick, children }: Props) {

  return (
    <button
      className={cn(
        className,
        "button border rounded py-1 px-2 transition duration-200 ease-in-out cursor-pointer",
        "text-white text-sm hover:bg-blue-400",
        secondary ? "text-gray-500 hover:text-gray-400" : "text-white bg-blue-500",
        loading && "loading",
        disabled && "cursor-not-allowed opacity-60"
      )}
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? <FiRefreshCcw className='animate-spin mx-4' /> : children || label}
    </button>
  );
}

Button.defaultProps = {
  className: "",
  label: '',
  type: 'submit',
  loading: false,
  disabled: false,
  secondary: false,
  onClick: () => { },
  children: null,
}

type Props = {
  className?: string;
  label?: string;
  type?: "submit" | "button" | "reset" | undefined;
  loading?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}