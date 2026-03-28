import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function SectionHeader({ label, isCollapsed, open, onToggle }) {
  if (isCollapsed) return null;

  return (
    <button
      onClick={onToggle}
      className="mt-3 mb-1 flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-0.5 transition-colors hover:bg-zinc-800/50"
    >
      <span className="text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">
        {label}
      </span>
      <ChevronDown
        className={cn(
          "size-3 text-zinc-600 transition-transform duration-200",
          !open && "-rotate-90",
        )}
      />
    </button>
  );
}

export default SectionHeader;
