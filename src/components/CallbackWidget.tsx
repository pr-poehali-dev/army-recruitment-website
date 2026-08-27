import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { SUBMIT_URL } from "@/data/constants";
import { trackGoal } from "@/lib/analytics";

export default function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const openWidget = () => {
    trackGoal("callback_open");
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!name || !phone) return;
    setStatus("loading");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          region: "Не указан",
          comment: "Запрос обратного звонка",
          source: "callback_widget",
        }),
      });
      if (res.ok) {
        setStatus("success");
        trackGoal("form_submit", { source: "callback_widget" });
        setName("");
        setPhone("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) setStatus("idle");
  };

  return (
    <>
      <button
        onClick={openWidget}
        aria-label="Заказать обратный звонок"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[hsl(var(--crimson))] text-white font-display text-xs tracking-[0.1em] uppercase px-5 py-4 rounded-full shadow-xl hover:bg-[hsl(0,65%,28%)] hover:scale-105 transition-all duration-200"
      >
        <Icon name="PhoneCall" size={18} />
        <span className="hidden sm:inline">Перезвоните мне</span>
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="border-[hsl(var(--border))] bg-background max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-xl tracking-wide uppercase text-foreground">
              Закажите звонок
            </DialogTitle>
          </DialogHeader>

          {status === "success" ? (
            <div className="py-6 text-center">
              <Icon name="CheckCircle2" size={40} className="text-[hsl(var(--gold))] mx-auto mb-3" />
              <p className="font-body text-sm text-foreground/70">
                Заявка принята. Мы перезвоним вам в течение часа.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="font-body text-sm text-foreground/50">
                Оставьте номер — наш специалист перезвонит и ответит на все вопросы.
              </p>
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван"
                  className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={status === "loading" || !name || !phone}
                className="w-full flex items-center justify-center gap-2 bg-[hsl(var(--crimson))] text-white font-display text-sm tracking-[0.15em] uppercase py-3.5 hover:bg-[hsl(0,65%,28%)] transition-colors disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Icon name="Loader2" size={16} className="animate-spin" />
                ) : (
                  <Icon name="PhoneCall" size={16} />
                )}
                Жду звонка
              </button>
              {status === "error" && (
                <p className="text-xs text-red-500 text-center">Ошибка отправки. Попробуйте ещё раз.</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}