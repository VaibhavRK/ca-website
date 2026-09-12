import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

import type { KnowledgeItem } from '../data/knowledge';

interface KnowledgeCardProps {
  item: KnowledgeItem;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ item }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getBadgeClasses = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'news':
        return 'bg-primary/10 text-primary';
      case 'articles':
        return 'bg-accent/10 text-accent-dark';
      case 'publications':
        return 'bg-primary-light/10 text-primary-light';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="bg-white border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out p-6 flex flex-col h-full group/card">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`inline-block px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-semibold rounded-sm ${getBadgeClasses(
              item.category
            )}`}
          >
            {item.category}
          </span>
          <span className="text-text-muted text-xs">{formattedDate}</span>
        </div>
        
        <h3 className="text-base font-body font-semibold text-primary mb-3 group-hover/card:text-accent transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
          {item.description}
        </p>
      </div>

      <div className="mt-auto">
        {item.pdfUrl ? (
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center text-accent font-medium text-sm w-fit"
          >
            <FileText className="w-4 h-4 mr-2" />
            <span className="relative pb-0.5">
              View PDF
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <a 
            href="#" 
            className="group inline-flex items-center text-accent font-medium text-sm w-fit"
          >
            <span className="relative pb-0.5">
              Read More
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCard;
