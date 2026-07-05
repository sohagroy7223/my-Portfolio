import { createFileRoute } from "@tanstack/react-router";
import { FiBriefcase, FiBookOpen, FiAward } from "react-icons/fi";
import { PageTransition, Reveal, Section } from "@/components/ui-bits";
import { skills } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sohag Roy" },
      {
        name: "description",
        content: "Get to know Sohag Roy — frontend developer, career path, education, and skills.",
      },
      { property: "og:title", content: "About — Sohag Roy" },
      { property: "og:description", content: "Career, education and skills of Sohag Roy." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  {
    year: "2026 — Present",
    title: "Honours 1st Year",
    place: "National University",
    desc: "Currently pursuing my Honours degree (non-CSE background) while building frontend projects on the side.",
    icon: FiBookOpen,
  },
  {
    year: "2025",
    title: "Higher Secondary Certificate (HSC)",
    place: "College",
    desc: "Completed HSC in 2025.",
    icon: FiBookOpen,
  },
  {
    year: "2023",
    title: "Secondary School Certificate (SSC)",
    place: "School",
    desc: "Completed SSC in 2023.",
    icon: FiAward,
  },
];

function AboutPage() {
  return (
    <PageTransition>
      <Section eyebrow="About me" title="Building Modern Web Experiences">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
            I'm Sohag Roy, a passionate Frontend Developer from Bangladesh. I build responsive,
            accessible, and user-friendly web applications with React, Tailwind CSS, and JavaScript.
            I enjoy learning new technologies, improving my skills, and creating projects that
            deliver real value to users..
          </p>
        </Reveal>
      </Section>

      <Section eyebrow="Career objective" title="What I'm Looking For">
        <Reveal>
          <div className="glass mx-auto max-w-3xl rounded-2xl p-6 text-muted-foreground">
            I'm looking for opportunities to contribute to real-world projects, collaborate with
            talented teams, and continue growing as a Frontend Developer. My goal is to build
            modern, user-friendly web applications while expanding my skills in React, the MERN
            stack, and emerging web technologies.
          </div>
        </Reveal>
      </Section>

      <Section eyebrow="Journey" title="Experience & Education">
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          <div className="space-y-10">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              const left = i % 2 === 0;
              return (
                <Reveal key={t.title} delay={i * 0.05}>
                  <div
                    className={`relative grid gap-4 md:grid-cols-2 ${left ? "" : "md:[&>*:first-child]:order-2"}`}
                  >
                    <div
                      className={`pl-12 md:pl-0 ${left ? "md:pr-10 md:text-right" : "md:pl-10"}`}
                    >
                      <div className="glass rounded-2xl p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {t.year}
                        </div>
                        <div className="mt-1 text-lg font-semibold">{t.title}</div>
                        <div className="text-sm text-muted-foreground">{t.place}</div>
                        <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:block" />
                    <div className="absolute left-0 top-3 grid h-9 w-9 place-items-center rounded-full bg-hero-gradient text-white shadow-glow md:left-1/2 md:-translate-x-1/2">
                      <Icon />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Section eyebrow="Stack" title="Technical skills">
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((s) => (
            <span key={s.name} className="glass rounded-full px-4 py-2 text-sm font-medium">
              {s.name}
            </span>
          ))}
        </div>
      </Section>
    </PageTransition>
  );
}
