"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { servicePillars } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          heading="What We Do"
          subheading="We specialize in two core areas that transform how your business operates"
        />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {servicePillars.map((pillar, pillarIndex) => {
            const PillarIcon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pillarIndex * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
                    initial={{ rotate: -15, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + pillarIndex * 0.2,
                    }}
                  >
                    <PillarIcon className="w-5 h-5 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-neutral-500 mb-6">{pillar.description}</p>
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {pillar.services.map((service) => (
                    <motion.div key={service.title} variants={cardVariants}>
                      <ServiceCard
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
