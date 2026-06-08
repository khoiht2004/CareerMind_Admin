import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Shared Pagination component dùng chung trong Admin
 *
 * Props:
 * - page         : number  — trang hiện tại
 * - totalPages   : number  — tổng số trang
 * - total?       : number  — tổng số items (hiển thị text info nếu truyền vào)
 * - itemLabel?   : string  — nhãn đơn vị, vd: "người dùng", "bài đăng"
 * - onPageChange : (page: number) => void
 */
function PaginationControl({
  page,
  totalPages,
  total,
  itemLabel = "bản ghi",
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Text info (optional) */}
      {total !== undefined ? (
        <span className="text-muted-foreground">
          Trang {page} / {totalPages} — {total} {itemLabel}
        </span>
      ) : (
        <span className="text-muted-foreground">
          Trang {page} / {totalPages}
        </span>
      )}

      {/* Prev / Next */}
      <Pagination className="mx-0 w-fit">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationControl;
