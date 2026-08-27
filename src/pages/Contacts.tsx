import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import { REGIONS, SUBMIT_URL } from "@/data/constants";
import { trackGoal } from "@/lib/analytics";

export default function Contacts() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedVacancy, setSelectedVacancy] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!formName || !formPhone) return;
    setFormStatus("loading");
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          region: selectedRegion || "Не указан",
          comment: selectedVacancy ? `Интересует вакансия: ${selectedVacancy}` : "—",
        }),
      });
      if (res.ok) {
        setFormStatus("success");
        trackGoal("form_submit", { source: "contacts" });
        setFormName("");
        setFormPhone("");
        setSelectedRegion("");
        setSelectedVacancy("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">Раздел 05</div>
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">Контакты</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[hsl(var(--gold)/0.3)] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="Phone" size={17} className="text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <a href="tel:+79951819808" className="font-display text-lg text-foreground hover:text-[hsl(var(--gold))] transition-colors">
                    +7 (995) 181-98-08
                  </a>
                  <div className="font-body text-xs text-foreground/40 mt-1">Круглосуточно, звонок бесплатный</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[hsl(var(--gold)/0.3)] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="MapPin" size={17} className="text-[hsl(var(--gold))]" />
                </div>
                <div>
                  <div className="font-display text-xs tracking-[0.2em] uppercase text-foreground/40 mb-1">Ближайший пункт отбора</div>
                  <div className="font-display text-lg text-foreground">Москва, Яблочкова 5с1</div>
                  <div className="font-body text-xs text-foreground/40 mt-1">Пн–Пт: 09:00–18:00</div>
                </div>
              </div>

              <div>
                <div className="font-display text-xs tracking-[0.2em] uppercase text-foreground/40 mb-4">Написать нам</div>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href="https://wa.me/79951819808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-[hsl(var(--border))] hover:border-green-500 hover:text-green-600 transition-colors font-display text-xs tracking-widest uppercase"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-500"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.557 4.12 1.527 5.849L.057 23.885l6.194-1.624A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.51-5.17-1.396l-.37-.22-3.679.964.981-3.595-.242-.371A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                    WhatsApp
                  </a>
                  <a
                    href="https://t.me/+79951819808"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-[hsl(var(--border))] hover:border-blue-500 hover:text-blue-500 transition-colors font-display text-xs tracking-widest uppercase"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    Telegram
                  </a>
                  <a
                    href="https://max.ru/u/f9LHodD0cOIIyYiwmnZu0a2CT7U6lopbFOLuBJ_lLVT5MIVSUsKT1YvH3yY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-[hsl(var(--border))] hover:border-purple-500 hover:text-purple-500 transition-colors font-display text-xs tracking-widest uppercase"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-purple-500"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                    MAX
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-[hsl(var(--border))] p-8">
              <h3 className="font-display text-xl tracking-wide uppercase mb-6 text-foreground">Оставить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Фамилия, Имя, Отчество
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Иванов Иван Иванович"
                    className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Регион
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground/70 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors appearance-none"
                  >
                    <option value="">Выберите регион</option>
                    {REGIONS.map((r) => (
                      <option key={r.name} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Комментарий
                  </label>
                  <textarea
                    rows={3}
                    value={selectedVacancy}
                    onChange={(e) => setSelectedVacancy(e.target.value)}
                    placeholder="Ваш вопрос или пожелание..."
                    className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors resize-none"
                  />
                </div>

                {formStatus === "success" ? (
                  <div className="border border-green-500/30 bg-green-500/5 px-4 py-3 text-center">
                    <div className="font-display text-sm tracking-wide text-green-600">Заявка отправлена</div>
                    <div className="font-body text-xs text-foreground/40 mt-1">Мы свяжемся с вами в ближайшее время</div>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus === "loading" || !formName || !formPhone}
                    className="w-full bg-[hsl(var(--crimson))] text-white font-display text-sm tracking-[0.15em] uppercase py-4 hover:bg-[hsl(0,65%,28%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "loading" ? "Отправка..." : "Отправить заявку"}
                  </button>
                )}

                {formStatus === "error" && (
                  <div className="font-body text-xs text-red-500 text-center">
                    Ошибка отправки. Попробуйте позвонить напрямую.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}