interface Props {
  children: React.ReactNode;
}

export default function CommandShortcut({ children }: Props) {
  return (
    <kbd className="pointer-events-none hidden h-4 w-fit select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium opacity-100 sm:flex">
      {children}
    </kbd>
  );
}
