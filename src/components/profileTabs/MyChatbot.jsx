import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MyChatbot() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Cài đặt Chatbot AI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Tùy chỉnh AI trợ lý để nhận được gợi ý việc làm phù hợp hơn với bạn.
        </p>
        <Separator />
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-sm">Lĩnh vực quan tâm</Label>
            <Input placeholder="VD: Frontend, Backend, Data Science..." />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Mức lương mong muốn</Label>
            <Input placeholder="VD: 15 - 25 triệu" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Địa điểm làm việc</Label>
            <Input placeholder="VD: TP. Hồ Chí Minh, Remote..." />
          </div>
          <Button
            size="sm"
            className="h-8 cursor-pointer px-4 py-2.5 text-[14px] font-medium"
            onClick={() => toast.success("Đã lưu cài đặt Chatbot")}
          >
            Lưu cài đặt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default MyChatbot;
