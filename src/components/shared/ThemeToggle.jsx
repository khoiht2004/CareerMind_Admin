import { Sun, Moon, Monitor, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const THEME_OPTIONS = [
  { value: "light", Icon: Sun, label: "Sáng" },
  { value: "dark", Icon: Moon, label: "Tối" },
  { value: "system", Icon: Monitor, label: "Theo hệ thống" },
];

function ThemeToggle({ isCollapsed }) {
  const { mode, setMode } = useTheme();

  return (
    <div
      className={cn(
        "mt-1 border-t border-zinc-800 pt-2 pb-1",
        isCollapsed ? "px-1" : "px-2",
      )}
    >
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex w-full cursor-pointer items-center rounded-lg py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100",
                  isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                )}
              >
                <Menu className="size-4 shrink-0" />
                {!isCollapsed && "Giao diện"}
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">Giao diện</TooltipContent>
          )}
        </Tooltip>

        <PopoverContent
          side="top"
          align="start"
          sideOffset={8}
          className="w-52 border-zinc-800 bg-zinc-950 p-2"
        >
          <p className="mb-2 px-2 text-[11px] font-semibold tracking-widest text-zinc-500 uppercase">
            Giao diện
          </p>
          <div className="space-y-0.5">
            {
              // eslint-disable-next-line no-unused-vars
              THEME_OPTIONS.map(({ value, Icon, label }) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    mode === value
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                  {mode === value && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </button>
              ))
            }
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ThemeToggle;
