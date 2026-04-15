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
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">{title}</p>
          <div className="flex items-center gap-1">
            <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
              <Icon className="size-5" />
            </div>
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
