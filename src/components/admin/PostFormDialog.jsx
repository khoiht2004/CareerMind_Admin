import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { POST_CATEGORIES } from "@/config/post.constants";

function PostFormDialog({
  open,
  onOpenChange,
  editId,
  form,
  onChange,
  onSubmit,
  isSaving,
  isLoadingDetail,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {editId ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
          </DialogTitle>
        </DialogHeader>

        {isLoadingDetail ? (
          <div className="flex h-80 items-center justify-center">
            <Loader2 className="text-muted-foreground size-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label>Tiêu đề</Label>
                <Input
                  value={form.title}
                  onChange={(e) => onChange("title", e.target.value)}
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div className="space-y-2">
                <Label>Danh mục</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => onChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POST_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tác giả hiển thị</Label>
                <Input
                  value={form.authorName}
                  onChange={(e) => onChange("authorName", e.target.value)}
                  placeholder="SRA Editorial"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Ảnh bìa URL</Label>
                <Input
                  value={form.coverUrl}
                  onChange={(e) => onChange("coverUrl", e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Mô tả ngắn</Label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => onChange("excerpt", e.target.value)}
                  placeholder="Tóm tắt bài viết"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Nội dung HTML</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => onChange("content", e.target.value)}
                  placeholder="<h2>Tiêu đề mục</h2><p>Nội dung...</p>"
                  className="min-h-56 font-mono text-sm sm:min-h-72"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm">
              <Switch
                checked={form.isPublished}
                onCheckedChange={(checked) => onChange("isPublished", checked)}
              />
              Công khai bài viết
            </label>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Hủy
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSaving || isLoadingDetail}
            className="gap-2"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {editId ? "Lưu thay đổi" : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PostFormDialog;
