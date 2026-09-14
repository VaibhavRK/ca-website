import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug, services } from '../data/services';
import PageHero from '../components/PageHero';
import { ArrowRight, CheckCircle } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');

  useEffect(() => {
    if (service) {
      document.title = `${service.name} | Devansh Singhal & Company`;
    } else {
      document.title = 'Service Not Found | Devansh Singhal & Company';
    }
  }, [service]);

  if (!service) {
    return (
      <div className="flex flex-col min-h-[60vh] justify-center items-center px-4 bg-white">
        <h1 className="font-heading text-4xl text-primary mb-4">Service Not Found</h1>
        <p className="text-text-secondary font-body mb-8 text-center max-w-md">
          The service you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-medium hover:bg-accent transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Services
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={service.name}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      />

      {/* Article Body */}
      <section className="py-14 md:py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main Article Column */}
            <article className="lg:col-span-2">

              {/* Hero Image */}
              <div className="w-full h-64 md:h-80 overflow-hidden mb-10">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-accent" />
                <span className="text-accent text-xs uppercase tracking-widest font-semibold">
                  Professional Services
                </span>
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-6">
                {service.paragraphs.map((para, i) => (
                  <p key={i} className="text-text-secondary font-body text-base leading-[1.9]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-10" />

              {/* Key Offerings Grid */}
              <div>
                <h2 className="font-heading text-2xl text-primary mb-6">What We Offer</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.keyOfferings.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-bg-alt px-5 py-4 border-l-2 border-accent">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-text-primary font-body text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 flex flex-col gap-8">

              {/* Service Icon Card */}
              <div className="bg-primary p-8 flex flex-col items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl text-white">{service.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed font-body">
                  {service.shortDescription}
                </p>
                <Link
                  to="/contact"
                  className="mt-2 inline-flex items-center gap-2 bg-accent text-primary px-5 py-2.5 text-sm font-semibold hover:bg-accent-light transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

                {service.benefits && service.benefits.length > 0 && (
                  <div className="border border-border p-6 mt-8">
                    <h3 className="font-heading text-lg text-primary mb-5 pb-4 border-b border-border">
                      Key Benefits
                    </h3>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                          <span className="text-text-secondary font-body text-sm leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Other Services */}
              <div className="border border-border p-6">
                <h3 className="font-heading text-lg text-primary mb-5 pb-4 border-b border-border">
                  Other Services
                </h3>
                <ul className="space-y-1">
                  {services
                    .filter((s) => s.slug !== slug)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}`}
                          className="flex items-center gap-2 py-2.5 text-sm text-text-secondary hover:text-accent border-b border-border/50 last:border-0 transition-colors group"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-accent/50 group-hover:text-accent transition-colors" />
                          {s.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-primary py-14 md:py-20">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-white mb-2">
              Ready to Discuss Your Requirements?
            </h2>
            <p className="text-white/70 font-body text-base max-w-xl">
              Schedule a consultation with our experts and find out how we can add value to your business.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-accent text-primary px-8 py-3.5 font-semibold hover:bg-white transition-colors"
          >
            Contact Our Experts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
