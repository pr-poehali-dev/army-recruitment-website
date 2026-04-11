import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/bef0083e-eec9-47a1-a374-befe699f4e5f/files/279554c8-b928-4c02-814f-f9d0c6fd040f.jpg";

const REGIONS = [
  { name: "Москва и МО", slots: 48, distance: "0 км", icon: "Building2" },
  { name: "Санкт-Петербург", slots: 32, distance: "700 км", icon: "Building2" },
  { name: "Краснодарский край", slots: 61, distance: "1 200 км", icon: "MapPin" },
  { name: "Ростовская область", slots: 55, distance: "1 080 км", icon: "MapPin" },
  { name: "Воронежская область", slots: 29, distance: "520 км", icon: "MapPin" },
  { name: "Белгородская область", slots: 44, distance: "700 км", icon: "Shield" },
];

const CONDITIONS = [
  {
    icon: "Banknote",
    title: "Денежное довольствие",
    value: "от 210 000 ₽",
    desc: "Ежемесячная выплата с учётом боевых надбавок и коэффициентов",
  },
  {
    icon: "HeartPulse",
    title: "Страховое обеспечение",
    value: "до 3 млн ₽",
    desc: "Государственное страхование жизни и здоровья военнослужащего",
  },
  {
    icon: "Home",
    title: "Жильё",
    value: "Бесплатно",
    desc: "Обеспечение жильём и компенсация найма жилого помещения",
  },
  {
    icon: "GraduationCap",
    title: "Образование",
    value: "Бесплатно",
    desc: "Профессиональная подготовка и повышение квалификации за счёт государства",
  },
  {
    icon: "Car",
    title: "Единовременная выплата",
    value: "от 2 300 000 ₽",
    desc: "Единовременная выплата при заключении контракта",
  },
  {
    icon: "Shield",
    title: "Социальные гарантии",
    value: "Полный пакет",
    desc: "Льготы, пенсия, медицинское обеспечение и поддержка семьи",
  },
];

const VACANCIES = [
  { role: "Оператор БПЛА", category: "Специальные войска", rank: "Мл. сержант", pay: "от 230 000 ₽" },
  { role: "Стрелок-зенитчик", category: "Войска ПВО", rank: "Рядовой", pay: "от 210 000 ₽" },
  { role: "Наводчик-оператор", category: "Танковые войска", rank: "Ст. сержант", pay: "от 250 000 ₽" },
  { role: "Военный медик", category: "Медицинская служба", rank: "Сержант", pay: "от 240 000 ₽" },
  { role: "Сапёр", category: "Инженерные войска", rank: "Сержант", pay: "от 260 000 ₽" },
  { role: "Связист", category: "Войска связи", rank: "Рядовой", pay: "от 215 000 ₽" },
  { role: "Механик-водитель", category: "Мотострелковые войска", rank: "Рядовой", pay: "от 210 000 ₽" },
  { role: "Снайпер", category: "Разведывательные части", rank: "Ст. сержант", pay: "от 270 000 ₽" },
  { role: "Служба в военной полиции", category: "Освобождённые территории", rank: "Рядовой", pay: "от 210 000 ₽" },
  { role: "Защита государственной тайны", category: "Тыл", rank: "Сержант", pay: "от 220 000 ₽" },
  { role: "Водитель доставки грузов", category: "Тыл", rank: "Рядовой", pay: "от 210 000 ₽" },
];

const FAQ = [
  {
    q: "Какой возраст подходит для службы по контракту?",
    a: "На военную службу по контракту принимаются граждане РФ от 18 до 60 лет. Верхний предел для отдельных категорий может варьироваться в зависимости от специальности и опыта.",
  },
  {
    q: "Обязательна ли военная подготовка перед подписанием контракта?",
    a: "Опыт военной службы приветствуется, но не является обязательным условием. Все кандидаты без опыта проходят подготовку на учебных полигонах перед выездом в зону ответственности.",
  },
  {
    q: "Какие документы необходимо предоставить?",
    a: "Паспорт гражданина РФ, военный билет или приписное свидетельство, документы об образовании, медицинская справка о состоянии здоровья. Полный список уточняйте на пункте отбора.",
  },
  {
    q: "Как происходит выплата денежного довольствия?",
    a: "Денежное довольствие начисляется ежемесячно на банковскую карту. Включает оклад по должности, воинскому званию, надбавки за выслугу лет и особые условия прохождения службы.",
  },
  {
    q: "Предусмотрены ли льготы для семей военнослужащих?",
    a: "Да. Семьи контрактников получают право на бесплатный проезд, медицинское обеспечение, приоритетное зачисление детей в детские сады и образовательные учреждения.",
  },
  {
    q: "Можно ли расторгнуть контракт досрочно?",
    a: "Расторжение контракта возможно по состоянию здоровья, семейным обстоятельствам и ряду других оснований, предусмотренных Федеральным законом «О воинской обязанности».",
  },
];

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

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedVacancy, setSelectedVacancy] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const selectRegion = (name: string) => {
    setSelectedRegion(name);
    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!formName || !formPhone) return;
    setFormStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/a5f22398-6e61-4451-b94a-69f4866fa1b1", {
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
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-[hsl(var(--gold)/0.15)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[hsl(var(--crimson))] flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-white" />
            </div>
            <div>
              <div className="font-display text-sm tracking-[0.2em] uppercase text-[hsl(var(--gold))]">
                Военная служба
              </div>
              <div className="font-body text-[10px] tracking-wider uppercase text-foreground/40">
                по контракту
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              ["regions", "Регионы"],
              ["conditions", "Условия"],
              ["vacancies", "Вакансии"],
              ["faq", "Вопросы"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:flex items-center gap-2 bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-display text-xs tracking-[0.15em] uppercase px-5 py-2.5 hover:bg-[hsl(43,74%,42%)] transition-colors"
          >
            <Icon name="FileSignature" size={14} />
            Заключить контракт
          </button>

          <button
            className="md:hidden text-foreground/70"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-[hsl(var(--gold)/0.15)] px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {[
              ["regions", "Регионы"],
              ["conditions", "Условия"],
              ["vacancies", "Вакансии на СВО"],
              ["faq", "Вопросы и ответы"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left font-display tracking-widest uppercase text-sm text-foreground/70 hover:text-[hsl(var(--gold))] transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacts")}
              className="mt-2 bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-display text-xs tracking-[0.15em] uppercase px-5 py-3 text-center"
            >
              Заключить контракт
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Российский триколор — белый / синий / красный */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, #d4d8e0 0%, #d4d8e0 33.33%, #1a3a6b 33.33%, #1a3a6b 66.66%, #8b1a1a 66.66%, #8b1a1a 100%)"
        }} />
        {/* Светлый оверлей для читаемости текста */}
        <div className="absolute inset-0" style={{ background: "rgba(240, 242, 247, 0.82)" }} />
        {/* Тонкое виньетирование снизу для плавного перехода в основной фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Солдат справа */}
        <div
          className="absolute bottom-0 right-0 w-[38%] h-[90%] bg-no-repeat bg-bottom bg-contain hidden md:block"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/bef0083e-eec9-47a1-a374-befe699f4e5f/files/b8fbd4e2-c315-4ca9-a924-204273d2c74e.jpg)`,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.7) 40%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.7) 40%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.05em] uppercase leading-none mb-6 animate-fade-in-up delay-200">
            Служба
            <br />
            <span className="text-[hsl(var(--gold))]">по контракту</span>
          </h1>

          <p className="font-body text-base md:text-lg text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-300">
            Защита Родины — это не просто долг, это призвание. Достойное денежное довольствие,
            полный социальный пакет и государственные гарантии для вас и вашей семьи.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
            <button
              id="contract"
              onClick={() => scrollTo("contacts")}
              className="flex items-center gap-3 bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-display text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-[hsl(43,74%,42%)] transition-all duration-200 hover:scale-105"
            >
              <Icon name="FileSignature" size={18} />
              Заключить контракт
            </button>
            <button
              onClick={() => scrollTo("vacancies")}
              className="flex items-center gap-3 border border-[hsl(var(--gold)/0.4)] text-foreground/80 font-display text-sm tracking-[0.15em] uppercase px-8 py-4 hover:border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))] transition-colors"
            >
              <Icon name="Search" size={18} />
              Смотреть вакансии
            </button>
          </div>

          <div className="grid grid-cols-3 gap-px bg-[hsl(var(--gold)/0.1)] mt-16 max-w-2xl mx-auto border border-[hsl(var(--gold)/0.1)] animate-fade-in-up delay-500">
            {[
              ["85+", "Регионов участия"],
              ["210 000 ₽", "От ежемесячно"],
              ["2 300 000 ₽", "Подъёмные"],
            ].map(([val, label]) => (
              <div key={label} className="bg-background/60 px-4 py-5 text-center">
                <div className="font-display text-xl md:text-2xl text-[hsl(var(--gold))] font-bold">
                  {val}
                </div>
                <div className="font-body text-[10px] tracking-wider uppercase text-foreground/40 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-[hsl(var(--gold)/0.5)]" />
        </div>
      </section>

      {/* REGIONS */}
      <section id="regions" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
              Раздел 01
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">
              Регионы
            </h2>
            <p className="mt-6 font-body text-foreground/50 max-w-xl text-sm leading-relaxed">
              Подбор места прохождения службы с учётом вашего места жительства и специализации.
              Пункты отбора работают в каждом федеральном округе.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(var(--gold)/0.08)]">
            {REGIONS.map((r) => (
              <div
                key={r.name}
                onClick={() => selectRegion(r.name)}
                className="bg-card p-6 hover:bg-[hsl(var(--gold)/0.05)] transition-colors group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 border border-[hsl(var(--gold)/0.3)] flex items-center justify-center group-hover:border-[hsl(var(--gold)/0.7)] transition-colors">
                    <Icon name={r.icon} fallback="MapPin" size={18} className="text-[hsl(var(--gold)/0.7)]" />
                  </div>
                  <span className="font-body text-xs text-foreground/30 tracking-wide">
                    {r.slots} мест
                  </span>
                </div>
                <h3 className="font-display text-lg tracking-wide text-foreground group-hover:text-[hsl(var(--gold))] transition-colors">
                  {r.name}
                </h3>
                <div className="mt-2 font-body text-xs text-foreground/40">
                  Расстояние: {r.distance}
                </div>
                <div className="mt-4 flex items-center gap-1 text-[hsl(var(--gold)/0.6)] text-xs font-body group-hover:text-[hsl(var(--gold))] transition-colors">
                  Подробнее <Icon name="ArrowRight" size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto px-6" />

      {/* CONDITIONS */}
      <section id="conditions" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
              Раздел 02
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">
              Условия службы
            </h2>
            <p className="mt-6 font-body text-foreground/50 max-w-xl text-sm leading-relaxed">
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
                  <h3 className="font-display text-sm tracking-wider uppercase text-foreground/80">
                    {c.title}
                  </h3>
                </div>
                <div className="font-display text-2xl text-[hsl(var(--gold))] mb-2">{c.value}</div>
                <p className="font-body text-xs text-foreground/45 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto px-6" />

      {/* VACANCIES */}
      <section id="vacancies" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
              Раздел 03
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">
              Вакансии на СВО
            </h2>
            <p className="mt-6 font-body text-foreground/50 max-w-xl text-sm leading-relaxed">
              Актуальные должности в зоне специальной военной операции. Отбор осуществляется
              на конкурсной основе с учётом физической подготовки и опыта.
            </p>
          </div>

          <div className="border border-[hsl(var(--border))] overflow-hidden">
            <div className="grid grid-cols-4 bg-[hsl(var(--gold)/0.07)] border-b border-[hsl(var(--border))] px-6 py-3">
              {["Должность", "Категория", "Звание", "Довольствие"].map((h) => (
                <div key={h} className="font-display text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                  {h}
                </div>
              ))}
            </div>
            {VACANCIES.map((v) => (
              <div
                key={v.role}
                onClick={() => { setSelectedVacancy(v.role); document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" }); }}
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
              onClick={() => scrollTo("contacts")}
              className="inline-flex items-center gap-2 border border-[hsl(var(--gold)/0.3)] text-[hsl(var(--gold))] font-display text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-[hsl(var(--gold)/0.08)] transition-colors"
            >
              <Icon name="Send" size={14} />
              Подать заявку на вакансию
            </button>
          </div>

          {/* Блок про отношения */}
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
                onClick={() => scrollTo("contacts")}
                className="mt-4 inline-flex items-center gap-2 text-[hsl(var(--gold))] font-display text-xs tracking-[0.15em] uppercase hover:opacity-70 transition-opacity"
              >
                Узнать подробнее <Icon name="ArrowRight" size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto px-6" />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
              Раздел 04
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">
              Вопросы и ответы
            </h2>
            <p className="mt-6 font-body text-foreground/50 max-w-xl text-sm leading-relaxed">
              Ответы на наиболее распространённые вопросы о прохождении военной службы по контракту.
            </p>
          </div>

          <div className="border border-[hsl(var(--border))] px-6">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto px-6" />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--gold))] mb-3">
              Раздел 05
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide gold-line">
              Контакты
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {/* Телефон */}
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

              {/* Адрес */}
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

              {/* Мессенджеры */}
              <div>
                <div className="font-display text-xs tracking-[0.2em] uppercase text-foreground/40 mb-4">Написать нам</div>
                <div className="flex items-center gap-3">
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
              <h3 className="font-display text-xl tracking-wide uppercase mb-6 text-foreground">
                Оставить заявку
              </h3>
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
                      <option key={r.name} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Комментарий
                  </label>
                  <textarea
                    rows={3}
                    value={selectedVacancy ? `Интересует вакансия: ${selectedVacancy}` : ""}
                    onChange={(e) => setSelectedVacancy(e.target.value.replace("Интересует вакансия: ", ""))}
                    placeholder="Ваш вопрос или пожелание..."
                    className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors resize-none"
                  />
                </div>
                {formStatus === "success" ? (
                  <div className="w-full bg-green-50 border border-green-200 text-green-700 font-body text-sm py-4 px-4 text-center">
                    Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus === "loading"}
                    className="w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-display text-sm tracking-[0.15em] uppercase py-4 hover:bg-[hsl(43,74%,42%)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Icon name={formStatus === "loading" ? "Loader" : "FileSignature"} size={16} />
                    {formStatus === "loading" ? "Отправка..." : "Заключить контракт"}
                  </button>
                )}
                {formStatus === "error" && (
                  <p className="font-body text-xs text-red-500 text-center">Ошибка отправки. Попробуйте ещё раз.</p>
                )}
                <p className="font-body text-[10px] text-foreground/30 leading-relaxed text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  в соответствии с требованиями ФЗ-152
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[hsl(var(--gold)/0.1)] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[hsl(var(--crimson))] flex items-center justify-center">
              <Icon name="Shield" size={13} className="text-white" />
            </div>
            <span className="font-display text-xs tracking-[0.2em] uppercase text-foreground/40">
              Министерство обороны Российской Федерации
            </span>
          </div>
          <div className="font-body text-xs text-foreground/25">
            © 2024 Все права защищены. Официальный ресурс.
          </div>
        </div>
      </footer>
    </div>
  );
}