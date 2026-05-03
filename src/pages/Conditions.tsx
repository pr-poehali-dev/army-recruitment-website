import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";
import { CONDITIONS } from "@/data/constants";

export default function Conditions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">Раздел 02</div>
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">Условия службы</h1>
            <p className="mt-6 font-body text-foreground/60 max-w-xl text-sm leading-relaxed">
              Государство гарантирует полный социальный пакет, достойное вознаграждение
              и поддержку на всём сроке прохождения службы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONDITIONS.map((c) => (
              <div
                key={c.title}
                className="border border-[hsl(var(--border))] p-6 hover:border-[hsl(var(--gold)/0.4)] transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-[hsl(var(--gold)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--gold)/0.15)] transition-colors">
                    <Icon name={c.icon} fallback="Shield" size={17} className="text-[hsl(var(--gold))]" />
                  </div>
                  <h3 className="font-display text-sm tracking-wider uppercase text-foreground/80">{c.title}</h3>
                </div>
                <div className="font-display text-2xl text-[hsl(var(--gold))] mb-2">{c.value}</div>
                <p className="font-body text-xs text-foreground/50 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate("/contacts")}
              className="inline-flex items-center gap-2 bg-[hsl(var(--crimson))] text-white font-display text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-[hsl(0,65%,28%)] transition-colors"
            >
              <Icon name="FileSignature" size={16} />
              Заключить контракт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
