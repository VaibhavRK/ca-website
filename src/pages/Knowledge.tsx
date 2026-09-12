import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import KnowledgeCard from '../components/KnowledgeCard';
import { getKnowledgeItems } from '../data/knowledge';

type FilterType = 'All' | 'News' | 'Articles' | 'Publications';

const Knowledge = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  
  useEffect(() => {
    document.title = 'Knowledge | CA Firm';
  }, []);

  const items = getKnowledgeItems();
  
  const filteredItems = items.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'News') return item.category === 'news';
    if (activeFilter === 'Articles') return item.category === 'article';
    if (activeFilter === 'Publications') return item.category === 'publication';
    return true;
  });

  const filters: FilterType[] = ['All', 'News', 'Articles', 'Publications'];

  return (
    <main className="w-full">
      <PageHero 
        title="Knowledge" 
        breadcrumbs={[
          { label: 'Home', href: '/' }, 
          { label: 'Knowledge' }
        ]} 
      />
      <section className="py-24 md:py-32 bg-white">
        <div className="section-container">
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 whitespace-nowrap transition-colors duration-200 rounded-sm font-medium text-sm ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border text-text-secondary hover:border-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <KnowledgeCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-bg-alt border border-border rounded-sm">
            <p className="font-body text-text-muted text-lg">No knowledge items found for the selected category.</p>
          </div>
        )}
        </div>
      </section>
    </main>
  );
};

export default Knowledge;
