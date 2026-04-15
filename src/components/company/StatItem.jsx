/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";

function StatItem({ icon: Icon, label, value, sub }) {
  return (
    <Card className="flex flex-col gap-1">
      <CardContent className="flex items-start gap-1.5 md:gap-3 lg:px-4 lg:py-0">
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg md:size-13">
          <Icon className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-xs md:text-sm">{label}</p>
          <p className="text-xl font-bold">{value ?? "—"}</p>
        </div>
      </CardContent>
      <CardContent className="lg:px-4">
        {sub && <p className="text-muted-foreground mt-0.5 text-xs">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default StatItem;
