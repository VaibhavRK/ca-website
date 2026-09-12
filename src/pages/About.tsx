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
                Company Overview
              </h2>
              <p className="font-body text-text-secondary mb-4 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="font-body text-text-secondary leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="bg-bg-alt p-8 md:p-12 border-l-4 border-accent h-full flex flex-col justify-center rounded-sm">
              <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                A Legacy of Trust
              </h3>
              <p className="font-body text-text-secondary italic">
                "Our commitment to excellence and integrity has made us a trusted partner for businesses and individuals alike since our inception."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our History */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-12">
            Our History
          </h2>
          <div className="max-w-3xl mx-auto relative border-l-2 border-accent pl-8 md:pl-12 space-y-12">
            {[
              { year: '1995', title: 'Foundation', desc: 'Established with a vision to provide premium tax and audit services.' },
              { year: '2005', title: 'Expansion', desc: 'Opened our second office and expanded our corporate advisory practice.' },
              { year: '2015', title: 'Digital Transformation', desc: 'Embraced modern accounting technologies to better serve our global clients.' },
              { year: '2023', title: 'Industry Leaders', desc: 'Recognized as one of the premier chartered accounting firms in the region.' }
            ].map((milestone, idx) => (
              <div key={idx} className="relative">
                {/* Gold Accent Dot */}
                <span className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 bg-white border-4 border-accent rounded-full"></span>
                <span className="text-accent font-heading font-bold text-xl block mb-2">{milestone.year}</span>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-2">{milestone.title}</h3>
                <p className="font-body text-text-secondary">{milestone.desc}</p>
              </div>
            ))}
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
                To deliver exceptional financial and strategic advice that empowers our clients to achieve their goals, while upholding the highest standards of professional integrity.
              </p>
            </div>
            
            {/* Vision Card */}
            <div className="bg-white border border-border p-8 rounded-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-bg-alt rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h2>
              <p className="font-body text-text-secondary leading-relaxed">
                To be the most respected and trusted chartered accounting firm, known for our innovative solutions, unwavering commitment to clients, and fostering top talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-12">
            Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Integrity', desc: 'Upholding honesty and strong moral principles in all our dealings.' },
              { icon: Award, title: 'Excellence', desc: 'Striving for the highest quality in every service we provide.' },
              { icon: Users, title: 'Client Focus', desc: 'Putting our clients\' needs and success at the center of our work.' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Embracing new ideas and technologies to deliver better solutions.' },
              { icon: Handshake, title: 'Collaboration', desc: 'Working together seamlessly to achieve outstanding results.' },
              { icon: Scale, title: 'Accountability', desc: 'Taking full responsibility for our actions and their outcomes.' }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-6 border border-border rounded-sm">
                <value.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">{value.title}</h3>
                <p className="font-body text-text-secondary text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Expertise & Experience', desc: 'Decades of combined experience handling complex financial matters for diverse industries.' },
              { num: '02', title: 'Tailored Solutions', desc: 'We do not believe in one-size-fits-all. Every strategy is customized to your unique needs.' },
              { num: '03', title: 'Proactive Approach', desc: 'We anticipate challenges and opportunities, keeping you steps ahead of the curve.' }
            ].map((reason, idx) => (
              <div key={idx} className="relative p-6 border border-border rounded-sm">
                <span className="absolute top-2 right-4 text-5xl font-heading font-bold text-accent/20">
                  {reason.num}
                </span>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3 mt-4 relative z-10">
                  {reason.title}
                </h3>
                <p className="font-body text-text-secondary relative z-10">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact CTA */}
      <section className="py-16 md:py-24 bg-primary text-center">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Discuss Your Financial Future?
          </h2>
          <p className="font-body text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our experts to find out how we can help you achieve your business and personal financial goals.
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
    </main>
  );
};

export default About;
