"use client";

import { Linkedin, Twitter, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE_NAME } from "@/lib/constants";

const companyHrefs = ["#about", "#process-study", "#pricing", "#faq", "#contact"];

export default function Footer() {
  const t = useTranslations("footer");

  const services = t.raw("services") as string[];
  const company = t.raw("company") as string[];
  const legal = t.raw("legal") as string[];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="text-xl font-bold font-heading">
              {SITE_NAME}
              <span className="text-primary">.</span>
            </a>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              {t("servicesTitle")}
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-neutral-400 hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              {t("companyTitle")}
            </h4>
            <ul className="space-y-3">
              {company.map((label, i) => (
                <li key={label}>
                  <a
                    href={companyHrefs[i]}
                    className="text-sm text-neutral-400 hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white">
              {t("legalTitle")}
            </h4>
            <ul className="space-y-3">
              {legal.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm text-neutral-400 hover:text-primary transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. {t("copyright")}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-primary transition-colors"
            >
              {t("privacyPolicy")}
            </a>
            <a
              href="#"
              className="text-sm text-neutral-500 hover:text-primary transition-colors"
            >
              {t("termsConditions")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
