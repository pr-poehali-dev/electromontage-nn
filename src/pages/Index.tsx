import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";



const HERO_IMG = "https://cdn.poehali.dev/projects/2a6b2d0c-313e-48b6-8470-ce5b0d81be6c/files/205c9be6-99a5-421f-b1fa-f188fc7c9dd5.jpg";
const WORK_IMG = "https://cdn.poehali.dev/projects/2a6b2d0c-313e-48b6-8470-ce5b0d81be6c/files/372cfdeb-d300-4b3a-a611-71d4c1b589b4.jpg";
const PORTFOLIO_IMG = "https://cdn.poehali.dev/projects/2a6b2d0c-313e-48b6-8470-ce5b0d81be6c/files/3a8769c0-deb4-4bfb-af0e-544a76313fc9.jpg";

const services = [
  { icon: "Home", title: "Квартиры и дома", desc: "Полный электромонтаж под ключ: разводка, розетки, освещение, щитки. Работаем аккуратно без лишнего шума." },
  { icon: "Building2", title: "Коммерческие объекты", desc: "Офисы, магазины, склады — проектирование и монтаж электросетей любой сложности." },
  { icon: "Factory", title: "Промышленные предприятия", desc: "Силовые линии, заземление, молниезащита, АВР. Сертифицированные специалисты." },
  { icon: "Zap", title: "Замена электропроводки", desc: "Полная замена старой проводки: алюминий на медь, скрытая и открытая укладка." },
  { icon: "Shield", title: "Электрощиты и автоматы", desc: "Сборка и замена распределительных щитов, установка автоматов, УЗО, дифавтоматов." },
  { icon: "Lightbulb", title: "Освещение и люстры", desc: "Монтаж встроенного освещения, умного света, установка люстр и светильников любых типов." },
];

const portfolio = [
  { title: "Электромонтаж в ЖК «Новая Москва»", desc: "Полная разводка 3-комнатной квартиры 95м²", tag: "Квартира", img: WORK_IMG },
  { title: "Офис IT-компании «Код»", desc: "220 рабочих мест, структурированная кабельная система", tag: "Коммерция", img: PORTFOLIO_IMG },
  { title: "Коттедж в Кстово", desc: "Дом 320м², умный свет, тёплые полы, автономная генерация", tag: "Частный дом", img: HERO_IMG },
];

const reviews = [
  { name: "Андрей Климов", role: "Владелец квартиры, Нижний Новгород", text: "Отличная работа! Сделали всё быстро и чисто. Провели полную замену проводки за 4 дня, не намусорили, объяснили всё по щиту.", stars: 5 },
  { name: "Наталья Сергеева", role: "Управляющий офисным центром", text: "Работали с нами уже на трёх объектах. Всегда в срок, документация в порядке, мастера — профессионалы своего дела.", stars: 5 },
  { name: "Дмитрий Фролов", role: "Застройщик, Дзержинск", text: "Сдали 12 квартир в срок. Все проверки прошли без нареканий. Рекомендую как надёжного партнёра.", stars: 5 },
];

const stats = [
  { value: "8+", label: "лет на рынке" },
  { value: "1200+", label: "объектов сдано" },
  { value: "100%", label: "гарантия работ" },
  { value: "24ч", label: "выезд в срочных случаях" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navLinks = [
    { label: "Услуги", id: "services" },
    { label: "Портфолио", id: "portfolio" },
    { label: "О нас", id: "about" },
    { label: "Отзывы", id: "reviews" },
    { label: "Контакты", id: "contacts" },
  ];

  return (
    <div className="bg-electric-dark font-golos text-white min-h-screen overflow-x-hidden">
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-electric-dark/95 backdrop-blur border-b border-white/10" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-electric-yellow rounded flex items-center justify-center">
              <Icon name="Zap" size={18} className="text-electric-dark" />
            </div>
            <span className="font-oswald font-bold text-xl tracking-wide text-white">ЭЛЕКТРО<span className="text-electric-yellow">МАСТЕР</span></span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-white/70 hover:text-electric-yellow transition-colors font-medium tracking-wide uppercase">
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+78312000000" className="text-electric-yellow font-oswald text-lg font-semibold tracking-wide hover:text-white transition-colors">
              +7 (831) 200-00-00
            </a>
            <button onClick={() => scrollTo("form")} className="bg-electric-yellow text-electric-dark font-oswald font-bold px-5 py-2 text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-sm animate-pulse-glow">
              Вызвать мастера
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-electric-gray border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-white/80 hover:text-electric-yellow transition-colors font-medium uppercase tracking-wide text-sm">
                {l.label}
              </button>
            ))}
            <a href="tel:+78312000000" className="text-electric-yellow font-oswald text-lg font-semibold">+7 (831) 200-00-00</a>
            <button onClick={() => scrollTo("form")} className="bg-electric-yellow text-electric-dark font-oswald font-bold px-5 py-3 text-sm uppercase tracking-widest rounded-sm w-full">
              Вызвать мастера
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Электромонтаж" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-electric-dark via-electric-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-electric-dark via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "linear-gradient(rgba(255,214,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />

        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
          <Icon name="Zap" size={400} className="text-electric-yellow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-2xl">
            <div className="opacity-0 animate-fade-in">
              <span className="inline-flex items-center gap-2 text-electric-yellow font-oswald text-sm uppercase tracking-[4px] mb-6">
                <span className="w-8 h-px bg-electric-yellow" />
                Нижегородская область
              </span>
            </div>

            <h1 className="font-oswald font-bold text-5xl md:text-7xl leading-none uppercase mb-6 opacity-0 animate-fade-in-delay">
              Электро
              <span className="block text-electric-yellow">монтаж</span>
              <span className="block text-3xl md:text-4xl text-white/60 mt-2">под ключ</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl opacity-0 animate-fade-in-delay2">
              Профессиональная электрика в квартирах, домах и на предприятиях. Гарантия 5 лет. Бесплатный выезд и смета.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-delay3">
              <button onClick={() => scrollTo("form")} className="group bg-electric-yellow text-electric-dark font-oswald font-bold px-8 py-4 text-base uppercase tracking-widest hover:bg-white transition-all rounded-sm animate-pulse-glow flex items-center gap-3">
                <Icon name="Phone" size={20} />
                Бесплатный выезд
                <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo("services")} className="border border-white/30 text-white font-oswald font-semibold px-8 py-4 text-base uppercase tracking-widest hover:border-electric-yellow hover:text-electric-yellow transition-all rounded-sm">
                Наши услуги
              </button>
            </div>

            <div className="flex flex-wrap gap-8 mt-16 opacity-0 animate-fade-in-delay3">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl font-bold text-electric-yellow">{s.value}</div>
                  <div className="text-white/50 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-electric-yellow/60" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-electric-gray relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-yellow/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-electric-yellow" />
              <span className="text-electric-yellow font-oswald text-sm uppercase tracking-[4px]">Что мы делаем</span>
            </div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl uppercase mb-16">
              Наши <span className="text-electric-yellow">услуги</span>
            </h2>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimSection key={s.title}>
                <div className="group bg-electric-steel border border-white/10 p-8 rounded-sm hover:border-electric-yellow/50 transition-all duration-300 hover:-translate-y-1 cursor-default" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="w-12 h-12 bg-electric-yellow/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-electric-yellow/20 transition-colors">
                    <Icon name={s.icon} size={24} className="text-electric-yellow" fallback="Zap" />
                  </div>
                  <h3 className="font-oswald font-bold text-xl uppercase mb-3 text-white">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-electric-yellow text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-electric-dark relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-electric-yellow" />
              <span className="text-electric-yellow font-oswald text-sm uppercase tracking-[4px]">Наши работы</span>
            </div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl uppercase mb-16">
              Порт<span className="text-electric-yellow">фолио</span>
            </h2>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <AnimSection key={p.title}>
                <div className="group relative overflow-hidden rounded-sm" style={{ transitionDelay: `${i * 100}ms` }}>
                  <img src={p.img} alt={p.title} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-electric-dark via-electric-dark/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-electric-yellow text-electric-dark font-oswald font-bold text-xs uppercase tracking-wider px-3 py-1">{p.tag}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-oswald font-bold text-lg uppercase text-white mb-1">{p.title}</h3>
                    <p className="text-white/60 text-sm">{p.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-electric-steel relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-yellow/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-electric-yellow" />
                <span className="text-electric-yellow font-oswald text-sm uppercase tracking-[4px]">Кто мы</span>
              </div>
              <h2 className="font-oswald font-bold text-4xl md:text-5xl uppercase mb-8">
                О <span className="text-electric-yellow">компании</span>
              </h2>
              <div className="space-y-5 text-white/70 leading-relaxed">
                <p>ЭлектроМастер — команда профессиональных электриков с лицензией СРО, работающих в Нижегородской области с 2016 года.</p>
                <p>Мы выполняем полный цикл электромонтажных работ: от проектирования и согласования до финальной сдачи объекта с подписанием всех актов.</p>
                <p>Наши специалисты регулярно проходят обучение и аттестацию, работают только с сертифицированными материалами ведущих производителей.</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", text: "Лицензия СРО" },
                  { icon: "Clock", text: "Гарантия 5 лет" },
                  { icon: "Users", text: "15 мастеров в команде" },
                  { icon: "CheckCircle", text: "Договор и смета" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-sm bg-electric-yellow/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-electric-yellow" fallback="Check" />
                    </div>
                    <span className="text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="relative">
                <img src={WORK_IMG} alt="О компании" className="w-full rounded-sm object-cover h-96" />
                <div className="absolute -bottom-6 -left-6 bg-electric-yellow p-6 rounded-sm">
                  <div className="font-oswald font-bold text-4xl text-electric-dark">8+</div>
                  <div className="text-electric-dark/70 text-sm font-semibold">лет опыта</div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-electric-dark relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-electric-yellow" />
              <span className="text-electric-yellow font-oswald text-sm uppercase tracking-[4px]">Говорят клиенты</span>
            </div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl uppercase mb-16">
              От<span className="text-electric-yellow">зывы</span>
            </h2>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <AnimSection key={r.name}>
                <div className="bg-electric-gray border border-white/10 p-8 rounded-sm relative" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex mb-4">
                    {[...Array(r.stars)].map((_, j) => (
                      <Icon key={j} name="Star" size={16} className="text-electric-yellow" />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6 text-sm">«{r.text}»</p>
                  <div className="border-t border-white/10 pt-5">
                    <div className="font-oswald font-bold text-white">{r.name}</div>
                    <div className="text-white/40 text-xs mt-1">{r.role}</div>
                  </div>
                  <div className="absolute top-6 right-6 text-electric-yellow/20 font-oswald text-6xl font-bold leading-none">"</div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="py-24 bg-electric-yellow relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px"}} />
        <div className="max-w-4xl mx-auto px-6 relative">
          <AnimSection>
            <div className="text-center mb-12">
              <h2 className="font-oswald font-bold text-4xl md:text-5xl uppercase text-electric-dark mb-4">
                Бесплатный выезд мастера
              </h2>
              <p className="text-electric-dark/70 text-lg">Оставьте заявку — мастер приедет в удобное время, осмотрит объект и составит точную смету бесплатно</p>
            </div>

            {submitted ? (
              <div className="bg-electric-dark rounded-sm p-12 text-center">
                <div className="w-16 h-16 bg-electric-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={32} className="text-electric-dark" />
                </div>
                <h3 className="font-oswald font-bold text-2xl text-white uppercase mb-3">Заявка принята!</h3>
                <p className="text-white/60">Мы свяжемся с вами в течение 30 минут</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-electric-dark rounded-sm p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-electric-gray border border-white/20 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-electric-yellow transition-colors placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Телефон *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (900) 000-00-00"
                      className="w-full bg-electric-gray border border-white/20 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-electric-yellow transition-colors placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Тип объекта</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-electric-gray border border-white/20 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-electric-yellow transition-colors"
                  >
                    <option value="" className="bg-electric-dark">Выберите тип объекта</option>
                    <option value="apartment" className="bg-electric-dark">Квартира</option>
                    <option value="house" className="bg-electric-dark">Частный дом</option>
                    <option value="office" className="bg-electric-dark">Офис / коммерческое помещение</option>
                    <option value="industrial" className="bg-electric-dark">Промышленное предприятие</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label className="block text-white/60 text-xs uppercase tracking-widest mb-2">Комментарий</label>
                  <textarea
                    rows={3}
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Опишите задачу: площадь, что нужно сделать, сроки..."
                    className="w-full bg-electric-gray border border-white/20 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-electric-yellow transition-colors placeholder:text-white/30 resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-electric-yellow text-electric-dark font-oswald font-bold py-4 uppercase tracking-widest text-base hover:bg-white transition-colors rounded-sm flex items-center justify-center gap-3">
                  <Icon name="Zap" size={20} />
                  Отправить заявку — это бесплатно
                </button>
                <p className="text-white/30 text-xs text-center mt-4">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
              </form>
            )}
          </AnimSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-electric-gray relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-yellow/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-electric-yellow" />
              <span className="text-electric-yellow font-oswald text-sm uppercase tracking-[4px]">Свяжитесь с нами</span>
            </div>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl uppercase mb-16">
              Кон<span className="text-electric-yellow">такты</span>
            </h2>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (831) 200-00-00", sub: "Пн–Пт 8:00–20:00, Сб 9:00–17:00", href: "tel:+78312000000" },
              { icon: "Mail", label: "Email", value: "info@electro-master.ru", sub: "Отвечаем в течение 2 часов", href: "mailto:info@electro-master.ru" },
              { icon: "MapPin", label: "Адрес", value: "Нижний Новгород", sub: "Работаем по всей Нижегородской области", href: "#" },
            ].map(c => (
              <AnimSection key={c.label}>
                <a href={c.href} className="group block bg-electric-steel border border-white/10 p-8 rounded-sm hover:border-electric-yellow/50 transition-all">
                  <div className="w-12 h-12 bg-electric-yellow/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-electric-yellow/20 transition-colors">
                    <Icon name={c.icon} size={24} className="text-electric-yellow" fallback="MapPin" />
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-2">{c.label}</div>
                  <div className="font-oswald font-bold text-xl text-white mb-1">{c.value}</div>
                  <div className="text-white/50 text-sm">{c.sub}</div>
                </a>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-electric-dark border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-electric-yellow rounded flex items-center justify-center">
              <Icon name="Zap" size={14} className="text-electric-dark" />
            </div>
            <span className="font-oswald font-bold text-white">ЭЛЕКТРО<span className="text-electric-yellow">МАСТЕР</span></span>
          </div>
          <div className="text-white/30 text-sm">© 2024 ЭлектроМастер. Все права защищены. Нижегородская область.</div>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <span>ИНН: 5246012345</span>
            <span>·</span>
            <span>СРО: ААА №0001234</span>
          </div>
        </div>
      </footer>
    </div>
  );
}