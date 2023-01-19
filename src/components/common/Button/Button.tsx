import React from "react"
import cn from "classnames"
import { AiOutlineLoading } from "react-icons/ai"

export default function Button({ className, label, type, secondary, loading, disabled, onClick, children }: Props) {

  return (
    <button
      className={cn(
        className,
        "button py-1 px-2 border rounded transition duration-200 ease-in-out cursor-pointer",
        "text-sm hover:bg-blue-400",
        secondary ? "text-blue-500 border-blue-500 hover:text-white" : "text-white bg-blue-500 ",
        loading && "loading",
        disabled && "cursor-not-allowed opacity-60"
      )}
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      data-testid='button'
      aria-label="button"
    >
      {loading ? <AiOutlineLoading className='animate-spin mx-4 block' /> : children || label}
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