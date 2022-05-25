import React from "react"
import cn from "classnames"

export default function Block({ className, classNameTitle, title, children }: Props) {
  return (
    <div className={cn(
      className,
      "bg-neutral-100 py-2 px-4 m-2",
      "rounded shadow-sm"
    )}>
      {title && (
        <h2 className={cn(
          classNameTitle,
          "text-gray-800 text-xl font-bold my-1 mx-2",
          "decoration-dashed underline decoration-cyan-500"
        )}>
          {title}
        </h2>
      )}
      <div className="max-h-56 overflow-auto">
        {children}
      </div>
    </div>
  );
}

Block.defaultProps = {
  className: "",
  title: "",
}

type Props = {
  className?: string;
  classNameTitle?: string;
  title: string;
  children: React.ReactNode;
}