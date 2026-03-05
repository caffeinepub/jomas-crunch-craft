import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Heart,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// Image imports — ensures the build system bundles all images correctly
import imgCakeChocolate from "/assets/generated/cake-chocolate.dim_600x600.jpg";
import imgCakeCupcakes from "/assets/generated/cake-cupcakes.dim_600x600.jpg";
import imgCakeFruit from "/assets/generated/cake-fruit.dim_600x600.jpg";
import imgCakePrincess from "/assets/generated/cake-princess.dim_600x600.jpg";
import imgCakeRedvelvet from "/assets/generated/cake-redvelvet.dim_600x600.jpg";
import imgCakeVanilla from "/assets/generated/cake-vanilla.dim_600x600.jpg";
import imgHeroCake from "/assets/generated/hero-cake.dim_1200x600.jpg";
import imgHomemadeFood from "/assets/generated/homemade-food.dim_600x400.jpg";
import imgPickles from "/assets/generated/pickles-assorted.dim_600x400.jpg";
import { useSubmitOrderInquiry } from "./hooks/useQueries";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";

// ─── Data ────────────────────────────────────────────────────────────────────

const cakes = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    description: "Rich dark chocolate with gold leaf garnish",
    image: imgCakeChocolate,
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Red Velvet Cake",
    description: "Classic red velvet with velvety cream cheese frosting",
    image: imgCakeRedvelvet,
    tag: "Signature",
  },
  {
    id: 3,
    name: "Vanilla Birthday Cake",
    description: "Light and fluffy with colorful sprinkles",
    image: imgCakeVanilla,
    tag: "Popular",
  },
  {
    id: 4,
    name: "Fresh Fruit Cake",
    description: "Loaded with seasonal fresh fruits",
    image: imgCakeFruit,
    tag: "Fresh",
  },
  {
    id: 5,
    name: "Princess Dream Cake",
    description: "Elegant fondant design, perfect for special occasions",
    image: imgCakePrincess,
    tag: "Premium",
  },
  {
    id: 6,
    name: "Cupcake Bouquet",
    description: "Assorted flavors with swirled buttercream",
    image: imgCakeCupcakes,
    tag: "Gift",
  },
];

const categories = [
  {
    name: "Homemade Food",
    description:
      "Freshly prepared home-style meals made with love, using traditional family recipes passed down through generations.",
    image: imgHomemadeFood,
    icon: "🍲",
  },
  {
    name: "Cakes & Bakes",
    description:
      "Custom cakes for every celebration — birthdays, weddings, anniversaries and all your special moments.",
    image: null,
    icon: "🎂",
  },
  {
    name: "Kerala Style Pickles",
    description:
      "Authentic Kerala-style pickles — fiery, tangy, and deeply aromatic. Made with traditional spices, coconut oil, and age-old recipes from God's Own Country.",
    image: imgPickles,
    icon: "🫙",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

import type { Variants } from "motion/react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", ocid: "nav.home_link" },
    { label: "Cakes", href: "#cakes", ocid: "nav.cakes_link" },
    { label: "Products", href: "#products", ocid: "nav.products_link" },
    { label: "About", href: "#about", ocid: "nav.about_link" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-cream/95 backdrop-blur-md shadow-md border-b border-brand-gold/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="text-brand-gold text-2xl">✦</span>
          <div className="leading-tight">
            <span
              className="font-display font-bold text-base tracking-wide text-brand-burgundy block"
              style={{ lineHeight: "1.1" }}
            >
              JOMAS
            </span>
            <span
              className="font-display text-xs tracking-[0.3em] text-brand-rose uppercase block"
              style={{ lineHeight: "1.1" }}
            >
              CRUNCH CRAFT
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={link.ocid}
              className="font-body text-sm font-medium text-foreground/70 hover:text-brand-burgundy transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-brand-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#order">
            <Button
              data-ocid="nav.order_button"
              className="btn-gold h-9 px-5 rounded-full text-xs"
            >
              Order Now
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-brand-burgundy"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-cream/98 backdrop-blur-md border-b border-brand-gold/20 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={link.ocid}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm font-medium text-foreground/70 hover:text-brand-burgundy py-1"
                >
                  {link.label}
                </a>
              ))}
              <Button
                data-ocid="nav.order_button"
                className="btn-gold h-9 px-5 rounded-full text-xs w-full mt-1"
                onClick={() => setMenuOpen(false)}
                asChild
              >
                <a href="#order">Order Now</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image — shows through at top, fades at bottom */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgHeroCake}
          alt="JOMAS CRUNCH CRAFT hero"
          className="w-full h-full object-cover object-center scale-105"
          style={{ objectPosition: "center 30%" }}
        />
        {/* Bottom-weighted vignette — lets the photo breathe at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep/30 via-brand-deep/55 to-brand-deep/92" />
        {/* Side vigettes for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/50 via-transparent to-brand-deep/50" />
        {/* Warm burgundy tint in lower half */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-brand-burgundy/40 to-transparent" />
      </div>

      {/* Ambient glow behind text block */}
      <div
        className="hero-glow absolute top-1/2 left-1/2 z-[1]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Floating ornaments */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 8, 0] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-28 left-10 text-brand-gold/25 text-5xl pointer-events-none hidden lg:block select-none"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -6, 0] }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-40 right-14 text-brand-gold/18 text-3xl pointer-events-none hidden lg:block select-none"
      >
        ❋
      </motion.div>
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-36 left-20 text-brand-gold/20 text-4xl pointer-events-none hidden lg:block select-none"
      >
        ✿
      </motion.div>
      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, 4, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-48 right-20 text-brand-gold/15 text-3xl pointer-events-none hidden xl:block select-none"
      >
        ✦
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Pre-title eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-brand-gold/70 block" />
          <span className="font-body text-brand-gold text-[0.65rem] uppercase tracking-[0.4em]">
            Handcrafted with Love
          </span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-brand-gold/70 block" />
        </motion.div>

        {/* Main headline — unified, stacked typographic composition */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-bold text-white leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", lineHeight: 0.92 }}
          >
            JOMAS
          </h1>
          {/* Gold ornament line */}
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-brand-gold/80 to-brand-gold/60" />
            <span className="text-brand-gold text-base tracking-widest">
              ✦ ✦ ✦
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-brand-gold/80 to-brand-gold/60" />
          </div>
          <h1
            className="font-display font-bold text-gold-shimmer leading-none tracking-[0.12em] select-none"
            style={{ fontSize: "clamp(1.8rem, 6vw, 4.8rem)", lineHeight: 1 }}
          >
            CRUNCH CRAFT
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-serif italic text-white/80 mt-6 mb-1"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)" }}
        >
          Baked to Perfection, Made with Heart
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="font-body text-white/45 mb-10 tracking-[0.25em] uppercase"
          style={{ fontSize: "0.68rem" }}
        >
          Cakes &nbsp;·&nbsp; Homemade Food &nbsp;·&nbsp; Kerala Pickles
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#order">
            <Button
              data-ocid="hero.primary_button"
              className="btn-gold h-13 px-12 rounded-full text-sm shadow-lg shadow-brand-gold/25"
              style={{
                height: "3.25rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
              }}
            >
              Order Now
            </Button>
          </a>
          <a href="#cakes">
            <Button
              variant="outline"
              className="h-13 px-10 rounded-full text-sm border-white/30 text-white/90 bg-white/8 hover:bg-white/16 backdrop-blur-sm font-body uppercase tracking-widest"
              style={{ height: "3.25rem" }}
            >
              Explore Cakes
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40"
      >
        <span className="font-body text-[0.6rem] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}

// ─── Cake Gallery ─────────────────────────────────────────────────────────────

function CakeGallerySection() {
  return (
    <section
      id="cakes"
      className="py-24 px-4 relative"
      style={{ backgroundColor: "oklch(var(--brand-parchment))" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
          style={{ background: "oklch(0.82 0.12 65 / 0.12)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
          style={{ background: "oklch(0.42 0.14 12 / 0.07)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-gold mb-3">
            ✦ Our Specialties ✦
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-brand-burgundy leading-tight mb-4">
            Our Signature Cakes
          </h2>
          <div className="section-divider">✦</div>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-base">
            Every cake is crafted with the finest ingredients, baked fresh, and
            decorated with artisan care to make your moments unforgettable.
          </p>
        </motion.div>

        {/* Cake grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {cakes.map((cake, idx) => (
            <motion.div
              key={cake.id}
              variants={cardVariant}
              data-ocid={`cake_gallery.item.${idx + 1}`}
              className="group relative bg-card rounded-2xl overflow-hidden card-hover shadow-md"
              style={{ border: "1px solid oklch(0.82 0.12 65 / 0.2)" }}
            >
              {/* Image — 4:5 aspect for tall cake compositions */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{
                    transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                {/* Always-on subtle bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.2 0.06 20 / 0.55), transparent)",
                  }}
                />
                {/* Tag badge */}
                <span
                  className="absolute top-3 left-3 text-xs font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.82 0.12 65)",
                    color: "oklch(0.22 0.06 30)",
                    boxShadow: "0 2px 8px oklch(0.78 0.13 65 / 0.4)",
                  }}
                >
                  {cake.tag}
                </span>
                {/* Hover reveal panel — slides up from bottom */}
                <div className="cake-card-overlay">
                  <a
                    href="#order"
                    className="flex items-center justify-between w-full group/cta"
                  >
                    <span className="font-serif italic text-white/90 text-sm leading-tight">
                      {cake.name}
                    </span>
                    <span
                      className="flex items-center gap-1.5 font-body text-xs uppercase tracking-wider shrink-0 ml-3 transition-all duration-200 group-hover/cta:gap-2.5"
                      style={{ color: "oklch(0.88 0.13 75)" }}
                    >
                      Order
                      <span>→</span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 pb-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif font-semibold text-base text-brand-burgundy leading-snug">
                    {cake.name}
                  </h3>
                  <div className="flex items-center gap-0.5 shrink-0 pt-0.5">
                    {["s1", "s2", "s3", "s4", "s5"].map((s) => (
                      <Star
                        key={s}
                        size={10}
                        className="fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {cake.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Product Categories ───────────────────────────────────────────────────────

function ProductCategoriesSection() {
  return (
    <section
      id="products"
      className="py-24 px-4 bg-brand-burgundy relative overflow-hidden"
    >
      {/* Background textures */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.9 0.1 70) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-white/5" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-gold mb-3">
            ✦ What We Offer ✦
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
            Our Products
          </h2>
          <div className="section-divider">✦</div>
          <p className="font-body text-white/65 mt-4 max-w-xl mx-auto text-base">
            From soul-warming homemade meals to celebration cakes and
            traditional pickles — everything made fresh, made with love.
          </p>
        </motion.div>

        {/* Category cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              variants={cardVariant}
              data-ocid={`products.item.${idx + 1}`}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/15 card-hover"
            >
              {/* Image or gradient fallback */}
              <div className="relative h-52 overflow-hidden">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-gold/60 via-brand-rose/40 to-brand-burgundy/60 flex items-center justify-center">
                    <span className="text-7xl">{cat.icon}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-4xl">
                  {cat.icon}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl text-white mb-2">
                  {cat.name}
                </h3>
                <p className="font-body text-white/70 text-sm leading-relaxed">
                  {cat.description}
                </p>
                <a
                  href="#order"
                  className="mt-4 font-body text-brand-gold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200 group/btn"
                >
                  Order Now
                  <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const stats = [
    { value: "500+", label: "Happy Customers" },
    { value: "50+", label: "Cake Varieties" },
    { value: "100%", label: "Fresh Ingredients" },
    { value: "5★", label: "Customer Rating" },
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-xs uppercase tracking-[0.3em] text-brand-gold mb-3"
            >
              ✦ Our Story ✦
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-4xl sm:text-5xl text-brand-burgundy leading-tight mb-4"
            >
              Made with Love,{" "}
              <span className="italic text-brand-rose">Every Time</span>
            </motion.h2>
            <div className="section-divider !mx-0 !mb-6">✦</div>

            <motion.div
              variants={fadeUp}
              className="space-y-4 font-body text-foreground/75 leading-relaxed"
            >
              <p>
                Welcome to{" "}
                <strong className="text-brand-burgundy">
                  JOMAS CRUNCH CRAFT
                </strong>{" "}
                — where every bite tells a story of passion, tradition, and
                love. Born from a deep desire to bring the warmth of home-cooked
                goodness to your table, we craft each product with unwavering
                care.
              </p>
              <p>
                Our{" "}
                <strong className="text-brand-burgundy">
                  handcrafted cakes
                </strong>{" "}
                are made fresh for every order — from decadent chocolate
                truffles to elegant wedding-worthy tiers. We use only the finest
                ingredients: real butter, fresh eggs, premium chocolate, and
                seasonal fruits.
              </p>
              <p>
                Beyond cakes, we bring you{" "}
                <strong className="text-brand-burgundy">homemade meals</strong>{" "}
                prepared with traditional family recipes, and{" "}
                <strong className="text-brand-burgundy">
                  Kerala style pickles
                </strong>{" "}
                bursting with bold flavors from age-old techniques. No
                preservatives. No shortcuts. Just pure, honest food.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              {[
                "No Preservatives",
                "Fresh Daily",
                "Custom Orders",
                "Home Delivery",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs uppercase tracking-wide bg-brand-ivory border border-brand-gold/30 text-brand-burgundy px-4 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats + decorative card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="space-y-5"
          >
            {/* Stats grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "oklch(var(--brand-parchment))",
                    border: "1px solid oklch(0.82 0.12 65 / 0.22)",
                    boxShadow: "0 2px 12px oklch(0.42 0.14 12 / 0.06)",
                  }}
                >
                  <div className="font-display font-bold text-3xl text-brand-burgundy mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Testimonial card */}
            <motion.div
              variants={fadeUp}
              className="bg-brand-burgundy rounded-2xl p-7 relative overflow-hidden"
            >
              <div className="absolute top-3 right-5 text-6xl text-white/10 font-display font-bold leading-none">
                "
              </div>
              <div className="flex gap-1 mb-3">
                {["t1", "t2", "t3", "t4", "t5"].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className="fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>
              <p className="font-serif italic text-white/90 text-sm leading-relaxed mb-4">
                "The chocolate truffle cake from JOMAS CRUNCH CRAFT was the
                highlight of our anniversary dinner. Every layer was perfection
                — rich, moist, and absolutely divine!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-brand-deep font-body font-bold text-sm">
                  P
                </div>
                <div>
                  <p className="font-body font-semibold text-white text-sm">
                    Priya Sharma
                  </p>
                  <p className="font-body text-xs text-white/50">
                    Loyal Customer
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Order Form ───────────────────────────────────────────────────────────────

function OrderSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const mutation = useSubmitOrderInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    mutation.mutate(
      { name: name.trim(), phone: phone.trim(), message: message.trim() },
      {
        onSuccess: () => {
          setName("");
          setPhone("");
          setMessage("");
          toast.success("Order inquiry submitted! We'll contact you soon.");
        },
        onError: () => {
          toast.error("Failed to submit. Please try again.");
        },
      },
    );
  };

  return (
    <section
      id="order"
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 80% 10%, oklch(0.82 0.12 65 / 0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 10% 90%, oklch(0.42 0.14 12 / 0.1) 0%, transparent 55%),
          oklch(var(--brand-linen))
        `,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.82 0.12 65 / 0.08)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "oklch(0.42 0.14 12 / 0.06)" }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-brand-gold mb-3">
            ✦ Get in Touch ✦
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-brand-burgundy leading-tight mb-4">
            Place Your Order
          </h2>
          <div className="section-divider">✦</div>
          <p className="font-body text-muted-foreground mt-4 text-base">
            Tell us what you'd like and we'll get back to you within 24 hours
            with details and pricing.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <div
            className="rounded-3xl p-8"
            style={{
              background: "oklch(var(--brand-cream))",
              border: "1px solid oklch(0.82 0.12 65 / 0.25)",
              boxShadow:
                "0 8px 40px oklch(0.42 0.14 12 / 0.1), 0 2px 8px oklch(0.42 0.14 12 / 0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              {mutation.isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  data-ocid="order_form.success_state"
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-burgundy mb-2">
                    Order Received!
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Thank you! We'll reach out to you soon to confirm your order
                    details.
                  </p>
                  <button
                    type="button"
                    onClick={() => mutation.reset()}
                    className="mt-6 font-body text-sm text-brand-burgundy underline underline-offset-2 hover:text-brand-rose"
                  >
                    Place another order
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="order-name"
                      className="font-body text-sm font-medium text-foreground"
                    >
                      Your Name
                    </Label>
                    <Input
                      id="order-name"
                      data-ocid="order_form.input"
                      placeholder="e.g. Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-xl border-brand-gold/30 focus:border-brand-burgundy font-body"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="order-phone"
                      className="font-body text-sm font-medium text-foreground"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="order-phone"
                      data-ocid="order_form.phone_input"
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11 rounded-xl border-brand-gold/30 focus:border-brand-burgundy font-body"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="order-message"
                      className="font-body text-sm font-medium text-foreground"
                    >
                      Order Details
                    </Label>
                    <Textarea
                      id="order-message"
                      data-ocid="order_form.textarea"
                      placeholder="Tell us what you'd like to order — cake type, flavour, quantity, occasion, date needed..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="rounded-xl border-brand-gold/30 focus:border-brand-burgundy font-body resize-none"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {mutation.isError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        data-ocid="order_form.error_state"
                        className="flex items-center gap-2 text-destructive text-sm font-body bg-destructive/10 rounded-lg px-4 py-3"
                      >
                        <AlertCircle size={16} />
                        Something went wrong. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <Button
                    type="submit"
                    data-ocid="order_form.submit_button"
                    disabled={mutation.isPending}
                    className="btn-burgundy w-full h-12 rounded-xl text-sm"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2
                          className="mr-2 h-4 w-4 animate-spin"
                          data-ocid="order_form.loading_state"
                        />
                        Sending Your Order...
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Send Order Inquiry
                      </>
                    )}
                  </Button>

                  <p className="font-body text-xs text-muted-foreground text-center">
                    We'll reply within 24 hours · 100% handcrafted with love
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-deep text-white/80 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-gold text-2xl">✦</span>
              <div>
                <p className="font-display font-bold text-lg text-white tracking-wide">
                  JOMAS CRUNCH CRAFT
                </p>
                <p className="font-body text-xs text-brand-gold tracking-widest uppercase">
                  Handcrafted with Love
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-white/55 leading-relaxed">
              Premium homemade cakes, fresh food, and Kerala style pickles made
              with love and the finest ingredients.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Cakes", "Products", "About", "Order Now"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className="font-body text-sm text-white/55 hover:text-brand-gold transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:jomascrunchcraft@gmail.com"
                  className="flex items-center gap-2.5 font-body text-sm text-white/55 hover:text-brand-gold transition-colors duration-200"
                >
                  <Mail size={14} className="text-brand-gold shrink-0" />
                  jomascrunchcraft@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919562369930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-body text-sm text-white/55 hover:text-brand-gold transition-colors duration-200"
                >
                  <MessageCircle
                    size={14}
                    className="text-brand-gold shrink-0"
                  />
                  WhatsApp: +91 9562369930
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jomas_world_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-body text-sm text-white/55 hover:text-brand-gold transition-colors duration-200"
                >
                  <Instagram size={14} className="text-brand-gold shrink-0" />
                  @jomas_world_
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-body text-sm text-white/55">
                <MapPin size={14} className="text-brand-gold shrink-0" />
                Home delivery available
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            © {year} JOMAS CRUNCH CRAFT · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919562369930"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white/40 hover:text-brand-gold transition-colors duration-200"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="https://www.instagram.com/jomas_world_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/40 hover:text-brand-gold transition-colors duration-200"
            >
              <Instagram size={16} />
            </a>
            <p className="font-body text-xs text-white/40 flex items-center gap-1">
              Built with{" "}
              <Heart size={10} className="fill-brand-gold text-brand-gold" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold hover:text-brand-gold/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>

        {/* Admin link — unobtrusive */}
        <div className="mt-4 text-center">
          <a
            href="/admin"
            data-ocid="footer.admin_link"
            className="font-body text-[0.65rem] text-white/20 hover:text-white/40 transition-colors duration-200 tracking-wider"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────

function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://wa.me/919562369930"
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="floating.whatsapp_button"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 cursor-pointer"
      style={{ filter: "drop-shadow(0 4px 16px rgba(37,211,102,0.45))" }}
    >
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="font-body text-xs font-semibold text-white bg-[#25D366] px-3 py-1.5 rounded-full shadow-md whitespace-nowrap"
          >
            Chat with us!
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button circle */}
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="w-14 h-14 rounded-full flex items-center justify-center relative"
        style={{ background: "#25D366" }}
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: "#25D366" }}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.494.653 4.837 1.793 6.872L2 30l7.328-1.766A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 01-5.858-1.607l-.42-.248-4.347 1.048 1.075-4.233-.273-.436A11.47 11.47 0 014.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.617c-.345-.172-2.04-1.006-2.356-1.12-.317-.115-.547-.172-.778.172-.23.345-.893 1.12-1.094 1.35-.2.23-.402.258-.747.086-.345-.172-1.456-.537-2.773-1.71-1.025-.913-1.717-2.04-1.918-2.384-.2-.345-.022-.53.151-.702.155-.155.345-.403.518-.604.172-.2.23-.345.345-.575.115-.23.057-.432-.029-.604-.086-.172-.778-1.877-1.066-2.57-.28-.675-.565-.583-.778-.594l-.662-.011c-.23 0-.604.086-.92.432-.317.345-1.208 1.18-1.208 2.878s1.237 3.338 1.41 3.568c.172.23 2.435 3.717 5.9 5.21.824.356 1.468.569 1.969.728.827.263 1.58.226 2.174.137.663-.099 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.317-.23-.662-.402z" />
        </svg>
      </motion.div>
    </motion.a>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <CakeGallerySection />
        <ProductCategoriesSection />
        <AboutSection />
        <OrderSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

// ─── Router Setup ─────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  adminRoute,
  adminDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Augment the auto-generated backendInterface to include authorization
// component methods (_initializeAccessControlWithSecret) that are present
// at runtime but not yet reflected in the generated backend.d.ts.
declare module "./backend" {
  interface backendInterface {
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    getCallerUserRole(): Promise<{ __kind__: string }>;
    isCallerAdmin(): Promise<boolean>;
  }
  interface Backend {
    _initializeAccessControlWithSecret(userSecret: string): Promise<void>;
    getCallerUserRole(): Promise<{ __kind__: string }>;
    isCallerAdmin(): Promise<boolean>;
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
