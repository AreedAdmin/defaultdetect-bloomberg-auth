import { useFormContext } from "@/contexts/FormContext";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export const LastSavedIndicator = () => {
  const { lastSaved } = useFormContext();
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      setTimeAgo(formatDistanceToNow(lastSaved, { addSuffix: true }));
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [lastSaved]);

  if (!lastSaved) return null;

  return (
    <span className="text-xs text-muted-foreground">
      Last saved: {timeAgo}
    </span>
  );
};
