import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Award, 
  Users, 
  Lightbulb, 
  Handshake, 
  Scale,
  ArrowRight
} from 'lucide-react';
import PageHero from '../components/PageHero';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | CA Firm';
  }, []);

  return (
    <main className="w-full">
      <PageHero 
        title="About Us"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' }
        ]}
      />

      {/* 1. Company Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Firm Overview
              </h2>
              <p className="font-body text-text-secondary mb-4 leading-relaxed">
                Devansh Singhal & Company is a firm of Chartered Accountants providing professional services with a core focus on taxation. Our practice spans advisory, compliance, dispute resolution and litigation across direct and indirect tax laws, with an emphasis on addressing complex and evolving tax and regulatory issues.
              </p>
              <p className="font-body text-text-secondary mb-4 leading-relaxed">
                We work with businesses, entrepreneurs and individuals at different stages of their growth, assisting them in understanding their obligations, evaluating tax positions, managing regulatory risks and resolving disputes. Our approach is founded on a detailed understanding of the law, continuous engagement with judicial and regulatory developments, and an appreciation of the commercial context in which our clients operate.
              </p>
              <p className="font-body text-text-secondary mb-4 leading-relaxed">
                While taxation remains at the heart of our practice, our capabilities extend to audit and assurance, regulatory advisory and other allied professional services, allowing us to provide clients with coordinated support across their broader financial and regulatory requirements.
              </p>
              <p className="font-body text-text-secondary leading-relaxed">
                We believe professional advice should be clear, technically sound and practically implementable. Whether advising on a transaction, representing a client in a dispute or undertaking an assurance engagement, our focus remains on understanding the issue in depth and delivering considered solutions with integrity and professional independence.
              </p>
            </div>
            <div className="bg-bg-alt p-8 md:p-12 border-l-4 border-accent h-full flex flex-col justify-center rounded-sm">
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                Our Approach
              </h3>
              <p className="font-body text-text-secondary italic">
                “We combine technical depth with commercial understanding to provide advice that is clear, considered and practical. Every engagement is approached with professional independence, attention to detail and a commitment to understanding the client’s objectives before recommending a course of action.”
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 3. Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white border border-border p-8 rounded-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-bg-alt rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                To deliver technically sound, practical and solution-oriented tax and professional services, enabling our clients to navigate complexity, manage risks and make informed decisions with confidence and integrity.
              </p>
            </div>
            
            {/* Vision Card */}
            <div className="bg-white border border-border p-8 rounded-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-bg-alt rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                To build a trusted professional firm recognised for its expertise in taxation, quality of representation and commitment to delivering meaningful value to clients, while consistently upholding the highest standards of professional excellence and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
};

export default About;
