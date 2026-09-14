import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import type { KnowledgeItem } from '../data/knowledge';

interface KnowledgeCardProps {
  item: KnowledgeItem;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ item }) => {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const getBadgeClasses = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'news':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'article':
      case 'articles':
        return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
      case 'publication':
      case 'publications':
        return 'bg-purple-50 text-purple-800 border border-purple-200';
      case 'report':
      case 'reports':
        return 'bg-amber-50 text-amber-800 border border-amber-200';
      default:
        return 'bg-gray-50 text-gray-800 border border-gray-200';
    }
  };

  const getBadgeLabel = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'news':
        return 'News & Updates';
      case 'article':
      case 'articles':
        return 'Article';
      case 'publication':
      case 'publications':
        return 'Publication';
      case 'report':
      case 'reports':
        return 'Report & Insight';
      default:
        return category;
    }
  };

  return (
    <div className="bg-white border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out p-6 flex flex-col h-full group/card rounded-sm">
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-block px-2.5 py-0.5 text-[11px] uppercase tracking-wider font-semibold rounded-sm ${getBadgeClasses(
              item.category
            )}`}
          >
            {getBadgeLabel(item.category)}
          </span>
          <span className="text-text-muted text-xs whitespace-nowrap">{formattedDate}</span>
        </div>
        
        <h3 className="text-base font-body font-semibold text-primary mb-3 group-hover/card:text-accent transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
          {item.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        {item.pdfUrl ? (
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center text-accent font-medium text-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            <span className="relative pb-0.5">
              View PDF
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        ) : (
          <span className="group inline-flex items-center text-accent font-medium text-sm cursor-pointer">
            <span className="relative pb-0.5">
              Read Details
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        )}

        {item.readTime && (
          <span className="text-xs text-text-muted font-medium">{item.readTime}</span>
        )}
      </div>
    </div>
  );
};

export default KnowledgeCard;
