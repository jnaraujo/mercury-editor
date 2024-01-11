import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

interface Props extends HtmlHTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export default function CommandShortcut({
  children,
  className,
  ...rest
}: Props) {
  return (
    <kbd
      className={cn(
        "pointer-events-none hidden h-4 w-fit select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium opacity-100 sm:flex",
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}
