import { useEffect } from 'react';
import PageHero from '../components/PageHero';
import KnowledgeCard from '../components/KnowledgeCard';
import { getKnowledgeByCategory } from '../data/knowledge';

const News = () => {
  useEffect(() => {
    document.title = 'News | CA Firm';
  }, []);

  const items = getKnowledgeByCategory('news');

  return (
    <div className="bg-bg-alt min-h-screen">
      <PageHero 
        title="News" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Knowledge', href: '/knowledge' },
          { label: 'News' }
        ]} 
      />
      <section className="py-16 section-container">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <KnowledgeCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-border rounded-sm">
            <p className="text-text-muted text-lg">No news items available</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default News;
