import { formatDistanceToNow } from "date-fns";

export function timeAgo(date: string | null) {
  if (!date) return "Not analyzed";

  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}