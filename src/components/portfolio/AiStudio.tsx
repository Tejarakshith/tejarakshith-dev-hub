import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play, X, ArrowRight, Mail } from "lucide-react";




import brandLaunch from "@/assets/ai-studio/brand-launch.png";
import productReel from "@/assets/ai-studio/product-reel.mp4";
import aiPortrait1 from "@/assets/ai-studio/ai-portrait-1.png";
import aiPortrait2 from "@/assets/ai-studio/ai-portrait-2.png";
import instagramCampaign from "@/assets/ai-studio/instagram-campaign.mp4";
import collegeEvent from "@/assets/ai-studio/college-event.png";
import youtubeShort from "@/assets/ai-studio/youtube-short.mp4";
import aiConceptArt from "@/assets/ai-studio/ai-concept-art.mp4";
import storyTemplates from "@/assets/ai-studio/story-templates.mp4";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.9, 0.3, 1] as const } },
};

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

type Category = "All" | "Posters" | "Videos" | "AI Images" | "Social Media";
type MediaKind = "image" | "video" | "images";

type GalleryItem = {
  title: string;
  category: Exclude<Category, "All">;
  kind: MediaKind;
  src: string;
  extra?: string;
};

const SERVICES = [
  {
    emoji: "🎨",
    title: "AI Poster Design",
    items: ["Business Promotions", "Product Advertisements", "Educational Posters", "College Events", "Social Media Campaigns", "Brand Promotions"],
  },
  {
    emoji: "🎬",
    title: "AI Promotional Videos",
    play: true,
    items: ["Product Promotions", "Brand Advertisements", "Instagram Reels", "YouTube Shorts", "Event Promotions", "AI Motion Graphics"],
  },
  {
    emoji: "🤖",
    title: "AI Content Creation",
    items: ["AI Images", "Social Media Graphics", "Infographics", "Presentations", "Marketing Creatives", "Advertisement Designs"],
  },
  {
    emoji: "💡",
    title: "Prompt Engineering",
    items: ["AI Image Generation", "AI Video Generation", "Marketing Content", "Educational Content", "Creative Automation"],
  },
];

const FILTERS: Category[] = ["All", "Posters", "Videos", "AI Images", "Social Media"];

const GALLERY: GalleryItem[] = [
  { title: "Brand Launch Poster", category: "Posters", kind: "image", src: brandLaunch },
  { title: "Product Reel", category: "Videos", kind: "video", src: productReel },
  { title: "AI Portrait Series", category: "AI Images", kind: "images", src: aiPortrait1, extra: aiPortrait2 },
  { title: "Instagram Campaign", category: "Social Media", kind: "video", src: instagramCampaign },
  { title: "College Event Poster", category: "Posters", kind: "image", src: collegeEvent },
  { title: "YouTube Short", category: "Videos", kind: "video", src: youtubeShort },
  { title: "AI Concept Art", category: "AI Images", kind: "video", src: aiConceptArt },
  { title: "Story Templates", category: "Social Media", kind: "video", src: storyTemplates },
];

const TOOLS: { name: string; slug: string; color: string }[] = [
  { name: "ChatGPT", slug: "openai", color: "10A37F" },
  { name: "Google Flow", slug: "google", color: "4285F4" },
  { name: "Canva", slug: "canva", color: "00C4CC" },
  { name: "Adobe Express", slug: "adobe", color: "FF0000" },
  { name: "Edits", slug: "instagram", color: "E1306C" },
  { name: "Gemini", slug: "googlegemini", color: "8AB4F8" },
];

function Thumb({ item }: { item: GalleryItem }) {
  if (item.kind === "video") {
    return (
      <>
        <div className="pt-ai-item-video-badge" aria-hidden><Play size={16} fill="currentColor" /></div>
        <video src={item.src} muted loop playsInline preload="metadata" onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
      </>
    );
  }
  return <img src={item.src} alt={item.title} loading="lazy" />;
}

export default function AiStudio() {
  const [filter, setFilter] = useState<Category>("All");
  const [openItem, setOpenItem] = useState<null | GalleryItem>(null);

  const filtered = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <section id="ai-studio" className="pt-section">
      <div className="pt-container">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <div className="pt-section-kicker">AI Creative Studio</div>
          <div className="pt-ai-title-row">
            <span className="pt-ai-glow-icon" aria-hidden><Sparkles size={22} /></span>
            <h2 className="pt-section-title" style={{ margin: 0 }}>AI Creative Studio</h2>
          </div>
          <p className="pt-section-sub" style={{ marginTop: 14 }}>
            Transforming ideas into engaging AI-powered visuals, promotional videos, and creative digital content.
          </p>
          <p className="pt-ai-intro">
            I leverage modern AI tools to create high-quality promotional posters, social media creatives,
            AI-generated videos, educational content, marketing materials, and engaging visual assets. By combining
            creativity with technology, I help individuals, businesses, and organizations communicate their ideas
            through impactful digital content.
          </p>
        </motion.div>

        <motion.div
          className="pt-ai-services"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.title} className="pt-glass pt-ai-service" variants={fadeUp}>
              {s.play && <div className="play-hint" aria-hidden><Play size={16} fill="currentColor" /></div>}
              <div className="emoji" aria-hidden>{s.emoji}</div>
              <h3>{s.title}</h3>
              <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <h3 style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "1.4rem", marginBottom: 20 }}>
            Creative Portfolio
          </h3>
        </motion.div>

        <div className="pt-ai-filters">
          {FILTERS.map((f) => (
            <button key={f} className={`pt-ai-filter ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <motion.div
          className="pt-ai-gallery"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          key={filter}
        >
          {filtered.map((g) => (
            <motion.div key={g.title} className="pt-ai-item" variants={fadeUp} onClick={() => setOpenItem(g)}>
              <div className="pt-ai-item-img">
                <Thumb item={g} />
              </div>
              <div className="pt-ai-item-body">
                <small>{g.category}</small>
                <h4>{g.title}</h4>
                <button className="pt-ai-item-view" onClick={(e) => { e.stopPropagation(); setOpenItem(g); }}>
                  View <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="pt-ai-tools-wrap" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <div className="pt-ai-tools-title">Tools I Use</div>
          <div className="pt-ai-tools">
            {TOOLS.map((t) => (
              <motion.span key={t.name} className="pt-ai-tool" whileHover={{ y: -3, scale: 1.04 }}>
                <img src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`} alt="" aria-hidden width={18} height={18} loading="lazy" />
                {t.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div className="pt-glass pt-ai-cta" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p>
            Looking for professional AI-powered posters, promotional videos, or creative marketing content?
            Let's create something impactful together.
          </p>
          <div className="pt-ai-cta-btns">
            <button className="pt-btn pt-btn-primary" onClick={() => scrollTo("ai-studio")}>
              View Creative Portfolio <ArrowRight size={16} />
            </button>
            <button className="pt-btn pt-btn-ghost" onClick={() => scrollTo("contact")}>
              Let's Collaborate <Mail size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      {openItem && (
        <div className="pt-ai-modal" onClick={() => setOpenItem(null)} role="dialog" aria-modal="true">
          <div className="pt-ai-modal-inner" onClick={(e) => e.stopPropagation()}>
            {openItem.kind === "video" ? (
              <video src={openItem.src} controls autoPlay playsInline />
            ) : openItem.kind === "images" && openItem.extra ? (
              <div className="pt-ai-modal-gallery">
                <img src={openItem.src} alt={openItem.title} />
                <img src={openItem.extra} alt={openItem.title} />
              </div>
            ) : (
              <img src={openItem.src} alt={openItem.title} />
            )}
            <div className="pt-ai-modal-body">
              <div>
                <small>{openItem.category}</small>
                <h4>{openItem.title}</h4>
              </div>
              <button className="pt-ai-modal-close" aria-label="Close" onClick={() => setOpenItem(null)}>
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
