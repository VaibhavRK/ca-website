import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

/* ── Sub-components ── */

const ColHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-white text-[15px] font-semibold mb-5 tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
    {children}
  </h4>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link
      to={to}
      className="text-[#8B9DB6] text-[14px] leading-relaxed hover:text-white transition-colors duration-200 py-[3px] inline-block"
    >
      {children}
    </Link>
  </li>
);

const SocialBtn = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center text-white/60 hover:bg-accent hover:text-white transition-all duration-200"
  >
    {children}
  </a>
);

/* ── Main Component ── */

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="w-full shrink-0">

      {/* ═══════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════ */}
      <footer className="bg-[#0B1120] text-white w-full">

        {/* ── Main Grid ── */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-14 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

            {/* Col 1 — Brand + Social */}
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center shrink-0 group">
                <img 
                  src="/images/logo.svg" 
                  alt="Devansh Singhal & Company - Chartered Accountants" 
                  className="h-12 w-auto object-contain rounded-sm bg-white p-1 shadow-sm"
                />
              </Link>

              <p className="text-[#8B9DB6] text-[13.5px] leading-[1.75] max-w-[240px]">
                Providing premier auditing, taxation, and advisory services with an unwavering commitment to excellence and integrity.
              </p>

              <div className="flex items-center gap-2.5 mt-1">
                <SocialBtn href="https://www.linkedin.com/in/ca-devansh-singhal-3ab650164/" label="LinkedIn">
                  <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </SocialBtn>
                <SocialBtn href="#" label="X / Twitter">
                  <svg className="w-[13px] h-[13px] fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </SocialBtn>
                <SocialBtn href="#" label="YouTube">
                  <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </SocialBtn>
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <nav aria-label="Quick links">
              <ColHeading>Quick Links</ColHeading>
              <ul className="flex flex-col gap-[1px]">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/about">About Us</FooterLink>
                <FooterLink to="/services">Services</FooterLink>
                <FooterLink to="/leadership">Leadership</FooterLink>
                <FooterLink to="/knowledge">Knowledge</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
              </ul>
            </nav>

            {/* Col 3 — Resources */}
            <nav aria-label="Resources">
              <ColHeading>Resources</ColHeading>
              <ul className="flex flex-col gap-[1px]">
                <FooterLink to="/knowledge/articles">Articles</FooterLink>
                <FooterLink to="/knowledge/news">News &amp; Updates</FooterLink>
                <FooterLink to="/knowledge/publications">Publications</FooterLink>
                <FooterLink to="/knowledge">Reports &amp; Insights</FooterLink>
                <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </ul>
            </nav>

            {/* Col 4 — Newsletter */}
            <div>
              <ColHeading>Subscribe to Our Newsletter</ColHeading>
              <p className="text-[#8B9DB6] text-[13.5px] leading-[1.7] mb-5 max-w-[260px]">
                Get the latest updates, tips and resources delivered to your inbox.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail('');
                }}
                className="flex items-stretch"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7B8D]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] pl-10 pr-3 py-2.5 rounded-l-md placeholder:text-[#6B7B8D] focus:outline-none focus:border-accent/50 transition-colors duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-accent text-[#0B1120] text-[13px] font-semibold px-5 py-2.5 rounded-r-md hover:bg-accent/90 transition-colors duration-200 whitespace-nowrap border-none cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#6B7B8D] text-[13px]">
              &copy; {new Date().getFullYear()} Devansh Singhal &amp; Company. All rights reserved.
            </p>
            <nav aria-label="Legal links" className="flex items-center gap-x-4 text-[#6B7B8D] text-[13px]">
              <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy</Link>
              <span className="text-white/20" aria-hidden="true">|</span>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms</Link>
              <span className="text-white/20" aria-hidden="true">|</span>
              <Link to="/sitemap" className="hover:text-white transition-colors duration-200">Sitemap</Link>
            </nav>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default Footer;
