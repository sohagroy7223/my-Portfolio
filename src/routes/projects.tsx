import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import { PageTransition, Reveal, Section } from "@/components/ui-bits";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sohag Roy" },
      { name: "description", content: "Selected projects by Sohag Roy across web apps, e-commerce, and tools." },
      { property: "og:title", content: "Projects — Sohag Roy" },
      { property: "og:description", content: "A showcase of recent work." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

function ProjectsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<(typeof projects)[number] | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(q.toLowerCase()));
      return matchCat && matchQ;
    });
  }, [cat, q]);

  return (
    <PageTransition>
      <Section eyebrow="Portfolio" title="Projects" subtitle="Search and filter through my work.">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === c
                    ? "bg-hero-gradient text-white shadow-glow"
                    : "border border-border bg-card hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-xl border border-border bg-card py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary sm:w-72"
            />
          </div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="group glass cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => setOpen(p)}
              >
                <div className="aspect-video overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</div>
                  <h3 className="mt-1 text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">No projects match your filters.</p>
        )}
      </Section>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80"
                aria-label="Close"
              >
                <FiX />
              </button>
              <img src={open.image} alt={open.name} className="h-56 w-full object-cover" />
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">{open.category}</div>
                <h3 className="mt-1 text-2xl font-bold">{open.name}</h3>
                <p className="mt-3 text-muted-foreground">{open.details}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {open.tech.map((t) => (
                    <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{t}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a href={open.demo} className="inline-flex items-center gap-2 rounded-xl bg-hero-gradient px-4 py-2 text-sm font-semibold text-white">
                    <FiExternalLink /> Live Demo
                  </a>
                  <a href={open.github} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold">
                    <FiGithub /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
