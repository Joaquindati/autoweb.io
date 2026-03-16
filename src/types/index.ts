import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServicePillar {
  icon: LucideIcon;
  title: string;
  description: string;
  services: Service[];
}

export interface PricingTier {
  tier: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  tagline: string;
  features: string[];
  ctaText: string;
  ctaVariant: "primary" | "outline";
  highlighted?: boolean;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStepData {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}
