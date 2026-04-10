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
    value: "400 000 ₽",
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

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
        {/* Тёмный оверлей для читаемости текста */}
        <div className="absolute inset-0" style={{ background: "rgba(8, 12, 22, 0.78)" }} />
        {/* Тонкое виньетирование снизу для плавного перехода в основной фон */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Солдат справа */}
        <div
          className="absolute bottom-0 right-0 w-[38%] h-[90%] bg-no-repeat bg-bottom bg-contain hidden md:block"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/bef0083e-eec9-47a1-a374-befe699f4e5f/files/b1255b6a-ac0a-4fe3-b5e3-6a059edfe9a7.jpg)`,
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
              ["400 000 ₽", "Подъёмные"],
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
              {[
                {
                  icon: "Phone",
                  title: "Единый номер",
                  value: "117",
                  sub: "Круглосуточно, звонок бесплатный",
                },
                {
                  icon: "MapPin",
                  title: "Ближайший пункт отбора",
                  value: "Москва, ул. Знаменка, д. 19",
                  sub: "Пн–Пт: 09:00–18:00",
                },
                {
                  icon: "Globe",
                  title: "Официальный сайт",
                  value: "mil.ru",
                  sub: "Министерство обороны Российской Федерации",
                },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[hsl(var(--gold)/0.3)] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={c.icon} fallback="Phone" size={17} className="text-[hsl(var(--gold))]" />
                  </div>
                  <div>
                    <div className="font-display text-xs tracking-[0.2em] uppercase text-foreground/40 mb-1">
                      {c.title}
                    </div>
                    <div className="font-display text-lg text-foreground">{c.value}</div>
                    <div className="font-body text-xs text-foreground/40 mt-1">{c.sub}</div>
                  </div>
                </div>
              ))}
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
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Регион
                  </label>
                  <select className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground/70 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors appearance-none">
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
                    placeholder="Ваш вопрос или пожелание..."
                    className="w-full bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-[hsl(var(--gold)/0.5)] transition-colors resize-none"
                  />
                </div>
                <button className="w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))] font-display text-sm tracking-[0.15em] uppercase py-4 hover:bg-[hsl(43,74%,42%)] transition-colors flex items-center justify-center gap-2">
                  <Icon name="FileSignature" size={16} />
                  Заключить контракт
                </button>
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