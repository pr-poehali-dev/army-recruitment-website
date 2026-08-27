import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import { NEWS } from "@/data/news";

export default function NewsArticle() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const article = NEWS.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Служба по контракту`;
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-24 px-6 text-center">
          <p className="font-body text-foreground/60">Статья не найдена.</p>
          <button
            onClick={() => navigate("/news")}
            className="mt-6 inline-flex items-center gap-2 text-[hsl(var(--gold))] font-body text-sm"
          >
            <Icon name="ArrowLeft" size={14} /> Ко всем статьям
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/news")}
            className="mb-8 inline-flex items-center gap-2 text-foreground/50 hover:text-[hsl(var(--gold))] font-body text-xs tracking-wide uppercase transition-colors"
          >
            <Icon name="ArrowLeft" size={14} /> Ко всем статьям
          </button>

          <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
            {article.date}
          </div>
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wide gold-line mb-10">
            {article.title}
          </h1>

          <div className="space-y-5">
            {article.content.map((paragraph, i) => (
              <p key={i} className="font-body text-sm text-foreground/70 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 text-center border border-[hsl(var(--border))] p-8">
            <p className="font-body text-sm text-foreground/60 mb-4">Готовы сделать первый шаг?</p>
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
      <Footer />
    </div>
  );
}
