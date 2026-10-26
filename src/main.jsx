import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./components/SplitText";
import SpotlightCard from "./components/SpotlightCard";
import { applyLanguage, language, tr } from "./i18n";
import "./styles.css";
import heroVilla from "../assets/hero-villa.webp";
import interior from "../assets/interior.webp";
import horizonVilla from "../assets/villa-horizon.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const nav = [
  ["الرئيسية", "index.html", "home"],
  ["الحلول", "solutions.html", "solutions"],
  ["المشاريع", "projects.html", "projects"],
  ["من نحن", "about.html", "about"],
  ["تواصل معنا", "contact.html", "contact"],
];
const activePage = document.body.dataset.page || window.location.pathname.split("/").pop()?.replace(".html", "") || "home";

function Arrow({ diagonal = false }) {
  return <span className={`arrow ${diagonal ? "arrow-diagonal" : ""}`} aria-hidden="true">{diagonal ? "↙" : "←"}</span>;
}

function Eyebrow({ children, light = false, number }) {
  return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span className="eyebrow-line" />{number && <b>{number}</b>}{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => { document.body.classList.toggle("menu-open", open); return () => document.body.classList.remove("menu-open"); }, [open]);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="header-inner shell">
      <a className="brand" href="index.html" aria-label="ORLUXA — الرئيسية"><span className="brand-sign">O<span /></span><span className="brand-name">ORLUXA<small>SMART LIVING</small></span></a>
      <nav className="desktop-nav" aria-label="القائمة الرئيسية">{nav.map(([label, href, key]) => <a key={key} href={href} aria-current={activePage === key ? "page" : undefined}>{label}</a>)}</nav>
      <a className="header-link" href="contact.html"><span>ابدأ من فكرتك</span><Arrow diagonal /></a>
      <button className="language-toggle" data-language-toggle onClick={() => { localStorage.setItem("orluxa-language", language() === "ar" ? "en" : "ar"); window.location.reload(); }}>{language() === "ar" ? "EN" : "عربي"}</button>
      <button className={`menu-toggle ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={open}><i /><i /></button>
    </div>
    <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}><div className="mobile-menu-backdrop"/><nav aria-label="القائمة على الهاتف">{nav.map(([label, href, key], i) => <a key={key} href={href} onClick={() => setOpen(false)} aria-current={activePage === key ? "page" : undefined}><span className="mobile-nav-index">0{i + 1}</span>{label}<Arrow diagonal /></a>)}</nav><div className="mobile-menu-foot">مساحات تفهم إيقاعك <span>الرياض · الشرق الأوسط</span></div></div>
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-top shell">
      <div className="footer-brand-col"><a className="brand footer-brand" href="index.html"><span className="brand-sign">O<span /></span><span className="brand-name">ORLUXA<small>SMART LIVING</small></span></a><p>نصوغ تصوراً لمساحات أكثر انسجاماً؛ حيث تعمل التقنية بهدوء، ويظل أثرها واضحاً في تفاصيل الحياة.</p><span className="concept-pill">علامة تجارية مفاهيمية</span></div>
      <div className="footer-nav-col"><h2>تصفّح</h2><nav>{nav.map(([label, href, key]) => <a href={href} key={key}>{label}</a>)}</nav></div>
      <div className="footer-contact-col"><h2>لنبقى على تواصل</h2><span>نموذج تواصل توضيحي · لا يستقبل رسائل فعلية</span><span>الرياض · المملكة العربية السعودية</span><div className="social-tags"><span>Instagram · @orluxa.living</span><span>LinkedIn · ORLUXA</span></div></div>
      <div className="footer-signoff"><span className="footer-orbit">O</span><p>نورٌ ينسجم.<br /><em>ومساحةٌ تتنفّس.</em></p><a href="contact.html">لنتحدث عن فكرتك <Arrow /></a></div>
    </div>
    <div className="footer-bottom shell"><span>© 2026 ORLUXA · موقع مفاهيمي لأغراض العرض</span><a href="index.html">العودة إلى البداية <span>↑</span></a><span>  Made by ala.codes07  </span></div>
  </footer>;
}

function PageFrame({ children }) {
  return <><Header /><main>{children}</main><Footer /><div className="scroll-progress" aria-hidden="true" /></>;
}

function MotionLayer() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      lerp: reduce ? 1 : 0.085,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.05,
      smoothWheel: !reduce,
      syncTouch: false,
      autoRaf: false,
    });
    const update = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--scroll", max > 0 ? `${(window.scrollY / max) * 100}%` : "0%");
    };
    progress();
    window.addEventListener("scroll", progress, { passive: true });
    return () => { window.removeEventListener("scroll", progress); gsap.ticker.remove(update); lenis.destroy(); };
  }, []);
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro.fromTo(".hero-media", { clipPath: "inset(0 0 100% 0 round 48% 0 0 0)", y: 34 }, { clipPath: "inset(0 0 0% 0 round 48% 0 0 0)", y: 0, duration: 1.4 }, 0.15)
      .fromTo(".hero-caption, .hero-meta, .hero-actions", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.45)
      .fromTo(".light-path path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.5);
    if (document.querySelector(".page-hero")) {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".page-hero-image", { clipPath: "inset(0 0 100% 0)", y: 24 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.25 }, 0.1)
        .fromTo(".page-hero .breadcrumb, .page-hero .eyebrow, .page-hero-content>p, .page-hero-side", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.38);
    }
    gsap.utils.toArray(".js-reveal").forEach((item) => {
      gsap.fromTo(item, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 86%", once: true } });
    });
    gsap.utils.toArray(".image-drift img:not(.hero-photo)").forEach((image) => {
      gsap.fromTo(image, { yPercent: -5, scale: 1.08 }, { yPercent: 5, scale: 1.02, ease: "none", scrollTrigger: { trigger: image.closest(".image-drift"), start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    gsap.to(".hero-photo", { yPercent: 9, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    gsap.to(".hero-glow", { opacity: 0.35, scale: 1.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });
  return null;
}

const solutions = [
  { no: "01", title: "الإضاءة الذكية", en: "LIGHT, IN TUNE", copy: "مشاهد ضوئية تتغير بين التركيز والهدوء والاستقبال؛ بضبط السطوع وحرارة اللون في طبقات تنسجم مع تصميم المكان.", icon: "◌", link: "#lighting" },
  { no: "02", title: "التحكم بالمناخ", en: "COMFORT, QUIETLY", copy: "درجات حرارة وجداول تشغيل واضحة، تمنح كل مساحة مناخها المريح عبر واجهة بسيطة وسهلة التخصيص.", icon: "⌁", link: "#climate" },
  { no: "03", title: "الأمان المتكامل", en: "PEACE OF MIND", copy: "إدارة للدخول والتنبيهات وحالة المساحة في تجربة واحدة، مصممة لتبقى الطمأنينة قريبة منك دون حضور مزعج.", icon: "⌑", link: "#security" },
];

function LightPath({ className = "" }) {
  return <svg className={`light-path ${className}`} viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 360 C170 340 120 190 286 226 C404 253 395 345 520 295 C646 245 570 96 725 111 C822 120 808 225 1010 78" /></svg>;
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  return <section className={`hero ${loaded ? "is-ready" : ""}`}>
    <div className="hero-glow" aria-hidden="true" />
    <LightPath className="hero-line" />
    <div className="hero-grid shell">
      <div className="hero-copy">
        <div className="hero-caption"><span className="caption-dot" /> حلول ذكية تنسجم مع العمارة <span className="concept-tag">تصور مفاهيمي</span></div>
        <h1 className="hero-title"><SplitText tag="span" text={tr("نورٌ يقرأ", "Light that understands")} splitType="words" effect="wave" delay={120} duration={1.15} mask className="hero-title-line" textAlign="right" /><SplitText tag="span" text={tr("المساحة.", "your space.")} splitType="words" effect="wave" delay={120} duration={1.15} mask className="hero-title-line hero-title-accent" textAlign="right" /></h1>
        <p className="hero-lead">الذكاء الخفيّ للعمارة. منظومة واحدة تجعل الضوء والمناخ والأمان أقرب إلى إيقاعك، وتترك للتصميم أن يتكلم بلغته.</p>
        <div className="hero-actions"><a className="button button-cream" href="solutions.html">اكتشف المنظومة <Arrow diagonal /></a><a className="quiet-link" href="projects.html">شاهد كيف تلتقي الفكرة بالمكان <Arrow /></a></div>
        <div className="hero-meta"><span><b>01</b> / 05</span><span className="meta-rule" /><span>الرياض · الشرق الأوسط</span></div>
      </div>
      <div className="hero-art">
        <div className="hero-orbit orbit-large" /><div className="hero-orbit orbit-small" />
        <div className="hero-media image-drift"><img className="hero-photo" src={heroVilla} alt="فيلا معاصرة مضاءة عند الغروب في الرياض" onLoad={() => setLoaded(true)} fetchPriority="high" /><div className="hero-image-wash" /></div>
        <div className="hero-frame-line" />
        <div className="hero-floating-note"><span className="note-kicker">THE QUIET INTELLIGENCE</span><strong>01<span>/</span>05</strong><small>نور يتغيّر<br />والمكان يبقى لك</small></div>
        <div className="hero-side-label">تجربة سكنية · تصور بصري</div>
        <div className="hero-stamp"><span>ORLUXA</span><small>LIGHT / SPACE / LIFE</small></div>
      </div>
    </div>
    <a href="#manifesto" className="scroll-cue"><span className="scroll-cue-line" />اسحب لتستكشف <b>↓</b></a>
    <div className="hero-bottom-note"><span>حياة ذكية، بحضور هادئ</span><span>SCROLL TO FEEL</span></div>
  </section>;
}

function Manifesto() {
  return <section id="manifesto" className="manifesto section-paper">
    <div className="manifesto-grid shell">
      <div className="manifesto-visual js-reveal"><div className="manifesto-photo image-drift"><img src={interior} alt="مساحة معيشة هادئة تتكامل فيها الإضاءة مع العمارة" loading="lazy" /></div><div className="manifesto-photo-small image-drift"><img src={horizonVilla} alt="تفصيل معماري من فيلا معاصرة" loading="lazy" /></div><div className="manifesto-roundel"><span>O</span><small>أنسجم<br />معك</small></div><span className="vertical-caption">سكونٌ في التقنية · حضورٌ في التجربة</span></div>
      <div className="manifesto-copy"><Eyebrow number="01">الفكرة التي تقودنا</Eyebrow><h2 className="manifesto-heading js-reveal">التقنية الأجمل<br />هي التي <em>لا تزاحم،</em><br />بل تنسجم.</h2><div className="manifesto-bottom js-reveal"><p>لا نضيف أنظمة إلى المكان لمجرد أنها ذكية. نبدأ من شكل الحياة داخله، ثم ننسج الإضاءة والمناخ والأمان في تجربة تنسحب إلى الخلف حين لا تحتاجها — وتكون حاضرة حين تفيدك.</p><a className="under-link" href="about.html">اقرأ رؤيتنا <Arrow /></a></div></div>
    </div>
    <div className="manifesto-caption shell"><span>ORLUXA — مفهوم الحياة الذكية</span><span>01 / الفلسفة</span></div>
  </section>;
}

function SolutionsBand() {
  return <section className="solution-band section-ink">
    <LightPath className="band-light-path" />
    <div className="shell solution-band-inner">
      <div className="solution-band-head js-reveal"><div><Eyebrow number="02" light>ثلاث طبقات، منظومة واحدة</Eyebrow><h2>كل شيء يعمل<br /><em>معاً.</em></h2></div><p>تتقاطع عناصر الراحة والأمان في الخلفية، وتظهر لك في واجهة واحدة واضحة؛ متصلة ببعضها، ومفهومة من أول لمسة.</p></div>
      <SpotlightCard className="solution-spotlight" theme="dark" spotlightColor="#91aaff" shape="beam" intensity={0.22} borderGlow={0.42} spotlightSize={390} ambient={false} flare={false}>
        <div className="solution-list">{solutions.map((item) => <a className="solution-row" href={`solutions.html${item.link}`} key={item.no}><span className="solution-no">{item.no}</span><span className="solution-icon">{item.icon}</span><span className="solution-name"><strong>{item.title}</strong><small>{item.en}</small></span><span className="solution-description">{item.copy}</span><Arrow diagonal /></a>)}</div>
      </SpotlightCard>
      <div className="solution-band-foot"><span>LIGHT · CLIMATE · SECURITY</span><a className="under-link under-link-light" href="solutions.html">استكشف كل حل <Arrow /></a></div>
    </div>
  </section>;
}

function SceneStory() {
  const [scene, setScene] = useState("day");
  return <section className={`scene-story section-paper scene-${scene}`}>
    <div className="scene-story-grid shell">
      <div className="scene-copy js-reveal"><Eyebrow number="03">إيقاع المكان</Eyebrow><p className="scene-kicker">من أول ضوء إلى آخر السكون</p><h2>بيتك لا يحتاج<br />إلى أوامر، بل إلى<br /><em>فهم.</em></h2><p className="scene-description">حين تتكامل الأنظمة، تتحول عدة خطوات إلى مشهد واحد. اختر كيف يبدأ يومك، ودع بقية التفاصيل تتناغم مع اختياراتك.</p><div className="scene-tabs" role="tablist" aria-label="اختيار مشهد اليوم"><button className={scene === "day" ? "is-active" : ""} onClick={() => setScene("day")} role="tab" aria-selected={scene === "day"}><span>01</span> نهارٌ صافٍ</button><button className={scene === "night" ? "is-active" : ""} onClick={() => setScene("night")} role="tab" aria-selected={scene === "night"}><span>02</span> مساءٌ هادئ</button></div><div className="scene-readout"><span className="scene-live-dot" /><span>{scene === "day" ? "ضوء طبيعي · مناخ معتدل · ستائر مفتوحة" : "ضوء دافئ · مناخ متوازن · ستائر مغلقة"}</span></div></div>
      <div className="scene-visual js-reveal"><div className="scene-photo image-drift"><img src={interior} alt="مساحة معيشة متصلة مع الحديقة" loading="lazy" /><div className="scene-photo-grade" /></div><div className="scene-outline" /><div className="scene-panel"><div className="scene-panel-head"><span>المشهد الحالي</span><i /></div><strong>{scene === "day" ? "صباح هادئ" : "مساء متوازن"}</strong><div className="scene-controls"><span>الإنارة<b>{scene === "day" ? "72%" : "34%"}</b></span><span>المناخ<b>{scene === "day" ? "22°" : "23°"}</b></span><span>المشهد<b>{scene === "day" ? "DAY" : "NIGHT"}</b></span></div><div className="scene-track"><i style={{ width: scene === "day" ? "72%" : "34%" }} /></div><small>واجهة تحكم تصورية · حالة متزامنة</small></div><span className="scene-image-note">منظومة مترابطة · تحكم واضح</span><span className="scene-index-mark">0{scene === "day" ? "1" : "2"}</span></div>
    </div>
  </section>;
}

function ProjectsTeaser() {
  return <section className="projects-teaser section-sand">
    <div className="shell projects-teaser-inner"><div className="projects-heading js-reveal"><Eyebrow number="04">من الفكرة إلى المساحة</Eyebrow><h2>حين تلتقي الفكرة<br />بـ <em>المكان.</em></h2><p>دراسات تصورية تستكشف طرق دمج التقنية في مشاريع مختلفة — من دون أن تسرق المشهد من العمارة.</p><a className="under-link" href="projects.html">تصفّح المشاريع <Arrow /></a></div>
      <a href="projects.html" className="project-mosaic">
        <div className="project-mosaic-main image-drift"><img src={horizonVilla} alt="فيلا الأفق، تصور معماري لمنزل معاصر" loading="lazy" /><span className="mosaic-label">01 / الرياض · سكن خاص</span><span className="mosaic-open"><Arrow diagonal /></span></div>
        <div className="project-mosaic-detail image-drift"><img src={heroVilla} alt="تفاصيل الإضاءة المسائية في فيلا الأفق" loading="lazy" /><span>إضاءةٌ تتبع حركة اليوم</span></div>
        <div className="project-mosaic-note"><span className="mosaic-line" /><span>فيلا الأفق</span><small>مشروع تصوري · 2026</small></div>
        <div className="project-mosaic-slice" aria-hidden="true"><div /></div>
      </a>
    </div><div className="projects-teaser-foot shell"><span>تخيّل المساحة قبل أن تُبنى</span><span>02 / دراسات تصورية</span></div>
  </section>;
}

function AboutTeaser() {
  return <section className="about-teaser section-paper"><div className="about-teaser-grid shell"><div className="about-teaser-mark js-reveal"><span className="mark-giant">O</span><span className="mark-orbit" /></div><div className="about-teaser-copy js-reveal"><Eyebrow number="05">من نحن</Eyebrow><h2>الإنسان أولاً.<br />والتقنية <em>في مكانها.</em></h2><p>ORLUXA رؤيةٌ لشركة تضع التصميم قبل الأجهزة، وتجعل سهولة التجربة جزءاً من العمارة لا طبقةً مضافة إليها. نؤمن أن نجاح النظام يظهر في ما يتيحه لك، لا في عدد ما يحتويه.</p><a className="under-link" href="about.html">اكتشف رؤيتنا <Arrow /></a></div></div></section>;
}

function Closing() {
  return <section className="closing section-ink"><LightPath className="closing-path" /><div className="shell closing-inner"><Eyebrow number="06" light>الخطوة التالية</Eyebrow><p className="closing-kicker">كل مشروع يبدأ بسؤال جيد</p><h2>كيف تريد أن<br /><em>تشعر في المكان؟</em></h2><div className="closing-bottom"><p>ابدأ بوصف المساحة التي تعمل عليها وما الذي تتمنى أن يتغير فيها. من هناك، تبدأ الصورة بالاتضاح.</p><a className="button button-cream" href="contact.html">ابدأ حواراً <Arrow diagonal /></a></div><span className="closing-watermark">ORLUXA</span></div></section>;
}

function HomePage() {
  return <PageFrame><MotionLayer /><Hero /><Manifesto /><SolutionsBand /><SceneStory /><ProjectsTeaser /><AboutTeaser /><Closing /></PageFrame>;
}

function PageHero({ kicker, titleA, titleB, description, number, image = heroVilla, light = false, large = false }) {
  const enA = { "كل تفصيل": "Every detail", "مساحاتٌ": "Spaces", "نؤمن أن الذكاء": "We believe intelligence", "كل مساحة": "Every space" }[titleA] || titleA;
  const enB = { "ينسجم مع الآخر.": "in harmony.", "تبدأ من فكرة.": "begin with an idea.", "يبدأ بالإنصات.": "begins by listening.", "تبدأ بحوار.": "begins with a conversation." }[titleB] || titleB;
  return <section className={`page-hero ${light ? "page-hero-light" : ""} ${large ? "page-hero-large" : ""}`}><div className="page-hero-image image-drift"><img src={image} alt="" fetchPriority="high" /><span className="page-image-shade" /></div><div className="page-hero-content shell"><div className="breadcrumb"><a href="index.html">الرئيسية</a><span>/</span>{kicker}</div><Eyebrow number={number} light={!light}>{kicker}</Eyebrow><h1><SplitText tag="span" text={tr(titleA, enA)} splitType="words" effect="wave" delay={100} duration={1.05} mask className="page-title-line" textAlign="right" /><SplitText tag="span" text={tr(titleB, enB)} splitType="words" effect="wave" delay={100} duration={1.05} mask className="page-title-line page-title-accent" textAlign="right" /></h1><p>{description}</p></div><span className="page-hero-side">ORLUXA · SMART LIVING</span></section>;
}

function SolutionsPage() {
  const rows = [
    { ...solutions[0], id: "lighting", title: "الإضاءة الذكية", statement: "ضوءٌ يضبط مزاج المساحة، ويكشف جمالها." , copy2: "من أول ضوء صباحي إلى أجواء المساء، تتبدل المشاهد الضوئية بما يناسب ما يحدث داخل المكان. درجات اللون والسطوع قابلة للضبط، وتتصل بالمفاتيح والواجهات التي تنسجم مع التصميم الداخلي.", image: interior, label: "مشهد ضوئي · مساحة معيشة" },
    { ...solutions[1], id: "climate", title: "التحكم بالمناخ", statement: "راحةٌ تستقرّ في الخلفية." , copy2: "تنظيم المناخ لا ينبغي أن يكون مهمة يومية. تتيح الجداول والمشاهد تهيئة المكان قبل وصولك، وتعديل الإعدادات من واجهة واحدة واضحة — مع بقاء قرارك بيدك دائماً.", image: horizonVilla, label: "مناخ متوازن · منزل خاص" },
    { ...solutions[2], id: "security", title: "الأمان المتكامل", statement: "اطمئنانٌ يصل إليك، بهدوء." , copy2: "حالة الأبواب والدخول والتنبيهات ضمن رؤية أوضح للمكان. تتوزع الوظائف بعناية لتحافظ على الخصوصية وتقدم المعلومات التي تهمك حين تحتاجها.", image: heroVilla, label: "حضور هادئ · دخول آمن" },
  ];
  return <PageFrame><MotionLayer /><PageHero kicker="حلولنا" number="01" titleA="كل تفصيل" titleB="ينسجم مع الآخر." description="ثلاثة عناصر أساسية تتكامل خلف تجربة واضحة: ضوءٌ يتبع يومك، مناخٌ يريحك، وأمانٌ يبقى قريباً دون أن يفرض حضوره." image={interior} />
    <section className="page-intro section-paper"><div className="shell page-intro-grid"><Eyebrow number="01">منظومة واحدة</Eyebrow><h2>ليست أجهزةً أكثر.<br /><em>بل حياةٌ أسهل.</em></h2><p>نجمع الأنظمة التي يعتمد عليها المكان في لغة تحكم واحدة. أنت تختار المشهد؛ والمنظومة تنسق التفاصيل المرتبطة به.</p></div></section>
    <section className="solution-chapters section-paper">{rows.map((row, i) => <article className={`solution-chapter ${i % 2 ? "chapter-reverse" : ""}`} id={row.id} key={row.id}><div className="shell chapter-grid"><div className="chapter-visual image-drift js-reveal"><img src={row.image} alt={row.label} loading="lazy"/><span className="chapter-number">{row.no} <i>/ 03</i></span><span className="chapter-caption">{row.label}</span><span className="chapter-outline" /></div><div className="chapter-copy js-reveal"><Eyebrow number={row.no}>{row.title}</Eyebrow><p className="chapter-kicker">{row.en}</p><h2>{row.statement}</h2><p>{row.copy2}</p><div className="chapter-benefit"><span>{row.icon}</span><small>تجربة متصلة<br />مصممة للمكان</small></div></div></div></article>)}</section>
    <Closing /></PageFrame>;
}

function ProjectsPage() {
  return <PageFrame><MotionLayer /><PageHero kicker="المشاريع" number="02" titleA="مساحاتٌ" titleB="تبدأ من فكرة." description="دراسات تصورية توضح كيف يمكن للأنظمة الذكية أن تكمل العمارة. كل مشروع هنا مثال تخيلي لأغراض العرض، لا ادعاء بعمل منفذ." image={horizonVilla} large />
    <section className="project-feature section-paper"><div className="shell"><div className="feature-header js-reveal"><Eyebrow number="01">بيت خاص · الرياض</Eyebrow><h2>فيلا الأفق</h2><p>تصور لمنزل يتغير إيقاعه خلال اليوم، من الوصول حتى لحظة السكون.</p></div><div className="feature-collage"><div className="feature-main image-drift js-reveal"><img src={horizonVilla} alt="الفناء الداخلي لفيلا الأفق التصورية" loading="lazy" /><span>01 · المشهد المعماري</span></div><div className="feature-detail image-drift js-reveal"><img src={interior} alt="غرفة المعيشة في فيلا الأفق" loading="lazy" /><span>02 · مشهد الإضاءة المسائي</span></div><div className="feature-spec js-reveal"><Eyebrow>الفكرة في سطور</Eyebrow><p>مدخل يستقبل بأضواء دافئة، ومساحات المعيشة تتبدل بين العمل والراحة، مع تحكم بالمناخ يحافظ على درجة مريحة دون أن يشتت الانتباه.</p><div className="spec-line"><span>الاستخدام</span><b>سكن خاص</b></div><div className="spec-line"><span>الحلول</span><b>نور · مناخ · أمان</b></div><div className="spec-line"><span>الحالة</span><b>دراسة تصورية</b></div></div><div className="feature-vertical-note">تخيّل · صمّم · انسجم</div></div><div className="concept-disclaimer">كل الصور والتفاصيل المعروضة دراسات بصرية تخيلية لهذا الموقع، وليست مشاريع منفذة أو معلومات عن عملاء حقيقيين.</div></div></section>
    <section className="project-second section-sand"><div className="shell project-second-grid"><div className="second-image image-drift js-reveal"><img src={heroVilla} alt="فيلا معاصرة في ضوء الغروب" loading="lazy" /><span>وجهة ضيافة · جدة · تصور</span></div><div className="second-copy js-reveal"><Eyebrow number="02">السكينة · جدة</Eyebrow><h2>مكانٌ يستقبلك<br /><em>قبل أن تتكلم.</em></h2><p>دراسة لردهة ضيافة تتفاعل فيها الإضاءة مع حركة الوصول، وتظل درجة الحرارة والجو مريحين من دون قوائم تحكم معقدة.</p><a className="under-link" href="contact.html">صمّم دراسة لمساحتك <Arrow /></a></div></div></section><Closing /></PageFrame>;
}

function AboutPage() {
  return <PageFrame><MotionLayer /><PageHero kicker="من نحن" number="03" titleA="نؤمن أن الذكاء" titleB="يبدأ بالإنصات." description="ORLUXA تصورٌ لعلامة تجارية تنطلق من سؤال بسيط: كيف يمكن للتقنية أن تجعل المكان أقرب إلى الإنسان، لا أكثر تعقيداً؟" image={interior} large />
    <section className="about-manifesto section-paper"><div className="shell about-manifesto-grid"><div className="about-image-stack js-reveal"><div className="about-image-main image-drift"><img src={interior} alt="تصميم داخلي يوازن بين الضوء والمواد الطبيعية" loading="lazy" /><span>العمارة تضع الإطار، والتقنية تكمله</span></div><div className="about-image-slip image-drift"><img src={horizonVilla} alt="مواد معمارية طبيعية وفناء مضاء" loading="lazy" /></div><div className="about-roundel">ORLUXA<br /><small>LIGHT · LIFE</small></div></div><div className="about-manifesto-copy"><Eyebrow number="01">قصتنا في سطرين</Eyebrow><h2>نحن لا نضيف<br />تقنيةً للمكان.<br /><em>نقرّب المكان إليك.</em></h2><p>تبدأ هذه الرؤية من أن المنزل أو المساحة التجارية ليسا مجموعة أجهزة. إنهما بيئة تتشكل فيها العادات واللحظات: صباحٌ يحتاج إلى ضوء واضح، مساءٌ يستحق أن يهدأ، ومساحة ينبغي أن تبقى مطمئنة حين تغيب عنها.</p><p>لهذا تقترح ORLUXA منظومة متكاملة تُصمم مع العمارة لا بعدها. تُجمع الإضاءة والتحكم بالمناخ والأمان ضمن تجربة مفهومة، تختصر الخطوات وتحافظ على حرية الاختيار. التقنية هنا ليست استعراضاً؛ إنها طبقة هادئة تجعل تفاصيل الحياة أسهل.</p><p>هذا الموقع يقدم تصوراً إبداعياً للعلامة ورسالتها، لا معلومات عن شركة قائمة أو سجل مشاريع منفذة.</p></div></div></section>
    <section className="about-principles section-ink"><div className="shell"><div className="principles-head js-reveal"><Eyebrow number="02" light>ما الذي يوجّهنا</Eyebrow><h2>ثلاثة مبادئ.<br /><em>قرارٌ واحد.</em></h2><p>كل تفصيل تقني يمر عبر سؤال واحد: هل يجعل علاقتك بالمكان أفضل؟</p></div><div className="principles-list">{[["01","التصميم قبل الأجهزة","تبدأ المنظومة من مخطط المكان وطريقة استخدامه. نختار مواضع الحلول بعناية لتبقى اللغة المعمارية واضحة."],["02","الوضوح قبل التعقيد","التحكم الجيد لا يطلب دليلاً طويلاً. مشاهد يومية وواجهات مفهومة تضع الاختيارات المهمة في متناول اليد."],["03","التقنية في الخلفية","نقيس حضور التقنية بمدى راحتك معها. تعمل الأنظمة معاً، بينما تظل التجربة لك ولمن يشاركك المكان."]].map(([no,title,copy])=><article className="principle-row js-reveal" key={no}><span>{no}</span><h3>{title}</h3><p>{copy}</p><i>✳</i></article>)}</div></div></section>
    <section className="about-method section-paper"><div className="shell"><div className="method-head js-reveal"><Eyebrow number="03">كيف تتحول الرؤية إلى تجربة</Eyebrow><h2>من فهم المساحة<br />إلى <em>تفاصيل تنسجم.</em></h2></div><div className="method-line">{[["01","نستمع","نفهم إيقاع الحياة داخل المساحة، وما الذي ينبغي أن يصبح أسهل."],["02","نخطط","نربط الوظائف بمخطط المكان ونحدد أولويات التحكم والتجربة."],["03","نتكامل","ننسق عناصر الإضاءة والمناخ والأمان في واجهة واحدة واضحة."],["04","نصقل","نراجع المشاهد والتفاصيل حتى تنسجم التقنية مع استخدامك اليومي."]].map(([no,title,copy])=><div className="method-step js-reveal" key={no}><span className="method-dot" /><small>{no}</small><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section><Closing /></PageFrame>;
}

function ContactPage() {
  const submitEnquiry = (event) => {
    event.preventDefault();
    const status = document.getElementById("contact-form-status");
    if (status) status.textContent = language() === "ar" ? "هذه واجهة للعرض فقط؛ لا يتم إرسال البيانات أو حفظها." : "Demo only. Your information is not sent or stored.";
  };
  return <PageFrame><MotionLayer /><PageHero kicker="تواصل معنا" number="04" titleA="كل مساحة" titleB="تبدأ بحوار." description="شاركنا ما تخطط له والتجربة التي تريد أن تعيشها في المكان. أخبرنا عن المساحة، وسنبدأ من فكرتك." image={heroVilla} />
    <section className="contact-section section-paper"><div className="shell contact-grid"><div className="contact-copy js-reveal"><Eyebrow number="01">ابدأ الفكرة</Eyebrow><h2>ما الذي تريد<br />أن يتغيّر <em>في مساحتك؟</em></h2><p>قد تكون بداية مخطط، مساحة تحتاج إلى تطوير، أو مجرد سؤال عن طريقة عمل الحلول الذكية. أخبرنا من أين تحب أن نبدأ.</p><div className="contact-note"><span>ORLUXA · نموذج مفاهيمي</span><p>هذه صفحة تواصل تجريبية ضمن مشروع معرض أعمال. الحقول للعرض، ولا تُرسل البيانات أو تُحفظ.</p></div><div className="contact-direct-link contact-demo-note"><span>✉</span><span><small>واجهة نموذجية</small><b>لا يوجد بريد أو استقبال طلبات فعلي</b></span></div></div><div className="contact-workspace js-reveal"><form className="contact-form" onSubmit={submitEnquiry}>
      <div className="contact-form-heading"><span>01 / ORLUXA</span><h3>ابدأ حوارك معنا</h3><p>نموذج بصري يوضح تجربة التواصل مع العلامة. أضف بيانات تجريبية لترى شكل الواجهة؛ لن تُرسل أو تُحفظ.</p></div>
      <div className="form-fields"><label>الاسم الكامل<input name="name" placeholder="الاسم الذي نناديك به" data-ar-placeholder="الاسم الذي نناديك به" data-en-placeholder="The name we should call you" /></label><label>البريد الإلكتروني<input type="email" name="email" placeholder="name@example.com" data-ar-placeholder="name@example.com" data-en-placeholder="name@example.com" /></label><label>رقم الهاتف <small>اختياري</small><input name="phone" type="tel" placeholder="+966 ··· ··· ···" data-ar-placeholder="+966 ··· ··· ···" data-en-placeholder="+966 ··· ··· ···" /></label><label>نوع المشروع<select name="type" defaultValue=""><option value="" disabled>اختر نوع المشروع</option><option>منزل خاص</option><option>ضيافة أو فندق</option><option>مساحة تجارية</option><option>استشارة أولية</option></select></label><label className="form-message-field">نبذة عن المشروع<textarea name="message" rows="4" placeholder="أخبرنا عن المساحة، احتياجاتك، أو أي تفاصيل تساعدنا على فهم فكرتك." data-ar-placeholder="أخبرنا عن المساحة، احتياجاتك، أو أي تفاصيل تساعدنا على فهم فكرتك." data-en-placeholder="Tell us about the space, your needs, or anything that helps us understand your idea." /></label></div>
      <div className="contact-form-bottom"><div><button className="button button-dark" type="submit">معاينة تفاعلية <Arrow diagonal /></button><small>نموذج للعرض فقط · لا يتم إرسال أو حفظ أي بيانات</small></div><span className="form-monogram">O</span></div><p className="contact-form-status" id="contact-form-status" aria-live="polite" />
    </form><div className="contact-info"><div className="contact-row contact-row-static"><span className="contact-symbol">⌖</span><span><small>الموقع</small><b>الرياض · المملكة العربية السعودية</b></span></div><div className="contact-response"><span className="status-indicator" /> نموذج تجريبي <small>لا يستقبل طلبات فعلية</small></div></div></div></div></section>
    <section className="contact-image-band"><img src={horizonVilla} alt="مساحة معمارية هادئة في ضوء الصباح" loading="lazy" /><div><span>ORLUXA · تصور للحياة الذكية</span><strong>أفكارك تستحق أن تُصغى.</strong></div></section><Closing /></PageFrame>;
}

function App() {
  useEffect(() => {
    applyLanguage();
    const root = document.getElementById("root");
    const observer = new MutationObserver(() => applyLanguage(root));
    observer.observe(root, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, []);
  if (activePage === "solutions") return <SolutionsPage />;
  if (activePage === "projects") return <ProjectsPage />;
  if (activePage === "about") return <AboutPage />;
  if (activePage === "contact") return <ContactPage />;
  return <HomePage />;
}

createRoot(document.getElementById("root")).render(<App />);
