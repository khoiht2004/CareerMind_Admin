import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function SectionHeader({ label, isCollapsed, open, onToggle }) {
  if (isCollapsed) return null;

  return (
    <button
      onClick={onToggle}
      className="mt-3 mb-1 flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-0.5 transition-colors hover:bg-sidebar-accent"
    >
      <span className="text-sidebar-foreground/60 text-[11px] font-semibold tracking-widest uppercase">
        {label}
      </span>
      <ChevronDown
        className={cn(
          "text-sidebar-foreground/50 size-3 transition-transform duration-200",
          !open && "-rotate-90",
        )}
      />
    </button>
  );
}

export default SectionHeader;
