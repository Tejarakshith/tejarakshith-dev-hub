import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaJava, FaPython, FaJs, FaHtml5, FaCss3Alt, FaReact, FaGitAlt, FaGithub,
  FaDatabase, FaBootstrap, FaLinkedin, FaDocker, FaLeaf,
} from "react-icons/fa";
import { SiMysql, SiEclipseide } from "react-icons/si";
import {
  Download, ArrowRight, Mail, Phone, MapPin, Send, Menu, X,
  FileText, Trophy, Cloud, FileSearch, Code2, Sparkles, Users, Wrench,
  BookOpen, Rocket, ChevronDown, ExternalLink,
} from "lucide-react";
import profileImg from "@/assets/profile-new.png";
import RESUME_URL from "@/assets/resume.pdf";
import projCloud from "@/assets/project-cloud.jpg";
import projBook from "@/assets/project-book.jpg";
import projEcom from "@/assets/project-ecom.jpg";
import AiStudio from "./AiStudio";
import "./portfolio.css";
const EMAIL = "tejarakshith.p@gmail.com";
const PHONE = "+91 9381902893";
const LINKEDIN = "https://linkedin.com/in/pagadala-tejarakshith-21032827a";
const LINKEDIN_LABEL = "linkedin.com/in/pagadala-tejarakshith-21032827a";
const GITHUB = "https://github.com/Tejarakshith";
const GITHUB_LABEL = "github.com/Tejarakshith";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "ai-studio", label: "AI Studio" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const TYPED_ROLES = [
  "Software Engineer",
  "Java Developer",
  "Spring Developer",
  "Full Stack Developer",
];

function useTyped(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 40 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return text;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.9, 0.3, 1] as const } },
};

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="pt-section">
      <div className="pt-container">{children}</div>
    </section>
  );
}

function Background() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${18 + Math.random() * 20}s`,
        size: 2 + Math.random() * 3,
        key: i,
      })),
    [],
  );
  return (
    <div className="pt-bg" aria-hidden>
      <div className="pt-bg-grid" />
      <motion.div className="pt-blob pt-blob-1" style={{ y: y1 }} />
      <motion.div className="pt-blob pt-blob-2" style={{ y: y2 }} />
      <div className="pt-blob pt-blob-3" />
      <div className="pt-particles">
        {particles.map((p) => (
          <span
            key={p.key}
            className="pt-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // detect active section
      let current = "home";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 120) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`pt-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="pt-nav-inner">
          <button
            className="pt-logo"
            onClick={() => scrollTo("home")}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span className="pt-logo-mark">PT</span>
          </button>
          <div className="pt-nav-links">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`pt-nav-link ${active === s.id ? "active" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button className="pt-nav-cta" onClick={() => scrollTo("contact")}>
            <span>Let's Talk</span>
            <Send size={14} />
          </button>
          <button
            className="pt-burger"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <div className={`pt-mobile-menu ${open ? "open" : ""}`}>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`pt-nav-link ${active === s.id ? "active" : ""}`}
            onClick={() => {
              scrollTo(s.id);
              setOpen(false);
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </>
  );
}

function Hero() {
  const typed = useTyped(TYPED_ROLES);
  const orbit1 = [
    { cls: "java", icon: <FaJava /> },
    { cls: "react", icon: <FaReact /> },
    { cls: "sql", icon: <FaDatabase /> },
    { cls: "spring", icon: <FaLeaf /> },
  ];
  const orbit2 = [
    { cls: "js", icon: <FaJs /> },
    { cls: "html", icon: <FaHtml5 /> },
    { cls: "py", icon: <FaPython /> },
    { cls: "css", icon: <FaCss3Alt /> },
  ];
  return (
    <section id="home" className="pt-hero">
      <div className="pt-container">
        <div className="pt-hero-grid">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="pt-hero-hi">Hello, I'm</div>
            <h1 className="pt-hero-name">
              Pagadala <br />
              <span className="accent">Tejarakshith</span>
            </h1>
            <div className="pt-typed">
              {typed}
              <span className="pt-typed-cursor" />
            </div>
            <p className="pt-hero-desc">
              Passionate Computer Science graduate currently pursuing M.Tech with expertise in Java, Spring, HTML,
              CSS, JavaScript, SQL and secure software development. Experienced in research documentation and
              statistical result preparation using SPSS, MS Word and Excel.
            </p>
            <div className="pt-hero-cta">
              <a href={RESUME_URL} download target="_blank" rel="noreferrer" className="pt-btn pt-btn-primary">
                Download Resume <Download size={16} />
              </a>
              <button className="pt-btn pt-btn-ghost" onClick={() => scrollTo("projects")}>
                View Projects <ArrowRight size={16} />
              </button>
            </div>
            <div className="pt-social">
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email"><Mail size={18} /></a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }} aria-label="Code"><Code2 size={18} /></a>
            </div>
          </motion.div>

          <motion.div
            className="pt-hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="pt-profile-ring" />
            <div className="pt-profile">
              <img src={profileImg} alt="Pagadala Tejarakshith" width={520} height={520} />
            </div>
            <div className="pt-orbit">
              {orbit1.map((o) => (
                <div key={o.cls} className={`pt-tech ${o.cls}`}>{o.icon}</div>
              ))}
            </div>
            <div className="pt-orbit pt-orbit-2">
              {orbit2.map((o) => (
                <div key={o.cls} className={`pt-tech ${o.cls}`}>{o.icon}</div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ textAlign: "center", marginTop: 60, color: "var(--muted)", fontSize: "0.85rem" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll Down <ChevronDown size={16} style={{ display: "block", margin: "6px auto 0" }} />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const cards = [
    { icon: <Sparkles size={20} />, title: "Quick Learner", body: "I pick up new frameworks and tools fast, and enjoy going deep on the fundamentals." },
    { icon: <Users size={20} />, title: "Team Player", body: "Comfortable pairing, code-reviewing, and shipping features with cross-functional teams." },
    { icon: <Wrench size={20} />, title: "Problem Solver", body: "I like breaking real-world problems into small, testable pieces of software." },
    { icon: <BookOpen size={20} />, title: "Research Docs", body: "Hands-on with SPSS, Word and Excel for thesis and academic result preparation." },
  ];
  return (
    <Section id="about">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
        <div className="pt-section-kicker">About</div>
        <h2 className="pt-section-title">About Me</h2>
        <p className="pt-section-sub">
          A Computer Science graduate pursuing M.Tech, focused on building clean, reliable software and
          contributing to research along the way.
        </p>
      </motion.div>

      <div className="pt-about-grid pt-about">
        <motion.div
          className="pt-about-cards"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {cards.map((c) => (
            <motion.div key={c.title} className="pt-glass" variants={fadeUp}>
              <div className="pt-about-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </motion.div>
          ))}
          <motion.div className="pt-glass" variants={fadeUp} style={{ gridColumn: "1 / -1" }}>
            <h3>Career Objective</h3>
            <p>
              To join a forward-thinking engineering team where I can grow as a Java / Spring / Full-Stack developer,
              build products that matter, and continue contributing to research and documentation.
            </p>
            <div className="pt-fact-list">
              <span>Quick Learner</span>
              <span>Team Player</span>
              <span>Problem Solver</span>
              <span>Research Documentation</span>
              <span>Clean Code Enthusiast</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="pt-glass"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{ marginBottom: 20 }}>My Journey</h3>
          <div className="pt-journey">
            {[
              { year: "2021", body: "Started B.Tech in Computer Science & Engineering." },
              { year: "2024", body: "Developed Secure Cloud Storage Auditing project." },
              { year: "2026", body: "Started M.Tech and freelance research documentation." },
              { year: "Now", body: "Seeking Software Engineer opportunities." },
            ].map((j) => (
              <div key={j.year} className="pt-journey-item">
                <div className="pt-journey-year">{j.year}</div>
                <div className="pt-journey-line">{j.body}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Skills() {
  const groups = [
    {
      title: "Programming Languages",
      items: [
        { name: "Java", icon: <FaJava color="#f89820" /> },
        { name: "Python", icon: <FaPython color="#3776ab" /> },
        { name: "JavaScript", icon: <FaJs color="#f7df1e" /> },
        { name: "HTML", icon: <FaHtml5 color="#e34f26" /> },
        { name: "CSS", icon: <FaCss3Alt color="#264de4" /> },
        { name: "SQL", icon: <FaDatabase color="#4479A1" /> },
      ],
    },
    {
      title: "Frameworks",
      items: [
        { name: "Spring", icon: <FaLeaf color="#6DB33F" /> },
        { name: "React", icon: <FaReact color="#61dafb" /> },
        { name: "Bootstrap", icon: <FaBootstrap color="#7952b3" /> },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "Oracle SQL", icon: <FaDatabase color="#F80000" /> },
        { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "Git", icon: <FaGitAlt color="#f05032" /> },
        { name: "GitHub", icon: <FaGithub color="#fff" /> },
        { name: "VS Code", icon: <Code2 color="#007acc" /> },
        { name: "Eclipse", icon: <SiEclipseide color="#2c2255" /> },
        { name: "Docker", icon: <FaDocker color="#0db7ed" /> },
        { name: "SPSS", icon: <FileSearch color="#c0392b" /> },
        { name: "MS Word", icon: <FileText color="#2b579a" /> },
        { name: "MS Excel", icon: <FileText color="#217346" /> },
      ],
    },
  ];
  return (
    <Section id="skills">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="pt-section-kicker">Skills</div>
        <h2 className="pt-section-title">Tech I Work With</h2>
        <p className="pt-section-sub">A working set of languages, frameworks and tools I use to ship projects and support research.</p>
      </motion.div>

      {groups.map((g) => (
        <div className="pt-skills-group" key={g.title}>
          <h3>{g.title}</h3>
          <motion.div
            className="pt-skills-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          >
            {g.items.map((it) => (
              <motion.div key={it.name} className="pt-skill" variants={fadeUp}>
                <div className="pt-skill-icon">{it.icon}</div>
                <div className="pt-skill-name">{it.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </Section>
  );
}

function Experience() {
  const bullets = [
    "Thesis documentation",
    "Results preparation",
    "Statistical result presentation",
    "SPSS data analysis support",
    "Research data organization",
    "MS Word formatting",
    "MS Excel data handling",
    "Table & chart preparation",
  ];
  return (
    <Section id="experience">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="pt-section-kicker">Experience</div>
        <h2 className="pt-section-title">Where I've Contributed</h2>
        <p className="pt-section-sub">Freelance research and documentation work while pursuing higher studies.</p>
      </motion.div>

      <div className="pt-timeline">
        <motion.div
          className="pt-timeline-item"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="pt-timeline-dot" />
          <div className="pt-glass">
            <div className="pt-exp-head">
              <div>
                <h3>Research Documentation & Thesis Support</h3>
                <div className="pt-exp-role">Freelance</div>
              </div>
              <span className="pt-exp-date">2025 – Present</span>
            </div>
            <ul className="pt-exp-list">
              {bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="pt-tools">
              <span className="pt-tag">SPSS</span>
              <span className="pt-tag">Microsoft Word</span>
              <span className="pt-tag">Microsoft Excel</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Lightweight Secure Cloud Auditing",
      img: projCloud,
      desc: "Developed a secure cloud storage auditing system with data integrity verification, access control and auditing mechanisms for shared cloud environments.",
      tags: ["Java", "SHA-256", "CP-ABE", "TPM"],
    },
    {
      title: "Book Finder",
      img: projBook,
      desc: "Responsive book search application built on Open Library API with a clean, focused user interface.",
      tags: ["React", "Vite", "Open Library API"],
    },
    {
      title: "E-Commerce Website",
      img: projEcom,
      desc: "Responsive shopping site featuring a dynamic cart, local storage persistence and a modern product-first UI.",
      tags: ["HTML", "CSS", "JavaScript"],
    },
  ];
  return (
    <Section id="projects">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="pt-section-kicker">Projects</div>
        <h2 className="pt-section-title">Selected Work</h2>
        <p className="pt-section-sub">A few projects that show how I think about clean code, security and user experience.</p>
      </motion.div>

      <motion.div
        className="pt-projects-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {projects.map((p) => (
          <motion.article key={p.title} className="pt-project" variants={fadeUp}>
            <div className="pt-project-img">
              <img src={p.img} alt={p.title} loading="lazy" width={1024} height={640} />
            </div>
            <div className="pt-project-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="pt-project-tags">
                {p.tags.map((t) => <span key={t} className="pt-tag">{t}</span>)}
              </div>
              <div className="pt-project-btns">
                <a href={GITHUB} target="_blank" rel="noreferrer" className="git">
                  <FaGithub /> GitHub
                </a>
                <a href="#" className="demo">
                  Live Demo <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

function Education() {
  const items = [
    { title: "M.Tech - Computer Science & Engineering", meta: "Currently Pursuing", date: "2026 – Present" },
    { title: "B.Tech - Computer Science & Engineering", meta: "Malla Reddy Institute of Technology & Science (JNTUH) • CGPA 7.04 / 10", date: "2021 – 2025" },
    { title: "Intermediate - MPC", meta: "Narayana Junior College (TSBIE), Hyderabad • 95.2%", date: "2019 – 2021" },
    { title: "SSC - CBSE", meta: "Shivaji Vidyapeeth High School, Hyderabad • 76.6%", date: "2018 – 2019" },
  ];
  const achievements = [
    { icon: <Trophy size={20} />, title: "TS PGECET Rank 721", body: "Percentile 91.8970" },
    { icon: <Cloud size={20} />, title: "Secure Cloud Storage Project", body: "Auditing scheme with CP-ABE & TPM" },
    { icon: <FileText size={20} />, title: "Research Documentation", body: "SPSS, Word & Excel workflows" },
    { icon: <Rocket size={20} />, title: "Java & Full-Stack", body: "Hands-on projects across the stack" },
  ];
  return (
    <Section id="education">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="pt-section-kicker">Education</div>
        <h2 className="pt-section-title">Academic Journey</h2>
        <p className="pt-section-sub">A steady path through computer science, from school to graduate research.</p>
      </motion.div>

      <div className="pt-edu-grid">
        <div className="pt-timeline">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              className="pt-timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <span className="pt-timeline-dot" />
              <div className="pt-glass">
                <div className="pt-exp-head">
                  <h3>{it.title}</h3>
                  <span className="pt-exp-date">{it.date}</span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>{it.meta}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <h3 style={{ fontFamily: "Poppins", fontSize: "1.1rem", marginBottom: 16, color: "var(--accent)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Achievements</h3>
          <div className="pt-achievements">
            {achievements.map((a) => (
              <motion.div key={a.title} className="pt-ach" variants={fadeUp}>
                <div className="pt-ach-icon">{a.icon}</div>
                <h4>{a.title}</h4>
                <p>{a.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Resume() {
  return (
    <Section id="resume">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="pt-section-kicker">Resume</div>
        <h2 className="pt-section-title">Grab My Resume</h2>
        <p className="pt-section-sub">A one-page overview of my experience, projects and skills.</p>
      </motion.div>

      <motion.div
        className="pt-glass pt-resume-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="pt-resume-icon">PDF</div>
        <div className="pt-resume-info">
          <h4>Pagadala_Tejarakshith_Resume.pdf</h4>
          <p>Updated: May 2026</p>
          <p>Size: ~450 KB</p>
        </div>
        <div className="pt-resume-btns">
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="pt-btn pt-btn-ghost">
            <FileText size={16} /> View
          </a>
          <a href={RESUME_URL} download target="_blank" rel="noreferrer" className="pt-btn pt-btn-primary">
            <Download size={16} /> Download
          </a>
        </div>
      </motion.div>
    </Section>
  );
}

function Contact() {
  const [status, setStatus] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    const form = formRef.current;
    if (!form) return;
    // Simple mailto fallback (EmailJS-ready markup with data attributes)
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const subject = (data.get("subject") as string) || "Portfolio Contact";
    const message = (data.get("message") as string) || "";
    if (!name || !email || !message) {
      setStatus("Please fill in your name, email and message.");
      return;
    }
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setStatus("Opening your email client...");
    form.reset();
  };

  return (
    <Section id="contact">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <div className="pt-section-kicker">Contact</div>
        <h2 className="pt-section-title">Let's Build Something</h2>
        <p className="pt-section-sub">Have a role, project or research collaboration in mind? Drop a message.</p>
      </motion.div>

      <div className="pt-contact-grid">
        <motion.div
          className="pt-contact-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pt-contact-row">
            <div className="pt-contact-row-icon"><MapPin size={18} /></div>
            <div><small>Location</small><span>Hyderabad, Telangana, India</span></div>
          </div>
          <a href={`mailto:${EMAIL}`} className="pt-contact-row" style={{ textDecoration: "none" }}>
            <div className="pt-contact-row-icon"><Mail size={18} /></div>
            <div><small>Email</small><span>{EMAIL}</span></div>
          </a>
          <a href={`tel:+919381902893`} className="pt-contact-row" style={{ textDecoration: "none" }}>
            <div className="pt-contact-row-icon"><Phone size={18} /></div>
            <div><small>Phone</small><span>{PHONE}</span></div>
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="pt-contact-row" style={{ textDecoration: "none" }}>
            <div className="pt-contact-row-icon"><FaLinkedin /></div>
            <div><small>LinkedIn</small><span>{LINKEDIN_LABEL}</span></div>
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="pt-contact-row" style={{ textDecoration: "none" }}>
            <div className="pt-contact-row-icon"><FaGithub /></div>
            <div><small>GitHub</small><span>{GITHUB_LABEL}</span></div>
          </a>
        </motion.div>

        <motion.form
          ref={formRef}
          className="pt-glass pt-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <input name="name" placeholder="Your Name" maxLength={100} required />
          <input name="email" type="email" placeholder="Your Email" maxLength={255} required />
          <input name="subject" placeholder="Subject" maxLength={150} />
          <textarea name="message" placeholder="Your Message" maxLength={1000} required />
          <button type="submit" className="pt-btn pt-btn-primary" style={{ alignSelf: "flex-start" }}>
            Send Message <Send size={16} />
          </button>
          {status && <div className="pt-form-msg">{status}</div>}
        </motion.form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="pt-footer">
      <div className="pt-container pt-footer-inner">
        <p>© {new Date().getFullYear()} Pagadala Tejarakshith · Software Engineer</p>
        <p className="center"><span className="pt-logo-mark" style={{ width: 32, height: 32, fontSize: "0.8rem", display: "inline-grid" }}>PT</span></p>
        <p className="right">Designed & developed by Pagadala Tejarakshith</p>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="pt-root">
      <Background />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <AiStudio />
      <Education />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}
