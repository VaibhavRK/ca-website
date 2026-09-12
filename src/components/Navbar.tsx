import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "../data/services";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);

  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-7 text-[13px] uppercase tracking-widest font-semibold transition-colors hover:text-accent ${
      isActive
        ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent after:origin-left after:scale-x-100 after:transition-transform after:duration-300"
        : "text-[#1F2937] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-3 text-sm font-semibold transition-colors hover:text-accent uppercase tracking-widest ${
      isActive ? "text-accent" : "text-[#1F2937]"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border shadow-sm">
      <div className="h-0.5 w-full bg-accent" />
      <div className="section-container flex items-center justify-between min-h-[88px] py-3.5 md:py-4 w-full max-w-[1340px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col items-center justify-center w-auto flex-shrink-0 py-1 hover:opacity-95 transition-opacity"
        >
          <span className="font-heading text-2xl md:text-3xl text-primary font-bold leading-tight">
            Devansh Singhal
          </span>
          <div className="flex items-center w-full my-0.5">
            <div className="flex-grow h-px bg-accent"></div>
            <span className="font-heading text-xs md:text-sm text-primary px-2 font-medium tracking-wide">
              & Company
            </span>
            <div className="flex-grow h-px bg-accent"></div>
          </div>
          <span className="text-[0.625rem] md:text-[0.7rem] text-text-secondary tracking-[0.28em] uppercase font-semibold mt-0.5">
            Chartered Accountants
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>

          {/* Services Dropdown */}
          <div className="relative group h-[88px] flex items-center">
            <button className="flex items-center gap-1 py-7 text-[13px] uppercase tracking-widest font-semibold text-[#1F2937] group-hover:text-accent transition-colors">
              Services{" "}
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-[88px] left-0 w-[280px] z-50 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out shadow-lg">
              <div className="h-0.5 w-full bg-accent" />
              <div className="bg-white border border-t-0 border-border flex flex-col">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    style={{ padding: "14px 28px" }}
                    className="text-[13px] font-medium text-[#1F2937] border-b border-border/60 last:border-b-0 hover:bg-bg-alt hover:text-accent transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/leadership" className={navLinkClass}>
            Leadership
          </NavLink>

          {/* Knowledge Dropdown */}
          <div className="relative group h-[88px] flex items-center">
            <button className="flex items-center gap-1 py-7 text-[13px] uppercase tracking-widest font-semibold text-[#1F2937] group-hover:text-accent transition-colors">
              Knowledge{" "}
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-[88px] left-0 w-[200px] z-50 opacity-0 -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out shadow-lg">
              <div className="h-0.5 w-full bg-accent" />
              <div className="bg-white border border-t-0 border-border flex flex-col">
                <Link
                  to="/knowledge/news"
                  style={{ padding: "14px 28px" }}
                  className="text-[13px] font-medium text-[#1F2937] border-b border-border/60 hover:bg-bg-alt hover:text-accent transition-colors duration-200"
                >
                  News
                </Link>
                <Link
                  to="/knowledge/articles"
                  style={{ padding: "14px 28px" }}
                  className="text-[13px] font-medium text-[#1F2937] border-b border-border/60 hover:bg-bg-alt hover:text-accent transition-colors duration-200"
                >
                  Articles
                </Link>
                <Link
                  to="/knowledge/publications"
                  style={{ padding: "14px 28px" }}
                  className="text-[13px] font-medium text-[#1F2937] hover:bg-bg-alt hover:text-accent transition-colors duration-200"
                >
                  Publications
                </Link>
              </div>
            </div>
          </div>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-text-primary hover:text-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-heading text-lg text-primary font-bold">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-text-secondary hover:text-accent transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 flex flex-col divide-y divide-border">
          <NavLink to="/" className={mobileNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={mobileNavLinkClass}>
            About Us
          </NavLink>

          {/* Mobile Services */}
          <div>
            <button
              className="flex items-center justify-between w-full py-3 text-sm font-semibold text-[#1F2937] hover:text-accent transition-colors uppercase tracking-widest"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pb-2 flex flex-col border-l-2 border-accent ml-1">
                {services.map((service) => (
                  <NavLink
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className={({ isActive }) =>
                      `block py-2 text-sm ${isActive ? "text-accent font-medium" : "text-[#475569] hover:text-accent"}`
                    }
                  >
                    {service.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/leadership" className={mobileNavLinkClass}>
            Leadership
          </NavLink>

          {/* Mobile Knowledge */}
          <div>
            <button
              className="flex items-center justify-between w-full py-3 text-sm font-semibold text-[#1F2937] hover:text-accent transition-colors uppercase tracking-widest"
              onClick={() => setMobileKnowledgeOpen(!mobileKnowledgeOpen)}
            >
              Knowledge
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileKnowledgeOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileKnowledgeOpen && (
              <div className="pl-4 pb-2 flex flex-col border-l-2 border-accent ml-1">
                <NavLink
                  to="/knowledge/news"
                  className={({ isActive }) =>
                    `block py-2 text-sm ${isActive ? "text-accent font-medium" : "text-[#475569] hover:text-accent"}`
                  }
                >
                  News
                </NavLink>
                <NavLink
                  to="/knowledge/articles"
                  className={({ isActive }) =>
                    `block py-2 text-sm ${isActive ? "text-accent font-medium" : "text-[#475569] hover:text-accent"}`
                  }
                >
                  Articles
                </NavLink>
                <NavLink
                  to="/knowledge/publications"
                  className={({ isActive }) =>
                    `block py-2 text-sm ${isActive ? "text-accent font-medium" : "text-[#475569] hover:text-accent"}`
                  }
                >
                  Publications
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/contact" className={mobileNavLinkClass}>
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
