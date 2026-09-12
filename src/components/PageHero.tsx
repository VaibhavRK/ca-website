import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}

const PageHero: React.FC<PageHeroProps> = ({ title, breadcrumbs }) => {
  return (
    <section className="bg-primary py-14 md:py-20">
      <div className="section-container">
        <nav className="flex items-center gap-2 text-white/50 text-sm mb-6" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={index}>
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-white/80' : ''}>
                    {crumb.label}
                  </span>
                )}
                {!isLast && <ChevronRight className="w-4 h-4" />}
              </React.Fragment>
            );
          })}
        </nav>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
          {title}
        </h1>
        <div className="w-20 h-0.5 bg-accent mt-6"></div>
      </div>
    </section>
  );
};

export default PageHero;
