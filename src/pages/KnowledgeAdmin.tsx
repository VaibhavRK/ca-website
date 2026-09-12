import React, { useState, useEffect } from 'react';
import { getKnowledgeItems, addKnowledgeItem, updateKnowledgeItem, deleteKnowledgeItem, resetKnowledgeToDefaults, generateId } from '../data/knowledge';
import type { KnowledgeItem } from '../data/knowledge';
import { Plus, Edit, Trash2, RotateCcw, X, Save, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type FilterType = 'All' | 'news' | 'article' | 'publication';

export default function KnowledgeAdmin() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Data state
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'news',
    date: '',
    description: '',
    pdfUrl: '',
    content: ''
  });

  const loadItems = () => {
    setItems(getKnowledgeItems());
  };

  useEffect(() => {
    loadItems();
    document.title = 'Knowledge Panel | Admin';
  }, []);

  const stats = {
    total: items.length,
    news: items.filter(i => i.category === 'news').length,
    articles: items.filter(i => i.category === 'article').length,
    publications: items.filter(i => i.category === 'publication').length,
  };

  const filteredItems = items.filter(item => filter === 'All' || item.category === filter);

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'news',
      date: new Date().toISOString().split('T')[0],
      description: '',
      pdfUrl: '',
      content: ''
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
      content: item.content || ''
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (id: string) => {
    setDeletingItemId(id);
    setShowDeleteConfirm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showEditModal && editingItem) {
      updateKnowledgeItem(editingItem.id, {
        title: formData.title,
        category: formData.category as 'news' | 'article' | 'publication',
        date: formData.date,
        description: formData.description,
        pdfUrl: formData.pdfUrl || undefined,
        content: formData.content || undefined
      });
      setShowEditModal(false);
      setEditingItem(null);
    } else {
      addKnowledgeItem({
        id: generateId(),
        title: formData.title,
        category: formData.category as 'news' | 'article' | 'publication',
        date: formData.date,
        description: formData.description,
        pdfUrl: formData.pdfUrl || undefined,
        content: formData.content || undefined
      });
      setShowAddModal(false);
    }
    
    loadItems();
  };

  const handleDelete = () => {
    if (deletingItemId) {
      deleteKnowledgeItem(deletingItemId);
      setShowDeleteConfirm(false);
      setDeletingItemId(null);
      loadItems();
    }
  };

  const handleReset = () => {
    resetKnowledgeToDefaults();
    setShowResetConfirm(false);
    loadItems();
  };

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'article': return 'bg-green-100 text-green-800';
      case 'publication': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-bg-alt">
      {/* Header */}
      <header className="bg-primary py-6">
        <div className="section-container flex justify-between items-center">
          <h1 className="font-heading text-2xl text-white">Knowledge Panel</h1>
          <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 section-container">
        
        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="bg-white border border-border p-4 flex-1 rounded-sm shadow-sm">
            <div className="text-sm text-text-secondary mb-1">Total Items</div>
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
          </div>
          <div className="bg-white border border-border p-4 flex-1 rounded-sm shadow-sm">
            <div className="text-sm text-text-secondary mb-1">News</div>
            <div className="text-2xl font-bold text-primary">{stats.news}</div>
          </div>
          <div className="bg-white border border-border p-4 flex-1 rounded-sm shadow-sm">
            <div className="text-sm text-text-secondary mb-1">Articles</div>
            <div className="text-2xl font-bold text-primary">{stats.articles}</div>
          </div>
          <div className="bg-white border border-border p-4 flex-1 rounded-sm shadow-sm">
            <div className="text-sm text-text-secondary mb-1">Publications</div>
            <div className="text-2xl font-bold text-primary">{stats.publications}</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <button 
            onClick={openAddModal}
            className="bg-primary text-white px-5 py-2.5 hover:bg-accent transition-colors flex items-center gap-2 rounded-sm w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Item</span>
          </button>

          <button 
            onClick={() => setShowResetConfirm(true)}
            className="bg-white border border-border text-text-secondary px-5 py-2.5 hover:border-red-300 hover:text-red-600 transition-colors flex items-center gap-2 rounded-sm w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-border">
          {(['All', 'news', 'article', 'publication'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 capitalize whitespace-nowrap text-sm font-medium transition-colors ${
                filter === f 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List / Table */}
        <div className="bg-white border border-border rounded-sm overflow-hidden shadow-sm">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-bg-alt text-sm font-medium text-text-muted uppercase tracking-wider border-b border-border">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">PDF</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Items */}
          {filteredItems.length === 0 ? (
            <div className="px-6 py-12 text-center text-text-muted">
              No items found.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredItems.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="md:col-span-4 font-medium text-text-primary truncate">
                    {item.title}
                  </div>
                  
                  <div className="md:col-span-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getCategoryBadgeColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="md:col-span-2 text-sm text-text-secondary">
                    {new Date(item.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <div className="md:col-span-2 flex items-center">
                    {item.pdfUrl ? (
                      <span className="flex items-center text-xs text-text-secondary gap-1">
                        <FileText className="w-4 h-4" /> Yes
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">-</span>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2 md:mt-0">
                    <button 
                      onClick={() => openEditModal(item)}
                      className="p-2 text-primary hover:text-accent hover:bg-primary/5 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => openDeleteConfirm(item.id)}
                      className="p-2 text-text-muted hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
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

      {/* Add / Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-white">
              <h2 className="font-heading text-xl text-primary">
                {showEditModal ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button 
                onClick={() => { setShowAddModal(false); setShowEditModal(false); }}
                className="text-text-muted hover:text-text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  required 
                  value={formData.title} 
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-primary"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Category *</label>
                  <select 
                    name="category" 
                    required 
                    value={formData.category} 
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-primary bg-white capitalize"
                  >
                    <option value="news">News</option>
                    <option value="article">Article</option>
                    <option value="publication">Publication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Date *</label>
                  <input 
                    type="date" 
                    name="date" 
                    required 
                    value={formData.date} 
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Description *</label>
                <textarea 
                  name="description" 
                  required 
                  rows={3} 
                  value={formData.description} 
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">PDF URL (Optional)</label>
                <input 
                  type="text" 
                  name="pdfUrl" 
                  value={formData.pdfUrl} 
                  onChange={handleFormChange}
                  placeholder="/documents/filename.pdf"
                  className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Content (Optional)</label>
                <textarea 
                  name="content" 
                  rows={5} 
                  value={formData.content} 
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3 sticky bottom-0 bg-white">
                <button 
                  type="button" 
                  onClick={() => { setShowAddModal(false); setShowEditModal(false); }}
                  className="px-5 py-2.5 bg-white border border-border text-text-secondary hover:bg-gray-50 rounded-sm transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-primary text-white hover:bg-accent rounded-sm transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-sm p-6 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading text-primary mb-2">Delete this item?</h3>
            <p className="text-text-secondary mb-1">
              Are you sure you want to delete <span className="font-medium text-text-primary">"{items.find(i => i.id === deletingItemId)?.title}"</span>?
            </p>
            <p className="text-red-500 text-sm mb-6">This action cannot be undone.</p>
            
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2 bg-white border border-border text-text-secondary hover:bg-gray-50 rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white hover:bg-red-700 rounded-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-sm p-6 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading text-primary mb-2">Reset all items?</h3>
            <p className="text-text-secondary mb-6">
              This will remove all custom items and restore the default knowledge items. This action cannot be undone.
            </p>
            
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="px-5 py-2 bg-white border border-border text-text-secondary hover:bg-gray-50 rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset}
                className="px-5 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-sm transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
