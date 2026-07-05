import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiDownload, FiMail, FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi";
// import sohag from "@/assets/sohag.png.asset.json";
import sohag from "@/assets/sohag.png"
import { PageTransition, Reveal, Section } from "@/components/ui-bits";
import { skills, projects, blogPosts } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sohag Roy — Frontend Developer Portfolio" },
      {
        name: "description",
        content:
          "I build modern, responsive web apps with React, Tailwind CSS, and a touch of motion.",
      },
      { property: "og:title", content: "Sohag Roy — Frontend Developer" },
      { property: "og:description", content: "Portfolio, projects, and blog by Sohag Roy." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const roles = ["Frontend Developer", "React Specialist", "MERN Stack Developer"];

function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[i % roles.length];
    const speed = deleting ? 40 : 90;
    const timer = setTimeout(() => {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) setTimeout(() => setDeleting(true), 1400);
      else if (deleting && next === "") {
        setDeleting(false);
        setI((v) => v + 1);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, i]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-1 animate-pulse bg-primary align-middle" />
    </span>
  );
}

function HomePage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* gradient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div
            className="absolute right-0 top-40 h-96 w-96 rounded-full bg-secondary/30 blur-3xl animate-blob"
            style={{ animationDelay: "3s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-blob"
            style={{ animationDelay: "6s" }}
          />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pt-24">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-green-500" /> Available for freelance
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Hi, I'm <span className="text-gradient">Sohag Roy</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 text-2xl font-semibold text-muted-foreground sm:text-3xl">
                I'm a <Typewriter />
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-lg text-base text-muted-foreground">
                I create modern, responsive, and accessible web applications using React, Tailwind
                CSS, JavaScript, and REST APIs. I'm always eager to learn new technologies and
                contribute to real-world projects.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/public/Resume - Google Docs (1).pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-xl bg-hero-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  <FiDownload /> Download Resume
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  <FiMail /> Contact Me
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Profile image */}
          <Reveal delay={0.1} className="flex justify-center md:justify-end">
            <div className="relative">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-hero-gradient opacity-30 blur-2xl"
              />
              <div className="glass rounded-[2rem] p-2 shadow-glow">
                <div className="overflow-hidden rounded-[1.5rem] bg-hero-gradient">
                  <img
                    src={sohag}
                    alt="Sohag Roy — Frontend Developer"
                    className="h-[380px] w-[320px] object-cover sm:h-[440px] sm:w-[360px]"
                  />
                </div>
              </div>
              {/* floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="glass absolute -left-6 top-10 rounded-2xl px-3 py-2 text-xs font-semibold shadow-lg"
              >
                ⚛️ React.js
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="glass absolute -right-4 bottom-16 rounded-2xl px-3 py-2 text-xs font-semibold shadow-lg"
              >
                🎨 Tailwind CSS
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity }}
                className="glass absolute -bottom-4 left-8 rounded-2xl px-3 py-2 text-xs font-semibold shadow-lg"
              >
                🔥 Firebase
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <Section eyebrow="About" title="Get to Know Me">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm Sohag Roy, a passionate Frontend Developer who enjoys building modern, responsive,
              and user-friendly web applications. I primarily work with React, Tailwind CSS,
              JavaScript, and Firebase, while also exploring backend technologies like Node.js,
              Express.js, and MongoDB. I love learning new technologies, solving real-world
              problems, and continuously improving my development skills
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
            >
              Read More <FiArrowRight />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "1+", lable: "Years experience" },
                { k: "15+", lable: "Projects shipped" },
                { k: "4+", lable: "Happy clients" },
                { k: "10+", lable: "Technologies" },
              ].map((s) => (
                <div key={s.lable} className="glass rounded-2xl p-5">
                  <div className="text-3xl font-bold text-gradient">{s.k}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.lable}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SKILLS */}
      <Section
        eyebrow="Skills"
        title="My Tech Stack"
        subtitle="The technologies and tools I use to build modern, responsive, and user-friendly web applications."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {skills.map((s, idx) => (
            <Reveal key={s.name} delay={idx * 0.04}>
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{s.level}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-hero-gradient"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section
        eyebrow="Work"
        title="Featured projects"
        subtitle="A selection of recent things I have built."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className="group glass overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={p.demo}
                      className="inline-flex items-center gap-1 rounded-lg bg-hero-gradient px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      <FiExternalLink /> Demo
                    </a>
                    <a
                      href={p.github}
                      className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold"
                    >
                      <FiGithub /> Code
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
          >
            See all projects <FiArrowRight />
          </Link>
        </div>
      </Section>

      {/* BLOG PREVIEW */}
      {/* <Section eyebrow="Writing" title="From the blog">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((b, i) => (
            <Reveal key={b.id} delay={i * 0.06}>
              <article className="glass overflow-hidden rounded-2xl transition-transform hover:-translate-y-1">
                <div className="aspect-video overflow-hidden">
                  <img src={b.image} alt={b.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 font-medium text-accent-foreground">{b.category}</span>
                    <span>·</span>
                    <span>{b.date}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section> */}

      {/* CONTACT CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-hero-gradient p-10 text-center text-white shadow-glow sm:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
            <h3 className="font-display text-3xl font-bold sm:text-4xl">
              Let's build something great together
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-white/90">
              Have a project in mind or just want to say hi? I'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
            >
              Get in touch <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </Section>
    </PageTransition>
  );
}
