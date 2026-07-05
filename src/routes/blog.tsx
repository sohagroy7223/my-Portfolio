import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { PageTransition, Reveal, Section } from "@/components/ui-bits";
import { blogPosts } from "@/data/portfolio";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Sohag Roy" },
      { name: "description", content: "Articles on React, frontend craft, and modern web tooling by Sohag Roy." },
      { property: "og:title", content: "Blog — Sohag Roy" },
      { property: "og:description", content: "Articles on frontend development." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = ["All", ...Array.from(new Set(blogPosts.map((b) => b.category)))];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [cat, q]);

  return (
    <PageTransition>
      <Section eyebrow="Blog" title="Notes from the craft" subtitle="Things I've learned along the way.">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === c ? "bg-hero-gradient text-white shadow-glow" : "border border-border bg-card hover:bg-muted"
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
              placeholder="Search posts…"
              className="w-full rounded-xl border border-border bg-card py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary sm:w-72"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.05}>
              <article className="group glass flex h-full flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 font-medium text-accent-foreground">{b.category}</span>
                    <span>·</span>
                    <span>{b.date}</span>
                    <span>·</span>
                    <span>{b.readTime}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.excerpt}</p>
                  <button className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-primary hover:gap-2 transition-all">
                    Read More <FiArrowRight />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-10 text-center text-muted-foreground">No posts found.</p>}
      </Section>
    </PageTransition>
  );
}
