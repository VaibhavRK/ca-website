import { useEffect } from 'react';
import { Download } from 'lucide-react';
import PageHero from '../components/PageHero';
import KnowledgeCard from '../components/KnowledgeCard';
import { getKnowledgeByCategory } from '../data/knowledge';

const Publications = () => {
  useEffect(() => {
    document.title = 'Publications & Reports | CA Firm';
  }, []);

  const items = getKnowledgeByCategory('publication');

  return (
    <div className="bg-bg-alt min-h-screen">
      <PageHero 
        title="Publications & Reports" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge', href: '/knowledge' },
          { label: 'Publications' }
        ]} 
      />
      <section className="py-16 section-container">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <div key={item.id} className="relative group flex flex-col">
                <KnowledgeCard item={item} />
                {/* Emphasize PDF download capability */}
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center bg-white px-6 py-4 rounded-b-sm">
                  <span className="text-sm font-medium text-text-secondary">Available as PDF</span>
                  <button className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-semibold">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-border rounded-sm">
            <p className="text-text-muted text-lg">No publications available</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Publications;
