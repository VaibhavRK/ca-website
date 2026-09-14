export interface KnowledgeItem {
  id: string;
  title: string;
  category: 'news' | 'article' | 'publication';
  date: string;
  description: string;
  pdfUrl?: string;
  content?: string;
}

const STORAGE_KEY = 'dsco_knowledge_items';

const seedData: KnowledgeItem[] = [];

function initStorage(): KnowledgeItem[] {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}

export function getKnowledgeItems(): KnowledgeItem[] {
  return initStorage();
}

export function getKnowledgeByCategory(
  category: KnowledgeItem['category']
): KnowledgeItem[] {
  return getKnowledgeItems()
    .filter((item) => item.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestKnowledge(count: number = 6): KnowledgeItem[] {
  return getKnowledgeItems()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function addKnowledgeItem(item: KnowledgeItem): void {
  const items = getKnowledgeItems();
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

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

export function deleteKnowledgeItem(id: string): void {
  const items = getKnowledgeItems().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function resetKnowledgeToDefaults(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
}

export function generateId(): string {
  return `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
