import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/icon";
import { FAQ } from "@/data/constants";

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[hsl(var(--gold)/0.2)] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-display text-base tracking-wide text-foreground/90 group-hover:text-[hsl(var(--gold))] transition-colors">
          {q}
        </span>
        <span
          className="shrink-0 w-6 h-6 flex items-center justify-center border border-[hsl(var(--gold)/0.4)] text-[hsl(var(--gold))] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <Icon name="Plus" size={14} />
        </span>
      </button>
      <div className={`accordion-content ${open ? "open" : ""}`}>
        <p className="pb-5 text-sm text-foreground/60 leading-relaxed font-body">{a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">Раздел 04</div>
            <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">Вопросы и ответы</h1>
            <p className="mt-6 font-body text-foreground/60 max-w-xl text-sm leading-relaxed">
              Ответы на наиболее распространённые вопросы о прохождении военной службы по контракту.
            </p>
          </div>

          <div className="border border-[hsl(var(--border))] px-6">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="font-body text-sm text-foreground/50 mb-4">Не нашли ответ на свой вопрос?</p>
            <button
              onClick={() => navigate("/contacts")}
              className="inline-flex items-center gap-2 bg-[hsl(var(--crimson))] text-white font-display text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-[hsl(0,65%,28%)] transition-colors"
            >
              <Icon name="Phone" size={16} />
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}