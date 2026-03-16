"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import Button from "@/components/ui/Button";

const NAV_HREFS = [
  "#process-study",
  "#about",
  "#pricing",
  "#faq",
  "#testimonials",
  "panel",
];

const NAV_KEYS = ["process", "about", "pricing", "faq", "testimonials", "panel"] as const;

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

const navLinkVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.1 + i * 0.05 },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, staggerChildren: 0.05 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function Navbar() {
  const t = useTranslations("nav");
  const tPanel = useTranslations("panel");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const activeId = useScrollSpy(
    NAV_HREFS.map((h) => h.replace("#", ""))
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsLangOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <motion.a
          href="#"
          className="font-heading text-xl font-bold text-neutral-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Autoweb<span className="text-primary">.</span>
        </motion.a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_KEYS.map((key, i) => {
            const href = NAV_HREFS[i];
            const isPage = !href.startsWith("#");
            const resolvedHref = isPage ? `/${locale}/${href}` : href;
            const label = key === "panel" ? tPanel("navLabel") : t(key);
            return (
              <motion.a
                key={key}
                href={resolvedHref}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navLinkVariants}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isPage
                    ? pathname.includes(`/${href}`)
                      ? "text-primary"
                      : "text-neutral-700"
                    : activeId === href.replace("#", "")
                      ? "text-primary"
                      : "text-neutral-700"
                }`}
              >
                {label}
              </motion.a>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-neutral-700 hover:text-primary transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              {locale.toUpperCase()}
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 min-w-[80px]">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`block w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-neutral-50 ${
                      locale === l.code
                        ? "text-primary font-semibold"
                        : "text-neutral-700"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button href="https://wa.me/543416446621" size="sm">
            {t("getStarted")}
          </Button>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 text-neutral-900 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-16 bg-white z-40"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_KEYS.map((key, i) => {
                const href = NAV_HREFS[i];
                const isPage = !href.startsWith("#");
                const resolvedHref = isPage ? `/${locale}/${href}` : href;
                const label = key === "panel" ? tPanel("navLabel") : t(key);
                return (
                <motion.a
                  key={key}
                  href={resolvedHref}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-lg font-medium text-neutral-700 hover:text-primary py-2"
                  variants={mobileLinkVariants}
                >
                  {label}
                </motion.a>
                );
              })}
              <motion.div className="flex gap-2 mt-2" variants={mobileLinkVariants}>
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { switchLocale(l.code); setIsMobileOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer ${
                      locale === l.code
                        ? "bg-primary text-white"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
              <motion.div className="mt-4" variants={mobileLinkVariants}>
                <Button href="https://wa.me/543416446621" className="w-full">
                  {t("getStarted")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
