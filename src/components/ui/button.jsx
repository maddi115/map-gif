import * as React from "react"

export const Button = React.forwardRef(({ className, variant, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
    ghost: "hover:bg-zinc-800 text-zinc-400 hover:text-white"
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      {...props}
    />
  )
})
Button.displayName = "Button"
