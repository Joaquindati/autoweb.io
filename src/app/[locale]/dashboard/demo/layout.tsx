"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  LayoutDashboard, Activity, Map, BarChart3, FileText, ArrowLeft, Menu, X,
} from "lucide-react";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const base = `/${locale}/dashboard/demo`;
  const navLinks = [
    { label: t("overview"), href: base, icon: LayoutDashboard },
    { label: t("monitor"), href: `${base}/monitor`, icon: Activity },
    { label: t("progress"), href: `${base}/progress`, icon: Map },
    { label: t("analytics"), href: `${base}/analytics`, icon: BarChart3 },
    { label: t("reports"), href: `${base}/reports`, icon: FileText },
  ];

  function isActive(href: string) {
    return href === base ? pathname === base : pathname.startsWith(href);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <span className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-lg font-bold font-heading text-white">Automatik</span>
        </div>
        <nav className="mt-4 flex flex-col gap-1 px-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-3 pb-6">
        <div className="border-t border-neutral-800 my-4" />
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          {t("backToSite")}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 bg-gradient-to-b from-neutral-900 to-[#0a0f1a] text-white md:block">
        {sidebarContent}
      </aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-gradient-to-b from-neutral-900 to-[#0a0f1a] text-white transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end px-4 pt-4">
          <button onClick={() => setSidebarOpen(false)} className="rounded-xl p-1 text-neutral-300 hover:bg-neutral-800 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        {sidebarContent}
      </aside>
      <main className="min-h-screen md:ml-60">
        <div className="flex items-center gap-3 px-4 pt-4 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-xl border border-neutral-200 bg-white p-2 shadow-sm">
            <Menu className="h-5 w-5 text-neutral-700" />
          </button>
          <span className="text-lg font-bold text-neutral-900">Automatik</span>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
