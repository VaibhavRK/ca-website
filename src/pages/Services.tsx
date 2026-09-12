import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import { ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  useEffect(() => {
    document.title = 'Our Services | Chartered Accountant';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="Our Services" 
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]} 
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <p className="text-text-secondary font-body text-lg max-w-3xl mb-12 leading-relaxed">
            We offer a comprehensive suite of financial and advisory services designed to help businesses and individuals navigate complex regulatory environments, optimize their tax positions, and achieve sustainable growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24">
        <div className="section-container text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
            Need Expert Financial Guidance?
          </h2>
          <p className="text-white/80 font-body mb-8 max-w-2xl mx-auto text-lg">
            Our team of experienced professionals is ready to help you navigate your unique financial challenges.
          </p>
          <Link 
            to="/contact" 
            className="group bg-accent text-primary px-10 py-4 font-medium hover:bg-white hover:-translate-y-1 transform transition-all duration-300 inline-flex items-center gap-2 rounded-sm shadow-md hover:shadow-lg"
          >
            Contact Us Today
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
