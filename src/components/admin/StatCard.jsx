import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MoreVertical, Pencil, Trash2 } from "lucide-react";

// eslint-disable-next-line no-unused-vars
function StatCard({ title, value, icon: Icon, desc }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">{title}</p>
          <div className="flex items-center gap-1">
            <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-lg">
              <Icon className="size-4" />
            </div>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <Pencil className="size-4" />
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer gap-2">
                  <Trash2 className="size-4" />
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="inline-flex items-center text-xs font-medium text-green-600">
            <ArrowUpRight className="size-3.5" />
          </span>
          <span className="text-muted-foreground text-xs">{desc}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
