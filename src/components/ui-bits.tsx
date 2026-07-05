import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-20 ${className}`}>
      {(eyebrow || title || subtitle) && (
        <Reveal className="mb-12 text-center">
          {eyebrow && (
            <span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </span>
          )}
          {title && <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>}
          {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
