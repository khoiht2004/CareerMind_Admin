import { useCallback, useState } from "react";
import { toast } from "sonner";
import { EMPTY_ADMIN_POST_FORM } from "@/config/post.constants";
import {
  useCreateAdminPostMutation,
  useDeleteAdminPostMutation,
  useGetAdminPostByIdQuery,
  useGetAdminPostsQuery,
  useUpdateAdminPostMutation,
  useUpdateAdminPostPublishedMutation,
} from "@/services/admin.service";

const PAGE_SIZE = 10;

export function useAdminPosts({ search, category, status }) {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_ADMIN_POST_FORM);

  const { data, isFetching } = useGetAdminPostsQuery({
    page,
    limit: PAGE_SIZE,
    search,
    category,
    status,
  });
  const { data: detailData, isFetching: isLoadingDetail } =
    useGetAdminPostByIdQuery(editId, { skip: !editId });
  const [createPost, { isLoading: creating }] = useCreateAdminPostMutation();
  const [updatePost, { isLoading: updating }] = useUpdateAdminPostMutation();
  const [updatePublished, { isLoading: updatingPublished }] =
    useUpdateAdminPostPublishedMutation();
  const [deletePost, { isLoading: deleting }] = useDeleteAdminPostMutation();

  const responseData = data?.data;
  const posts = responseData?.data ?? [];
  const total = responseData?.total ?? 0;
  const totalPages = responseData?.totalPages ?? 1;

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY_ADMIN_POST_FORM);
    setDialogOpen(true);
  };

  const openEdit = (post) => {
    setEditId(post.id);
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverUrl: post.coverUrl || "",
      category: post.category || EMPTY_ADMIN_POST_FORM.category,
      authorName: post.authorName || "",
      isPublished: Boolean(post.isPublished),
      contentFormat: post.contentFormat || "HTML",
    });
    setDialogOpen(true);
  };

  const applyDetailToForm = useCallback(() => {
    const post = detailData?.data;
    if (!post) return;
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverUrl: post.coverUrl || "",
      category: post.category || EMPTY_ADMIN_POST_FORM.category,
      authorName: post.authorName || "",
      isPublished: Boolean(post.isPublished),
      contentFormat: post.contentFormat || "HTML",
    });
  }, [detailData?.data]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updatePost({ id: editId, ...form }).unwrap();
        toast.success("Đã cập nhật bài viết");
      } else {
        await createPost(form).unwrap();
        toast.success("Đã tạo bài viết");
      }
      setDialogOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Không thể lưu bài viết");
    }
  };

  const handleTogglePublished = async (post) => {
    try {
      await updatePublished({
        id: post.id,
        isPublished: !post.isPublished,
      }).unwrap();
      toast.success("Đã cập nhật trạng thái bài viết");
    } catch {
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(deleteTarget.id).unwrap();
      toast.success("Đã xóa bài viết");
      setDeleteTarget(null);
    } catch {
      toast.error("Không thể xóa bài viết");
    }
  };

  return {
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
    isSaving: creating || updating,
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
  };
}
