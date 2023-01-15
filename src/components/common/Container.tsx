import React from "react"
import cn from "classnames"
import { IoMdArrowRoundBack } from "react-icons/io"

export default function Container({ className, classNameContent, title, actions, fluid, hasShadow, onGoBack, children }: Props) {
  const hasHeader = title || onGoBack;

  return (
    <div className={cn(
      className,
      "mx-auto my-4",
      fluid ? "container-fluid" : "container",
      hasShadow && "shadow-md shadow-gray-100"
    )}>
      {
        hasHeader && (
          <>
            <div className="flex justify-between items-center my-4 mx-2">
              <div className="flex justify-start items-center ">

                {onGoBack && (
                  <IoMdArrowRoundBack className="bg-neutral-200 p-1 rounded-full mr-4 cursor-pointer" size={28} onClick={onGoBack} />
                )}
                {title && <h2 className="text-neutral-800 text-2xl font-bold">{title}</h2>}
              </div>
              {actions && <div>{actions}</div>}
            </div>
            <hr className="mb-4" />
            <div className={`container-content ${classNameContent} `}>
              {children}
            </div>
          </>
        )
      }
      {
        !hasHeader && (
          children
        )
      }
    </div>
  );
}

Container.defaultProps = {
  className: "",
  classNameContent: "",
  title: "",
  actions: null,
  fluid: false,
  hasShadow: false,
}

type Props = {
  className?: string;
  classNameContent?: string;
  title?: string;
  actions?: React.ReactNode;
  fluid?: boolean;
  hasShadow?: boolean;
  onGoBack?: () => void;
  children: React.ReactNode;
}