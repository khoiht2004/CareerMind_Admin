import { useEffect } from "react";
import { Eye, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PaginationControl from "@/components/shared/Pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminPosts } from "@/hooks/useAdminPosts";
import PostFormDialog from "./PostFormDialog";

function PostTable({ search, category, status }) {
  const {
    posts,
    total,
    totalPages,
    page,
    setPage,
    isFetching,
    dialogOpen,
    setDialogOpen,
    editId,
    form,
    isLoadingDetail,
    isSaving,
    updatingPublished,
    deleteTarget,
    setDeleteTarget,
    deleting,
    openCreate,
    openEdit,
    applyDetailToForm,
    handleChange,
    handleSubmit,
    handleTogglePublished,
    handleDelete,
  } = useAdminPosts({ search, category, status });

  useEffect(() => {
    applyDetailToForm();
  }, [applyDetailToForm]);

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Tạo bài viết
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[940px]">
          <TableHeader>
            <TableRow>
              <TableHead>Bài viết</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Lượt xem</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-10 text-center"
                >
                  Không có bài viết nào
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => {
                const author =
                  post.author?.profile?.fullName ??
                  post.authorName ??
                  post.author?.email ??
                  "SRA Editorial";
                return (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="line-clamp-1 text-sm font-medium">
                          {post.title}
                        </p>
                        <p className="text-muted-foreground line-clamp-1 text-xs">
                          {post.excerpt}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {post.category || "Career"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{author}</p>
                        <p className="text-muted-foreground text-xs">
                          {post.author?.company?.name ||
                            post.author?.role ||
                            "ADMIN"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {post.viewCount ?? 0}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={post.isPublished}
                          disabled={updatingPublished}
                          onCheckedChange={() => handleTogglePublished(post)}
                        />
                        <span className="text-xs">
                          {post.isPublished ? "Công khai" : "Nháp"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          asChild
                        >
                          <a
                            href={`/post/${post.id}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Eye className="size-4" />
                          </a>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => openEdit(post)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive size-8"
                          onClick={() => setDeleteTarget(post)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControl
        page={page}
        totalPages={totalPages}
        total={total}
        itemLabel="bài viết"
        onPageChange={setPage}
      />

      <PostFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editId={editId}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSaving={isSaving}
        isLoadingDetail={isLoadingDetail}
      />

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa bài viết?</AlertDialogTitle>
            <AlertDialogDescription>
              Bài viết "{deleteTarget?.title}" sẽ bị xóa khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PostTable;
