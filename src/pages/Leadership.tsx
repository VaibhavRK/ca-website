import { useEffect } from 'react';
import { Shield, Award, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import LeadershipCard from '../components/LeadershipCard';
import { leadershipMembers } from '../data/leadership';



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


    </main>
  );
};

export default Leadership;
