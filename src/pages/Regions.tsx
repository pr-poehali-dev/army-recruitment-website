import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Icon from "@/components/ui/icon";
import { REGIONS } from "@/data/constants";

export default function Regions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">Раздел 01</div>
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">Регионы</h1>
            <p className="mt-6 font-body text-foreground/60 max-w-xl text-sm leading-relaxed">
              Подбор места прохождения службы с учётом вашего места жительства и специализации.
              Пункты отбора работают в каждом федеральном округе.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(var(--gold)/0.08)]">
            {REGIONS.map((r) => (
              <div
                key={r.name}
                onClick={() => navigate("/contacts")}
                className="bg-card p-6 hover:bg-[hsl(var(--gold)/0.05)] transition-colors group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 border border-[hsl(var(--gold)/0.3)] flex items-center justify-center group-hover:border-[hsl(var(--gold)/0.7)] transition-colors">
                    <Icon name={r.icon} fallback="MapPin" size={18} className="text-[hsl(var(--gold)/0.7)]" />
                  </div>
                  <span className="font-body text-xs text-foreground/30 tracking-wide">{r.slots} мест</span>
                </div>
                <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-[hsl(var(--gold))] transition-colors">
                  {r.name}
                </h3>
                <div className="mt-2 font-body text-xs text-foreground/40">Расстояние: {r.distance}</div>
                <div className="mt-4 flex items-center gap-1 text-[hsl(var(--gold)/0.6)] text-xs font-body group-hover:text-[hsl(var(--gold))] transition-colors">
                  Подать заявку <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
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
