import { useState } from 'react';

export default function QuestionForm({ onSave, onCancel, initialData = {} }) {
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        explanation: '',
        approaches: '',
        timeComplexity: '',
        spaceComplexity: '',
        tags: '',
        code: '',
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(', ') : ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold">
                        {initialData.id ? 'Edit Question' : 'Add New Question'}
                    </h2>
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 grid gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Two Sum"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Problem Link</label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={e => setFormData({ ...formData, link: e.target.value })}
                            placeholder="https://leetcode.com/..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Time Complexity</label>
                            <input
                                type="text"
                                value={formData.timeComplexity}
                                onChange={e => setFormData({ ...formData, timeComplexity: e.target.value })}
                                placeholder="e.g., O(n)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Space Complexity</label>
                            <input
                                type="text"
                                value={formData.spaceComplexity}
                                onChange={e => setFormData({ ...formData, spaceComplexity: e.target.value })}
                                placeholder="e.g., O(1)"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="Array, Hash Table, Two Pointers"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Explanation</label>
                        <textarea
                            rows={3}
                            value={formData.explanation}
                            onChange={e => setFormData({ ...formData, explanation: e.target.value })}
                            placeholder="Brief explanation of the problem..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Approaches</label>
                        <textarea
                            rows={3}
                            value={formData.approaches}
                            onChange={e => setFormData({ ...formData, approaches: e.target.value })}
                            placeholder="Describe your approach(es)..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Code Solution</label>
                        <textarea
                            rows={6}
                            className="font-mono text-sm bg-slate-50"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            placeholder="// Paste your code here"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
