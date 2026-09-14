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
                Built on Expertise, Integrity & Commitment
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Devansh Singhal & Company is a firm of Chartered Accountants with a core focus on taxation, including advisory, compliance, dispute resolution and litigation across direct and indirect tax laws. We assist businesses and individuals in navigating complex tax and regulatory matters through technically sound advice and a practical, solution-oriented approach.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Our tax practice is complemented by audit and assurance, regulatory and allied professional services. Across every engagement, we remain guided by professional integrity, attention to detail and a commitment to delivering clear and effective solutions to our clients.
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




    </div>
  );
};

export default Home;
