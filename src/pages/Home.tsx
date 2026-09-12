import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import SectionHeader from '../components/SectionHeader';
import ServiceCard from '../components/ServiceCard';
import LeadershipCard from '../components/LeadershipCard';
import KnowledgeCard from '../components/KnowledgeCard';
import { services } from '../data/services';
import { leadershipMembers } from '../data/leadership';
import { getLatestKnowledge } from '../data/knowledge';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Devansh Singhal & Company | Chartered Accountants';
  }, []);

  const latestKnowledge = getLatestKnowledge(3);
  const topLeadership = leadershipMembers.slice(0, 3);

  return (
    <div className="w-full overflow-hidden">
      {/* 1. HeroCarousel */}
      <HeroCarousel />

      {/* 2. About Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="flex flex-col items-start">
              <div className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-4">
                About Our Firm
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-6">
                A Legacy of Trust & Professional Excellence
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Established with a vision to provide premium professional services, Devansh Singhal & Company is a leading firm of Chartered Accountants. We bring a blend of traditional values and modern methodologies to help our clients navigate complex business landscapes.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our commitment to quality, integrity, and client satisfaction has made us a trusted partner for businesses across diverse sectors.
              </p>
              <Link 
                to="/about"
                className="group bg-primary text-white px-8 py-3.5 hover:bg-accent hover:-translate-y-1 transform transition-all duration-300 font-medium inline-flex items-center gap-2 rounded-sm shadow-sm hover:shadow-md"
              >
                Learn More About Us
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            {/* Image Content */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 translate-x-4 translate-y-4 rounded-sm"></div>
              <img 
                src="/images/hero/slide1.png" 
                alt="Devansh Singhal & Company Office" 
                className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-sm shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="section-container">
          <SectionHeader 
            title="Our Services" 
            subtitle="Comprehensive professional services tailored to meet the evolving needs of modern businesses."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.slice(0, 6).map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/services"
              className="group bg-primary text-white px-8 py-3.5 hover:bg-accent hover:-translate-y-1 transform transition-all duration-300 font-medium inline-flex items-center gap-2 rounded-sm shadow-sm hover:shadow-md"
            >
              View All Services
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Leadership Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <SectionHeader 
            title="Our Leadership" 
            subtitle="Experienced professionals dedicated to delivering excellence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {topLeadership.map(member => (
              <LeadershipCard key={member.id} member={member} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/leadership"
              className="group bg-primary text-white px-8 py-3.5 hover:bg-accent hover:-translate-y-1 transform transition-all duration-300 font-medium inline-flex items-center gap-2 rounded-sm shadow-sm hover:shadow-md"
            >
              Meet Our Full Team
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Knowledge Preview */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="section-container">
          <SectionHeader 
            title="Latest Knowledge" 
            subtitle="Stay informed with our latest insights, news, and publications."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {latestKnowledge.map(item => (
              <KnowledgeCard key={item.id} item={item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              to="/knowledge"
              className="group bg-primary text-white px-8 py-3.5 hover:bg-accent hover:-translate-y-1 transform transition-all duration-300 font-medium inline-flex items-center gap-2 rounded-sm shadow-sm hover:shadow-md"
            >
              Explore All Resources
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
