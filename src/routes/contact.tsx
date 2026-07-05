import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { PageTransition, Reveal, Section } from "@/components/ui-bits";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sohag Roy" },
      {
        name: "description",
        content: "Get in touch with Sohag Roy for projects, freelance, or collaborations.",
      },
      { property: "og:title", content: "Contact — Sohag Roy" },
      { property: "og:description", content: "Send a message or find me on social media." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(2, "Please enter a subject").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });

      setErrors(errs);
      return;
    }

    setErrors({});

    try {
      await emailjs.send(
        "service_jibnetk",
        "template_asll50n",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "WKUeps3QtzX9Z2ZPL",
      );

      setSent(true);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.log(err);
      alert("Failed to send message");
    }
  };

  const field = (k: keyof typeof form, label: string, type = "text", textarea = false) => (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea
          value={form[k]}
          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          rows={5}
          className="mt-1 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <input
          type={type}
          value={form[k]}
          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          className="mt-1 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      )}
      {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <PageTransition>
      <Section
        eyebrow="Contact"
        title="Let's talk"
        subtitle="Drop a note and I'll get back to you soon."
      >
        <div className="grid gap-8 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold">Reach me</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <FiMail />
                  </span>
                  <div>
                    <div className="font-medium">Email</div>
                    <a
                      href="mailto:sohagroy7223@gmail.com"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      sohagroy7223@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary/15 text-secondary">
                    <FiPhone />
                  </span>
                  <div>
                    <div className="font-medium">Phone</div>
                    <a
                      href="tel:+8801311976179"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      +880 1311-976179
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent-foreground">
                    <FiMapPin />
                  </span>
                  <div>
                    <div className="font-medium">Location</div>
                    <span className="text-muted-foreground">Dhaka, Bangladesh</span>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <div className="text-sm font-semibold">Follow</div>
                <div className="mt-3 flex gap-3">
                  {[
                    { I: FaGithub, href: "https://github.com/sohagroy7223/" },
                    { I: FaLinkedin, href: "https://www.linkedin.com/in/sohag-roy-/" },
                    { I: FaTwitter, href: "https://x.com/sohag_roy7223" },
                    { I: FaFacebook, href: "https://www.facebook.com/sohag.roy.283426" },
                  ].map(({ I, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-border transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                    >
                      <I />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-3">
            <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {field("name", "Name")}
                {field("email", "Email", "email")}
              </div>
              {field("subject", "Subject")}
              {field("message", "Message", "text", true)}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-hero-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
              >
                {sent ? (
                  <>
                    <FiCheck /> Sent!
                  </>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Map" title="Find me here">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border shadow-glow">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116835.7!2d90.356!3d23.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000"
              className="h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Section>
    </PageTransition>
  );
}
