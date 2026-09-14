import React, { useState, useEffect } from 'react';
import { 
  getKnowledgeItems, 
  saveKnowledgeItemsLocally, 
  clearLocalKnowledgeCache, 
  exportKnowledgeJSON, 
  generateId 
} from '../data/knowledge';
import type { KnowledgeItem } from '../data/knowledge';
import { 
  commitKnowledgeToGitHub, 
  getGitHubToken, 
  saveGitHubToken, 
  clearGitHubToken 
} from '../data/githubSync';
import { 
  Plus, 
  Edit, 
  Trash2, 
  RotateCcw, 
  X, 
  Save, 
  FileText, 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  Search, 
  GitCommit, 
  ShieldCheck, 
  Loader2, 
  Server, 
  RefreshCw 
} from 'lucide-react';
import { Link } from 'react-router-dom';

type FilterCategory = 'All' | 'news' | 'article' | 'publication' | 'report';

export default function KnowledgeAdmin() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toast & Sync Status state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [gitHubToken, setGitHubTokenState] = useState<string>('');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  
  // Data state
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<{
    title: string;
    category: KnowledgeItem['category'];
    date: string;
    description: string;
    pdfUrl: string;
    content: string;
    author: string;
    readTime: string;
  }>({
    title: '',
    category: 'news',
    date: new Date().toISOString().split('T')[0],
    description: '',
    pdfUrl: '',
    content: '',
    author: 'Devansh Singhal & Co.',
    readTime: '4 min read'
  });

  const loadItems = () => {
    setItems(getKnowledgeItems());
  };

  useEffect(() => {
    loadItems();
    document.title = 'Knowledge Control Panel | Admin';
    const savedToken = getGitHubToken();
    if (savedToken) {
      setGitHubTokenState(savedToken);
    }
  }, []);

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 6000);
  };

  const stats = {
    total: items.length,
    news: items.filter(i => i.category === 'news').length,
    articles: items.filter(i => i.category === 'article').length,
    publications: items.filter(i => i.category === 'publication').length,
    reports: items.filter(i => i.category === 'report').length,
  };

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'news',
      date: new Date().toISOString().split('T')[0],
      description: '',
      pdfUrl: '',
      content: '',
      author: 'Devansh Singhal & Co.',
      readTime: '4 min read'
    });
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (item: KnowledgeItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      date: item.date,
      description: item.description,
      pdfUrl: item.pdfUrl || '',
      content: item.content || '',
      author: item.author || 'Devansh Singhal & Co.',
      readTime: item.readTime || '4 min read'
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (id: string) => {
    setDeletingItemId(id);
    setShowDeleteConfirm(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Auto Commit Handler
  const pushDirectToGitHub = async (updatedItems: KnowledgeItem[]) => {
    setIsSyncing(true);
    const result = await commitKnowledgeToGitHub(updatedItems, gitHubToken || undefined);
    setIsSyncing(false);

    if (result.success) {
      triggerToast('Article published & committed to GitHub! Vercel is auto-building live.', 'success');
    } else {
      triggerToast(`Reflected on website! GitHub sync note: ${result.message}`, 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedList: KnowledgeItem[] = [];
    
    if (showEditModal && editingItem) {
      updatedList = items.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            title: formData.title,
            category: formData.category,
            date: formData.date,
            description: formData.description,
            pdfUrl: formData.pdfUrl || undefined,
            content: formData.content || undefined,
            author: formData.author || undefined,
            readTime: formData.readTime || undefined
          };
        }
        return item;
      });
      setShowEditModal(false);
      setEditingItem(null);
    } else {
      const newItem: KnowledgeItem = {
        id: generateId(),
        title: formData.title,
        category: formData.category,
        date: formData.date,
        description: formData.description,
        pdfUrl: formData.pdfUrl || undefined,
        content: formData.content || undefined,
        author: formData.author || undefined,
        readTime: formData.readTime || undefined
      };
      updatedList = [newItem, ...items];
      setShowAddModal(false);
    }
    
    setItems(updatedList);
    saveKnowledgeItemsLocally(updatedList);
    await pushDirectToGitHub(updatedList);
  };

  const handleDelete = async () => {
    if (deletingItemId) {
      const updatedList = items.filter(item => item.id !== deletingItemId);
      setItems(updatedList);
      saveKnowledgeItemsLocally(updatedList);
      setShowDeleteConfirm(false);
      setDeletingItemId(null);
      await pushDirectToGitHub(updatedList);
    }
  };

  const handleReset = async () => {
    const updatedList: KnowledgeItem[] = [];
    setItems(updatedList);
    saveKnowledgeItemsLocally(updatedList);
    setShowResetConfirm(false);
    await pushDirectToGitHub(updatedList);
  };

  const handleClearCache = () => {
    clearLocalKnowledgeCache();
    loadItems();
    triggerToast('Local cache cleared. Reloaded baseline dataset.');
  };

  const handleSaveToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gitHubToken.trim()) {
      clearGitHubToken();
      setShowGitHubModal(false);
      triggerToast('Session PAT cleared.');
      return;
    }

    setIsSyncing(true);
    saveGitHubToken(gitHubToken.trim());
    const result = await commitKnowledgeToGitHub(items, gitHubToken.trim());
    setIsSyncing(false);

    if (result.success) {
      setShowGitHubModal(false);
      triggerToast('GitHub connection verified & authenticated!', 'success');
    } else {
      triggerToast(`Token Verification Note: ${result.message}`, 'error');
    }
  };

  const handleExportJSON = () => {
    const jsonString = exportKnowledgeJSON(items);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'knowledgeData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerToast('Downloaded knowledgeData.json for manual Git commit!');
  };

  const handleCopyJSON = () => {
    const jsonString = exportKnowledgeJSON(items);
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      triggerToast('JSON data copied to clipboard!');
    });
  };

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'news': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'article': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'publication': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'report': return 'bg-amber-100 text-amber-800 border border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const formatCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'news': return 'News & Updates';
      case 'article': return 'Articles';
      case 'publication': return 'Publications';
      case 'report': return 'Reports & Insights';
      default: return cat;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 z-50 max-w-md px-5 py-3.5 rounded shadow-2xl flex items-center gap-3 border text-sm font-medium animate-fade-in ${
          toastType === 'success' 
            ? 'bg-[#0B1120] text-white border-emerald-500/50' 
            : 'bg-slate-900 text-white border-amber-500/60'
        }`}>
          {toastType === 'success' ? (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <Server className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span className="leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#0B1120] text-white py-6 border-b border-white/10 sticky top-0 z-40">
        <div className="section-container flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-accent text-xs font-semibold tracking-wider uppercase">Admin Control</span>
              <span className="text-white/30">•</span>
              <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-emerald-400" /> Instant Reflection Active
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold">Knowledge Management Panel</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowGitHubModal(true)}
              className="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-600/60 px-3.5 py-2 text-xs font-semibold rounded flex items-center gap-2 transition-all shadow-sm"
              title="Vercel Serverless Auto-Commit Setup"
            >
              <GitCommit className="w-4 h-4 text-emerald-400" />
              <span>Vercel Auto-Commit Setup</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 text-xs font-medium rounded flex items-center gap-1.5 transition-all border border-white/15"
              title="Download knowledgeData.json"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 text-xs font-medium rounded flex items-center gap-1.5 transition-all border border-white/15"
              title="Copy JSON data"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <Link 
              to="/knowledge" 
              className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 text-xs font-medium rounded flex items-center gap-1.5 transition-all border border-white/15"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 section-container">
        
        {/* Security Banner */}
        <div className="bg-slate-900 text-slate-200 p-4 rounded-md mb-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-semibold block text-sm mb-0.5">Instant Display + Automatic Vercel Git Persistence</strong>
              <p className="text-slate-300 leading-relaxed">
                Adding an article updates your website <strong>instantly in real time</strong> while automatically committing <code className="bg-slate-800 text-amber-300 px-1 py-0.5 rounded font-mono">knowledgeData.json</code> to GitHub via Vercel Serverless Function.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowGitHubModal(true)} 
            className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded text-xs transition-colors self-start md:self-auto"
          >
            GitHub Auto-Commit Setup
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Items</div>
            <div className="text-2xl font-bold text-[#0B1120]">{stats.total}</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">News &amp; Updates</div>
            <div className="text-2xl font-bold text-[#0B1120]">{stats.news}</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
            <div className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Articles</div>
            <div className="text-2xl font-bold text-[#0B1120]">{stats.articles}</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded shadow-sm">
            <div className="text-xs font-medium text-purple-600 uppercase tracking-wider mb-1">Publications</div>
            <div className="text-2xl font-bold text-[#0B1120]">{stats.publications}</div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded shadow-sm col-span-2 sm:col-span-1">
            <div className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">Reports</div>
            <div className="text-2xl font-bold text-[#0B1120]">{stats.reports}</div>
          </div>
        </div>

        {/* Action Bar & Search */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={openAddModal}
              disabled={isSyncing}
              className="bg-[#0B1120] text-white px-5 py-2.5 hover:bg-accent hover:text-[#0B1120] font-medium text-sm transition-all flex items-center gap-2 rounded shadow-sm justify-center disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Plus className="w-4 h-4" />}
              <span>Add Knowledge Item</span>
            </button>

            <button 
              onClick={() => setShowResetConfirm(true)}
              disabled={isSyncing}
              className="bg-white border border-slate-300 text-slate-700 px-4 py-2.5 hover:border-red-400 hover:text-red-600 font-medium text-sm transition-all flex items-center gap-2 rounded shadow-sm disabled:opacity-50"
              title="Clear all items"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>

            <button
              onClick={handleClearCache}
              className="bg-white border border-slate-300 text-slate-500 hover:text-slate-800 px-3 py-2.5 rounded text-xs flex items-center gap-1.5 transition-colors"
              title="Reload from baseline knowledgeData.json"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Baseline</span>
            </button>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 pl-9 pr-4 py-2.5 rounded text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-slate-200">
          {(['All', 'news', 'article', 'publication', 'report'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap ${
                filter === cat 
                  ? 'bg-[#0B1120] text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Items' : formatCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Items Table */}
        <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <div className="col-span-5">Title &amp; Summary</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1 text-center">PDF</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* List */}
          {filteredItems.length === 0 ? (
            <div className="px-6 py-16 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-medium">No knowledge items match the criteria.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredItems.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                  <div className="md:col-span-5">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider ${getCategoryBadgeColor(item.category)}`}>
                      {formatCategoryLabel(item.category)}
                    </span>
                  </div>
                  
                  <div className="md:col-span-2 text-xs font-medium text-slate-600">
                    {new Date(item.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <div className="md:col-span-1 flex items-center justify-center">
                    {item.pdfUrl ? (
                      <a 
                        href={item.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-emerald-600 hover:text-emerald-800 text-xs font-medium inline-flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                        title={item.pdfUrl}
                      >
                        <FileText className="w-3.5 h-3.5" /> PDF
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 flex items-center justify-end gap-2 mt-2 md:mt-0">
                    <button 
                      onClick={() => openEditModal(item)}
                      disabled={isSyncing}
                      className="p-2 text-slate-700 hover:text-[#0B1120] hover:bg-slate-200 rounded transition-colors disabled:opacity-40"
                      title="Edit Item"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => openDeleteConfirm(item.id)}
                      disabled={isSyncing}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-40"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* GitHub / Vercel Setup Modal */}
      {showGitHubModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded shadow-2xl overflow-hidden">
            <div className="bg-[#0B1120] text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <h2 className="font-heading text-lg font-bold">Vercel Auto-Commit Setup Guide</h2>
              </div>
              <button onClick={() => setShowGitHubModal(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="bg-emerald-50 border border-emerald-200 rounded p-4 text-emerald-950 leading-relaxed space-y-2">
                <strong className="block text-sm font-semibold text-emerald-900">How to Enable Automatic Commits via Vercel (100% Safe):</strong>
                <p>1. Go to your <strong>Vercel Dashboard &gt; Project Settings &gt; Environment Variables</strong>.</p>
                <p>2. Add Key: <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold text-emerald-950">GITHUB_PAT</code></p>
                <p>3. Value: Paste your GitHub Personal Access Token (PAT) with repository content write access to <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold text-emerald-950">VaibhavRK/ca-website</code>.</p>
                <p>4. Save and redeploy on Vercel!</p>
              </div>

              <div className="bg-slate-50 p-4 rounded border border-slate-200 leading-relaxed space-y-2">
                <strong className="text-slate-900 block text-sm font-semibold">Optional Session Fallback PAT:</strong>
                <p className="text-slate-600">If you are running locally on localhost or Vercel env variable is not set yet, enter token for this browser session:</p>
                <input 
                  type="password"
                  value={gitHubToken}
                  onChange={(e) => setGitHubTokenState(e.target.value)}
                  placeholder="github_pat_... or ghp_..."
                  className="w-full px-4 py-2 border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-accent font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowGitHubModal(false)}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-medium rounded hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  type="button"
                  onClick={handleSaveToken} 
                  disabled={isSyncing}
                  className="px-5 py-2 bg-[#0B1120] text-white hover:bg-accent hover:text-[#0B1120] text-xs font-semibold rounded transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSyncing ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                  <span>Test Session Token</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="font-heading text-lg font-bold text-slate-900">
                {showEditModal ? 'Edit Knowledge Item' : 'Add New Knowledge Item'}
              </h2>
              <button 
                onClick={() => { setShowAddModal(false); setShowEditModal(false); }}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleFormChange}
                  placeholder="e.g. Overview of Union Budget Tax Amendments"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Category *</label>
                  <select 
                    name="category" 
                    required 
                    value={formData.category} 
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent bg-white"
                  >
                    <option value="news">News &amp; Updates</option>
                    <option value="article">Articles</option>
                    <option value="publication">Publications</option>
                    <option value="report">Reports &amp; Insights</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Publish Date *</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={formData.date} 
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Author / Firm</label>
                  <input 
                    type="text" 
                    name="author" 
                    value={formData.author} 
                    onChange={handleFormChange}
                    placeholder="Devansh Singhal & Co."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Read Time</label>
                  <input 
                    type="text" 
                    name="readTime" 
                    value={formData.readTime} 
                    onChange={handleFormChange}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Short Description / Summary *</label>
                <textarea 
                  name="description" 
                  required 
                  rows={3} 
                  value={formData.description} 
                  onChange={handleFormChange}
                  placeholder="Provide a brief summary that appears on cards..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">PDF Link (Optional)</label>
                <input 
                  type="text" 
                  name="pdfUrl" 
                  value={formData.pdfUrl} 
                  onChange={handleFormChange}
                  placeholder="/documents/filename.pdf or https://..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Full Details / Excerpt (Optional)</label>
                <textarea 
                  name="content" 
                  rows={4} 
                  value={formData.content} 
                  onChange={handleFormChange}
                  placeholder="Extended article body or publication details..."
                  className="w-full px-4 py-2.5 border border-slate-300 rounded text-sm text-slate-900 focus:outline-none focus:border-accent resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
                <button 
                  type="button" 
                  onClick={() => { setShowAddModal(false); setShowEditModal(false); }}
                  className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSyncing}
                  className="px-6 py-2.5 bg-[#0B1120] text-white hover:bg-accent hover:text-[#0B1120] text-sm font-semibold rounded transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSyncing ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Save className="w-4 h-4" />}
                  <span>Save &amp; Commit Item</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Knowledge Item?</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-slate-900">"{items.find(i => i.id === deletingItemId)?.title}"</span>?
            </p>
            
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isSyncing}
                className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSyncing && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Delete &amp; Commit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Clear All Items?</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              This will clear all items and set <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">knowledgeData.json</code> to an empty dataset <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">[]</code>.
            </p>
            
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset}
                disabled={isSyncing}
                className="px-5 py-2 bg-amber-600 text-white text-sm font-semibold rounded hover:bg-amber-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSyncing && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
