import { Link } from "@tanstack/react-router";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-hero-gradient text-white">
              S
            </span>
            <span className="text-gradient">Sohag Roy</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Frontend developer crafting modern, responsive, delightful web experiences.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/", l: "Home" },
              { to: "/about", l: "About" },
              { to: "/projects", l: "Projects" },
              // { to: "/blog", l: "Blog" },
              { to: "/contact", l: "Contact" },
            ].map((x) => (
              <li key={x.to}>
                <Link to={x.to} className="hover:text-foreground">
                  {x.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Connect</h4>
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
                className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                <I />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sohag Roy. All rights reserved.
      </div>
    </footer>
  );
}
