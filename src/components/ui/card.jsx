import * as React from "react"

export const Card = ({ className, ...props }) => (
  <div className={`rounded-xl border border-zinc-800 bg-zinc-950 text-white shadow-md ${className}`} {...props} />
)
export const CardHeader = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)
export const CardTitle = ({ className, ...props }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props} />
)
export const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)
