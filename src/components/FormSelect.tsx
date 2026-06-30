import type { SelectHTMLAttributes } from "react";

export const formSelectClassName =
  "w-full appearance-none rounded-lg border border-slate-600/90 bg-slate-950/80 py-2.5 pl-3.5 pr-11 text-sm text-slate-100 shadow-sm outline-none transition-[border-color,box-shadow,background-color] hover:border-slate-500 hover:bg-slate-900 focus:border-brand-400 focus:bg-slate-900 focus:ring-2 focus:ring-brand-500/25 disabled:cursor-not-allowed disabled:opacity-60";

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  wrapperClassName?: string;
};

export function FormSelect({ className, wrapperClassName, children, ...props }: FormSelectProps) {
  return (
    <div className={`group relative ${wrapperClassName ?? ""}`}>
      <select className={`${formSelectClassName}${className ? ` ${className}` : ""}`} {...props}>
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-px right-px flex w-9 items-center justify-center rounded-r-[0.45rem] border-l border-slate-700/70 bg-slate-900/60 text-slate-400 transition-colors group-hover:text-slate-300 group-focus-within:border-brand-400/30 group-focus-within:bg-brand-500/5 group-focus-within:text-brand-400"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </span>
    </div>
  );
}
