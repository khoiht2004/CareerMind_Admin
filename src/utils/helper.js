const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

function parseDate(dateStr) {
  if (!dateStr) return new Date();
  const parts = String(dateStr).split("T")[0].split("-");
  if (parts.length === 3) return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  return new Date(dateStr);
}

/** Format date label theo số ngày của period */
function formatDateLabel(dateStr, days) {
  const d = parseDate(dateStr);
  if (days <= 30) {
    // "25/03"
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  // 90 ngày → "T3/26"
  return `T${d.getMonth() + 1}/${String(d.getFullYear()).slice(2)}`;
}

/** Số tick cách nhau trên XAxis tuỳ period */
function getXAxisInterval(days) {
  if (days <= 7) return 0; // hiện tất cả
  if (days <= 30) return 4; // ~6 mốc
  return 14; // ~6 mốc trong 90 ngày
}

/** YAxis chỉ hiển thị số nguyên */
function intTickFormatter(v) {
  return Number.isInteger(v) ? String(v) : "";
}

export {
  formatTime,
  parseDate,
  formatDateLabel,
  getXAxisInterval,
  intTickFormatter,
};
