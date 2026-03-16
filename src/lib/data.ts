import {
  Workflow,
  Settings,
  Link,
  LayoutDashboard,
  BarChart3,
  BrainCircuit,
  Zap,
  Shield,
  TrendingUp,
  Search,
  PenTool,
  Code,
  Rocket,
} from "lucide-react";
import type {
  ServicePillar,
  PricingTier,
  Testimonial,
  FAQ,
  ProcessStepData,
  Service,
} from "@/types";

export const servicePillars: ServicePillar[] = [
  {
    icon: Settings,
    title: "Automation Services",
    description:
      "Eliminate repetitive tasks and streamline your operations with intelligent automation solutions tailored to your business.",
    services: [
      {
        icon: Workflow,
        title: "Workflow Automation",
        description:
          "Streamline repetitive tasks with intelligent workflows that save hours every week.",
      },
      {
        icon: Settings,
        title: "Process Automation",
        description:
          "End-to-end business process automation from intake to completion.",
      },
      {
        icon: Link,
        title: "System Integrations",
        description:
          "Connect your tools seamlessly. CRM, ERP, marketing platforms, and more.",
      },
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description:
      "Transform raw data into actionable insights with custom dashboards and business intelligence solutions.",
    services: [
      {
        icon: LayoutDashboard,
        title: "Custom Dashboards",
        description:
          "Real-time dashboards tailored to your KPIs and business metrics.",
      },
      {
        icon: BarChart3,
        title: "Data Visualization",
        description:
          "Transform raw data into clear, actionable visual stories.",
      },
      {
        icon: BrainCircuit,
        title: "Business Intelligence",
        description:
          "Deep-dive analytics that uncover trends and drive strategic decisions.",
      },
    ],
  },
];

export const whyChooseUsFeatures: Service[] = [
  {
    icon: Zap,
    title: "Fast Implementation",
    description:
      "Go live in weeks, not months. Our proven frameworks accelerate deployment.",
  },
  {
    icon: Shield,
    title: "Enterprise Reliability",
    description:
      "Built with redundancy and monitoring. Your automations never miss a beat.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Results",
    description:
      "Every solution comes with analytics so you can track ROI from day one.",
  },
];

export const processSteps: ProcessStepData[] = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    description:
      "We analyze your current workflows, data sources, and pain points.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Strategy & Design",
    description:
      "We architect the optimal automation and reporting solution for your needs.",
  },
  {
    number: "03",
    icon: Code,
    title: "Build & Integrate",
    description:
      "Our engineers build, test, and deploy your custom solution.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Optimize",
    description:
      "Go live with full support. We continuously monitor and improve performance.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    tier: "Starter",
    monthlyPrice: 499,
    yearlyPrice: 399,
    tagline: "For small teams getting started",
    features: [
      "Up to 3 automated workflows",
      "1 custom dashboard",
      "Email support",
      "Monthly reporting",
      "Basic integrations",
    ],
    ctaText: "Get Started",
    ctaVariant: "outline",
  },
  {
    tier: "Professional",
    monthlyPrice: 999,
    yearlyPrice: 799,
    tagline: "For growing businesses",
    features: [
      "Up to 10 workflows",
      "5 custom dashboards",
      "Priority support",
      "Weekly reporting",
      "Custom integrations",
      "API access",
    ],
    ctaText: "Get Started",
    ctaVariant: "primary",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    tier: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    tagline: "For organizations at scale",
    features: [
      "Unlimited workflows",
      "Unlimited dashboards",
      "24/7 dedicated support",
      "Real-time reporting",
      "Custom BI solutions",
      "Dedicated account manager",
    ],
    ctaText: "Contact Us",
    ctaVariant: "outline",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Autoweb automated our entire onboarding pipeline. What used to take 3 hours now takes 10 minutes.",
    name: "Sarah Mitchell",
    role: "COO",
    company: "Greenleaf Logistics",
    initials: "SM",
  },
  {
    quote:
      "The dashboards they built give us real-time visibility we never had. Game changer for our exec team.",
    name: "David Chen",
    role: "VP of Analytics",
    company: "Nexus Financial",
    initials: "DC",
  },
  {
    quote:
      "Reliable, responsive, and results-driven. Our ROI was positive within the first month.",
    name: "Maria Santos",
    role: "Director of Ops",
    company: "Vantage Health",
    initials: "MS",
  },
];

export const faqs: FAQ[] = [
  {
    question: "¿Qué tipos de procesos pueden automatizar?",
    answer:
      "Automatizamos una amplia gama de procesos empresariales: entrada de datos, workflows de email, actualizaciones de CRM, procesamiento de facturas, onboarding de empleados, generación de reportes e integraciones entre plataformas. Si es repetitivo y basado en reglas, probablemente podemos automatizarlo.",
  },
  {
    question: "¿Cuánto tiempo toma una implementación típica?",
    answer:
      "La mayoría de los proyectos van del descubrimiento al lanzamiento en 2-6 semanas dependiendo de la complejidad. Automatizaciones simples pueden estar activas en días, mientras que soluciones integrales de BI pueden tomar 4-8 semanas.",
  },
  {
    question: "¿Se integran con nuestras herramientas actuales?",
    answer:
      "Sí. Trabajamos con todas las plataformas principales incluyendo Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, Zapier, Make, APIs personalizadas y cientos más.",
  },
  {
    question: "¿Qué pasa después de la implementación?",
    answer:
      "Cada plan incluye monitoreo y soporte continuo. Identificamos problemas proactivamente, optimizamos el rendimiento y escalamos tus soluciones a medida que tu negocio crece.",
  },
  {
    question: "¿Puedo ver una demo antes de contratar?",
    answer:
      "Por supuesto. Ofrecemos una consulta y demo gratuita. Evaluaremos tus necesidades y te mostraremos exactamente lo que podemos construir, sin compromiso.",
  },
];
