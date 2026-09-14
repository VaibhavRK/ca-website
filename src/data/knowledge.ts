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

const STORAGE_KEY = 'dsco_knowledge_items_v2';

const baseSeedData: KnowledgeItem[] = (knowledgeData as KnowledgeItem[]) || [];

/**
 * Retrieves knowledge items.
 * Prioritizes active local additions, falling back to build-time knowledgeData.json.
 */
export function getKnowledgeItems(): KnowledgeItem[] {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData !== null) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading local knowledge cache:', e);
  }
  return baseSeedData;
}

/**
 * Save knowledge items to local storage for immediate instant display.
 */
export function saveKnowledgeItemsLocally(items: KnowledgeItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving local knowledge cache:', e);
  }
}

/**
 * Clear local storage cache to force re-fetch from knowledgeData.json.
 */
export function clearLocalKnowledgeCache(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing local knowledge cache:', e);
  }
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
