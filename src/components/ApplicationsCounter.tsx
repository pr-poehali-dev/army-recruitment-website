import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { SUBMIT_URL } from "@/data/constants";

export default function ApplicationsCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${SUBMIT_URL}?action=stats`)
      .then((res) => res.json())
      .then((data) => setCount(data.today ?? null))
      .catch(() => setCount(null));
  }, []);

  if (!count || count <= 0) return null;

  return (
    <div className="flex items-center gap-2 font-body text-xs text-foreground/60 animate-fade-in-up">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <Icon name="Users" size={14} className="text-[hsl(var(--gold))]" />
      Сегодня заявку уже подали:{" "}
      <span className="text-[hsl(var(--gold))] font-semibold">{count} человек</span>
    </div>
  );
}
