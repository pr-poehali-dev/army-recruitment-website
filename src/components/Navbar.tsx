import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { trackGoal } from "@/lib/analytics";

const NAV_ITEMS = [
  { id: "regions", label: "Регионы", path: "/regions" },
  { id: "conditions", label: "Условия", path: "/conditions" },
  { id: "vacancies", label: "Вакансии", path: "/vacancies" },
  { id: "faq", label: "Вопросы", path: "/faq" },
  { id: "news", label: "Новости", path: "/news" },
  { id: "contacts", label: "Контакты", path: "/contacts" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleNav = (item: typeof NAV_ITEMS[0]) => {
    setMobileMenuOpen(false);
    if (isHome && item.id !== "news") {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-[hsl(var(--gold)/0.15)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/projects/bef0083e-eec9-47a1-a374-befe699f4e5f/files/0ac64ab8-c22e-4c7e-a885-dfa975ef2edd.jpg"
            alt="Логотип"
            className="w-10 h-10 object-cover rounded-sm"
          />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => handleNav(item)} className="nav-link">
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => { trackGoal("cta_click", { location: "navbar" }); navigate("/contacts"); }}
          className="hidden md:flex items-center gap-2 bg-[hsl(var(--crimson))] text-white font-display text-xs tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-[hsl(0,65%,28%)] transition-colors"
        >
          <Icon name="Phone" size={14} />
          Связаться
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-5 h-px bg-foreground transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--gold)/0.15)] bg-background/98">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item)}
              className="w-full text-left px-6 py-4 font-display text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-[hsl(var(--gold))] border-b border-[hsl(var(--gold)/0.08)] transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="p-4">
            <button
              onClick={() => { setMobileMenuOpen(false); navigate("/contacts"); }}
              className="w-full bg-[hsl(var(--crimson))] text-white font-display text-sm tracking-[0.15em] uppercase py-3 hover:bg-[hsl(0,65%,28%)] transition-colors"
            >
              Связаться
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}