import seedItems from './knowledgeData.json';

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

const STORAGE_KEY = 'dsco_knowledge_items';

const defaultSeedData: KnowledgeItem[] = seedItems as KnowledgeItem[];

/**
 * Retrieves all knowledge items from localStorage.
 * Defaults to [] from knowledgeData.json.
 */
export function getKnowledgeItems(): KnowledgeItem[] {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSeedData));
      return defaultSeedData;
    }
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSeedData));
    return defaultSeedData;
  } catch (error) {
    console.error('Error reading knowledge items from localStorage:', error);
    return defaultSeedData;
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
 * Add a new knowledge item.
 */
export function addKnowledgeItem(item: KnowledgeItem): void {
  const items = getKnowledgeItems();
  items.unshift(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/**
 * Update an existing knowledge item.
 */
export function updateKnowledgeItem(
  id: string,
  updates: Partial<KnowledgeItem>
): void {
  const items = getKnowledgeItems();
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

/**
 * Delete a knowledge item by ID.
 */
export function deleteKnowledgeItem(id: string): void {
  const items = getKnowledgeItems().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/**
 * Reset localStorage to official knowledgeData.json default seed.
 */
export function resetKnowledgeToDefaults(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSeedData));
}

/**
 * Get formatted JSON string of current items for repository export.
 */
export function exportKnowledgeJSON(): string {
  return JSON.stringify(getKnowledgeItems(), null, 2);
}

/**
 * Generate a unique ID for new items.
 */
export function generateId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}
