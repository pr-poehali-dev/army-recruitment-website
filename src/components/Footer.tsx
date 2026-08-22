import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const LINKS = [
  { label: "Регионы", path: "/regions" },
  { label: "Условия", path: "/conditions" },
  { label: "Вакансии", path: "/vacancies" },
  { label: "Вопросы", path: "/faq" },
  { label: "Контакты", path: "/contacts" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-[hsl(var(--gold)/0.15)] bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <button onClick={() => navigate("/")} className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.poehali.dev/projects/bef0083e-eec9-47a1-a374-befe699f4e5f/files/0ac64ab8-c22e-4c7e-a885-dfa975ef2edd.jpg"
                alt="Логотип"
                className="w-10 h-10 object-cover rounded-sm"
              />
              <div>
                <div className="font-display text-sm tracking-[0.2em] uppercase text-[hsl(var(--gold))]">
                  Служба
                </div>
                <div className="font-body text-[10px] tracking-wider uppercase text-foreground/40">
                  по контракту
                </div>
              </div>
            </button>
            <p className="font-body text-xs text-foreground/40 leading-relaxed max-w-xs">
              Защита Родины — это призвание. Достойное довольствие и полный социальный пакет.
            </p>
          </div>

          <div>
            <div className="font-display text-xs tracking-[0.2em] uppercase text-foreground/40 mb-4">
              Разделы
            </div>
            <div className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <button
                  key={l.path}
                  onClick={() => navigate(l.path)}
                  className="text-left font-body text-sm text-foreground/60 hover:text-[hsl(var(--gold))] transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display text-xs tracking-[0.2em] uppercase text-foreground/40 mb-4">
              Связаться
            </div>
            <div className="space-y-3">
              <a
                href="tel:+79951819808"
                className="flex items-center gap-2 font-body text-sm text-foreground/60 hover:text-[hsl(var(--gold))] transition-colors"
              >
                <Icon name="Phone" size={14} className="text-[hsl(var(--gold))]" />
                +7 (995) 181-98-08
              </a>
              <div className="flex items-center gap-2 font-body text-sm text-foreground/60">
                <Icon name="MapPin" size={14} className="text-[hsl(var(--gold))]" />
                Москва, Яблочкова 5с1
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a href="https://wa.me/79951819808" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 border border-[hsl(var(--border))] flex items-center justify-center hover:border-green-500 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-green-500"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.557 4.12 1.527 5.849L.057 23.885l6.194-1.624A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.51-5.17-1.396l-.37-.22-3.679.964.981-3.595-.242-.371A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                </a>
                <a href="https://t.me/+79951819808" target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 border border-[hsl(var(--border))] flex items-center justify-center hover:border-blue-500 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--gold)/0.1)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-body text-xs text-foreground/30">
            © 2025 Военная служба по контракту. Все права защищены.
          </div>
          <button
            onClick={() => navigate("/contacts")}
            className="flex items-center gap-2 bg-[hsl(var(--crimson))] text-white font-display text-xs tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-[hsl(0,65%,28%)] transition-colors"
          >
            <Icon name="FileSignature" size={13} />
            Заключить контракт
          </button>
        </div>
      </div>
    </footer>
  );
}