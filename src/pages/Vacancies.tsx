import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import { VACANCIES } from "@/data/constants";

export default function Vacancies() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">Раздел 03</div>
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">Вакансии на СВО</h1>
            <p className="mt-6 font-body text-foreground/60 max-w-xl text-sm leading-relaxed">
              Актуальные должности в зоне специальной военной операции. Отбор осуществляется
              на конкурсной основе с учётом физической подготовки и опыта.
            </p>
          </div>

          <div className="border border-[hsl(var(--border))] overflow-hidden">
            <div className="grid grid-cols-4 bg-[hsl(var(--gold)/0.07)] border-b border-[hsl(var(--border))] px-6 py-3">
              {["Должность", "Категория", "Звание", "Довольствие"].map((h) => (
                <div key={h} className="font-display text-[10px] tracking-[0.2em] uppercase text-foreground/40">{h}</div>
              ))}
            </div>
            {VACANCIES.map((v) => (
              <div
                key={v.role}
                onClick={() => navigate("/contacts")}
                className="grid grid-cols-4 px-6 py-4 items-center hover:bg-[hsl(var(--gold)/0.04)] transition-colors cursor-pointer border-b border-[hsl(var(--border)/0.5)] last:border-0 group"
              >
                <div className="font-display text-sm tracking-wide text-foreground group-hover:text-[hsl(var(--gold))] transition-colors">
                  {v.role}
                </div>
                <div className="font-body text-xs text-foreground/50">{v.category}</div>
                <div className="font-body text-xs text-foreground/40">{v.rank}</div>
                <div className="font-display text-sm text-[hsl(var(--gold)/0.85)]">{v.pay}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/contacts")}
              className="inline-flex items-center gap-2 border border-[hsl(var(--gold)/0.3)] text-[hsl(var(--gold))] font-display text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-[hsl(var(--gold)/0.08)] transition-colors"
            >
              <Icon name="Send" size={14} />
              Подать заявку на вакансию
            </button>
          </div>

          <div className="mt-10 border border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--gold)/0.04)] px-8 py-6 flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 bg-[hsl(var(--gold)/0.12)] flex items-center justify-center mt-0.5">
              <Icon name="FileText" size={18} className="text-[hsl(var(--gold))]" />
            </div>
            <div>
              <div className="font-display text-sm tracking-[0.15em] uppercase text-[hsl(var(--gold))] mb-2">
                Выписываем отношения
              </div>
              <p className="font-body text-sm text-foreground/60 leading-relaxed">
                Помогаем оформить официальные отношения для постановки на воинский учёт,
                получения отсрочки или перевода к новому месту службы. Обращайтесь —
                подготовим необходимые документы в кратчайшие сроки.
              </p>
              <button
                onClick={() => navigate("/contacts")}
                className="mt-4 inline-flex items-center gap-2 text-[hsl(var(--gold))] font-display text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
              >
                Узнать подробнее <Icon name="ArrowRight" size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}