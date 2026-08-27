import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import { VACANCIES } from "@/data/constants";
import { slugify } from "@/lib/slug";
import { trackGoal } from "@/lib/analytics";
import { buildJobPostingSchema, injectJsonLd, removeJsonLd } from "@/lib/jobPostingSchema";

const JSON_LD_ID = "job-posting-schema";

export default function VacancyDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const vacancy = VACANCIES.find((v) => slugify(v.role) === slug);

  useEffect(() => {
    if (vacancy && slug) {
      document.title = `${vacancy.role} — ${vacancy.pay} | Служба по контракту`;
      const url = `https://доброволец-77.рф/vacancies/${slug}`;
      injectJsonLd(JSON_LD_ID, buildJobPostingSchema(vacancy, url));
    }
    return () => removeJsonLd(JSON_LD_ID);
  }, [vacancy, slug]);

  if (!vacancy) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-24 px-6 text-center">
          <p className="font-body text-foreground/60">Вакансия не найдена.</p>
          <button
            onClick={() => navigate("/vacancies")}
            className="mt-6 inline-flex items-center gap-2 text-[hsl(var(--gold))] font-body text-sm"
          >
            <Icon name="ArrowLeft" size={14} /> Ко всем вакансиям
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleApply = () => {
    trackGoal("cta_click", { location: "vacancy_detail", role: vacancy.role });
    navigate("/contacts");
  };

  const related = VACANCIES.filter(
    (v) => v.category === vacancy.category && v.role !== vacancy.role
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/vacancies")}
            className="mb-8 inline-flex items-center gap-2 text-foreground/50 hover:text-[hsl(var(--gold))] font-body text-xs tracking-wide uppercase transition-colors"
          >
            <Icon name="ArrowLeft" size={14} /> Ко всем вакансиям
          </button>

          <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
            {vacancy.category}
          </div>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wide gold-line mb-8">
            {vacancy.role}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[hsl(var(--gold)/0.08)] mb-8 border border-[hsl(var(--border))]">
            <div className="bg-card p-5">
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">Довольствие</div>
              <div className="font-display text-lg text-[hsl(var(--gold))]">{vacancy.pay}</div>
            </div>
            <div className="bg-card p-5">
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">Звание</div>
              <div className="font-display text-lg text-foreground">{vacancy.rank}</div>
            </div>
            <div className="bg-card p-5 col-span-2 sm:col-span-1">
              <div className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">Категория</div>
              <div className="font-display text-base text-foreground">{vacancy.category}</div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="font-display text-lg tracking-wide uppercase text-foreground mb-3">Описание должности</h2>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">{vacancy.desc}</p>
          </div>

          <div className="mb-10 border border-[hsl(var(--border))] p-6">
            <h2 className="font-display text-base tracking-wide uppercase text-foreground mb-4">Условия по данной вакансии</h2>
            <ul className="space-y-3">
              {[
                "Денежное довольствие выплачивается ежемесячно на банковскую карту",
                "Единовременная выплата при заключении контракта — от 2 300 000 ₽",
                "Государственное страхование жизни и здоровья — до 3 000 000 ₽",
                "Бесплатное жильё или компенсация найма жилого помещения",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-foreground/60">
                  <Icon name="Check" size={16} className="text-[hsl(var(--gold))] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center border border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--gold)/0.04)] p-8 mb-10">
            <p className="font-body text-sm text-foreground/60 mb-4">
              Заинтересовала вакансия «{vacancy.role}»?
            </p>
            <button
              onClick={handleApply}
              className="inline-flex items-center gap-2 bg-[hsl(var(--crimson))] text-white font-display text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-[hsl(0,65%,28%)] transition-colors"
            >
              <Icon name="Send" size={16} />
              Подать заявку
            </button>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="font-display text-lg tracking-wide uppercase text-foreground mb-4">
                Похожие вакансии
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[hsl(var(--gold)/0.08)]">
                {related.map((v) => (
                  <div
                    key={v.role}
                    onClick={() => navigate(`/vacancies/${slugify(v.role)}`)}
                    className="bg-card p-5 hover:bg-[hsl(var(--gold)/0.05)] transition-colors group cursor-pointer"
                  >
                    <div className="font-display text-sm text-foreground group-hover:text-[hsl(var(--gold))] transition-colors mb-1">
                      {v.role}
                    </div>
                    <div className="font-body text-xs text-[hsl(var(--gold)/0.8)]">{v.pay}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}