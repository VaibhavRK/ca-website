import knowledgeData from './knowledgeData.json';

export interface KnowledgeItem {
  id: string;
  title: string;
  category: 'news' | 'article' | 'publication' | 'report';
  date: string;
  description: string;
  pdfUrl?: string;
  content?: string;
  author?: string;
  readTime?: string;
  tags?: string[];
}

/**
 * Retrieves knowledge items directly from knowledgeData.json.
 * No localStorage caching — knowledgeData.json is the sole source of truth.
 */
export function getKnowledgeItems(): KnowledgeItem[] {
  return (knowledgeData as KnowledgeItem[]) || [];
}

/**
 * Filter knowledge items by category.
 */
export function getKnowledgeByCategory(
  category: KnowledgeItem['category']
): KnowledgeItem[] {
  return getKnowledgeItems()
    .filter((item) => item.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns latest N knowledge items.
 */
export function getLatestKnowledge(count: number = 6): KnowledgeItem[] {
  return getKnowledgeItems()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/**
 * Get formatted JSON string of current items for repository export.
 */
export function exportKnowledgeJSON(items?: KnowledgeItem[]): string {
  return JSON.stringify(items || getKnowledgeItems(), null, 2);
}

/**
 * Generate a unique ID for new items.
 */
export function generateId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}
