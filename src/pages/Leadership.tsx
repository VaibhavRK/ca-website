import { useEffect } from 'react';
import { Shield, Award, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import LeadershipCard from '../components/LeadershipCard';
import { leadershipMembers } from '../data/leadership';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We uphold the highest ethical standards in all our professional engagements.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for outstanding quality and precision in our service delivery.'
  },
  {
    icon: Users,
    title: 'Client Focus',
    description: 'We build lasting relationships based on trust and dedicated support.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace modern solutions while maintaining traditional values.'
  }
];

const Leadership = () => {
  useEffect(() => {
    document.title = 'Leadership | Our Firm';
  }, []);

  return (
    <main>
      <PageHero 
        title="Our Leadership" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Leadership' }
        ]} 
      />

      <section className="py-24 md:py-32 bg-white">
        <div className="section-container">
          <p className="font-body text-text-secondary text-lg max-w-3xl mb-4">
            Our leadership team brings together decades of professional experience across diverse practice areas. Each member is committed to delivering the highest standards of service and maintaining the trust our clients place in us.
          </p>
          <div className="w-16 h-0.5 bg-accent mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipMembers.map((member) => (
              <LeadershipCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-bg-alt">
        <div className="section-container text-center">
          <h2 className="font-heading text-3xl text-primary mb-12">Our Professional Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-8 border border-border flex flex-col items-center rounded-sm">
                  <Icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-heading text-xl text-primary mb-2">{value.title}</h3>
                  <p className="font-body text-text-secondary text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 md:py-32 text-center">
        <div className="section-container">
          <h2 className="font-heading text-3xl text-white mb-6">Discuss Your Requirements With Us</h2>
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

export default Leadership;
