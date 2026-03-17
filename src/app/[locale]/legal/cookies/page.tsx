import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("cookies.title") + " | Automatika",
    description: t("cookies.metaDescription"),
  };
}

export default async function CookiePolicyPage() {
  const t = await getTranslations("legal");
  const sections = t.raw("cookies.sections") as {
    heading: string;
    paragraphs: string[];
  }[];

  return (
    <article>
      <h1 className="text-3xl font-bold font-heading text-neutral-900 mb-2">
        {t("cookies.title")}
      </h1>
      <p className="text-sm text-neutral-400 mb-10">{t("lastUpdated")}</p>

      {sections.map((section, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">
            {section.heading}
          </h2>
          {section.paragraphs.map((p, j) => (
            <p key={j} className="text-neutral-700 leading-relaxed mb-3">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
