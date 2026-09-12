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

const seedData: KnowledgeItem[] = [
  {
    id: 'news-1',
    title: 'Regulatory Update: Key Changes in Compliance Requirements',
    category: 'news',
    date: '2025-09-01',
    description:
      'An overview of the latest regulatory changes that impact businesses and their compliance obligations for the current financial year.',
  },
  {
    id: 'news-2',
    title: 'Firm Recognized Among Top Professional Services Firms',
    category: 'news',
    date: '2025-08-15',
    description:
      'We are proud to announce our recognition as one of the leading professional services firms in the region, reflecting our commitment to excellence.',
  },
  {
    id: 'news-3',
    title: 'New Office Inauguration in Mumbai',
    category: 'news',
    date: '2025-07-20',
    description:
      'Expanding our geographic presence, we are delighted to announce the opening of our new office in Mumbai to better serve our clients.',
  },
  {
    id: 'article-1',
    title: 'Understanding the Impact of Digital Transformation on Financial Reporting',
    category: 'article',
    date: '2025-08-28',
    description:
      'This article explores how digital transformation is reshaping financial reporting practices and what businesses need to prepare for.',
    pdfUrl: '/documents/article-01.pdf',
  },
  {
    id: 'article-2',
    title: 'Best Practices in Corporate Governance for Growing Businesses',
    category: 'article',
    date: '2025-08-10',
    description:
      'A comprehensive guide to implementing robust corporate governance frameworks that support sustainable business growth.',
    pdfUrl: '/documents/article-02.pdf',
  },
  {
    id: 'article-3',
    title: 'Navigating Cross-Border Transactions: A Professional Guide',
    category: 'article',
    date: '2025-07-25',
    description:
      'Expert insights on managing the complexities of cross-border transactions, including regulatory, tax, and operational considerations.',
    pdfUrl: '/documents/article-03.pdf',
  },
  {
    id: 'pub-1',
    title: 'Annual Industry Report 2025: Trends and Outlook',
    category: 'publication',
    date: '2025-09-05',
    description:
      'Our flagship annual report analyzing key industry trends, economic indicators, and the outlook for businesses in the coming year.',
    pdfUrl: '/documents/report-01.pdf',
  },
  {
    id: 'pub-2',
    title: 'Tax Planning Guide for Financial Year 2025-26',
    category: 'publication',
    date: '2025-08-01',
    description:
      'A practical guide covering key tax planning strategies, deductions, and compliance deadlines for the current financial year.',
    pdfUrl: '/documents/report-02.pdf',
  },
  {
    id: 'pub-3',
    title: 'Business Compliance Handbook: Essential Checklist',
    category: 'publication',
    date: '2025-07-01',
    description:
      'A comprehensive compliance handbook providing essential checklists and guidelines for businesses to maintain regulatory compliance.',
    pdfUrl: '/documents/report-03.pdf',
  },
];

function initStorage(): KnowledgeItem[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as KnowledgeItem[];
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return [...seedData];
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  return [...seedData];
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
