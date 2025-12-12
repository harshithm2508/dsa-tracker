import { useState } from 'react';

export default function QuestionForm({ onSave, onCancel, initialData = {} }) {
    // Helper to ensure code is always an array
    const normalizeCode = (code) => {
        if (Array.isArray(code)) return code;
        if (typeof code === 'string' && code.trim()) {
            return [{ title: 'Solution 1', content: code }];
        }
        return [{ title: 'Solution 1', content: '' }];
    };

    const [activeTab, setActiveTab] = useState(0); // Add activeTab state

    const [formData, setFormData] = useState({
        title: '',
        link: '',
        explanation: '',
        approaches: '',
        timeComplexity: '',
        spaceComplexity: '',
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(', ') : '',
        code: normalizeCode(initialData.code)
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            // Filter out empty solutions
            code: formData.code.filter(c => c.content.trim()),
            // Ensure empty date string is sent as null
            scheduledFor: formData.scheduledFor || null,
            dateSolved: formData.dateSolved || null
        };

        // Auto-bookmark if scheduled date is set
        if (finalData.scheduledFor) {
            finalData.isBookmarked = true;
        }

        onSave(finalData);
    };

    const handleCodeChange = (index, field, value) => {
        const newCode = [...formData.code];
        newCode[index] = { ...newCode[index], [field]: value };
        setFormData({ ...formData, code: newCode });
    };

    const addSolution = () => {
        const newCode = [...formData.code, { title: `Solution ${formData.code.length + 1}`, content: '' }]
        setFormData({
            ...formData,
            code: newCode
        });
        setActiveTab(newCode.length - 1);
    };

    const removeSolution = (index) => {
        if (formData.code.length === 1) return; // Keep at least one
        const newCode = formData.code.filter((_, i) => i !== index);
        setFormData({ ...formData, code: newCode });
        // Adjust active tab if needed
        if (activeTab >= index && activeTab > 0) {
            setActiveTab(activeTab - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center bg-blue-50 z-50 backdrop-blur-md">
            <div className="bg-white shadow-2xl w-full h-full flex flex-col overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10 shrink-0">
                    <h2 className="text-xl font-bold">
                        {initialData.id ? 'Edit Question' : 'Add New Question'}
                    </h2>
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                            {/* Left Column: Details */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Two Sum"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Problem Link</label>
                                    <input
                                        type="url"
                                        value={formData.link}
                                        onChange={e => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="https://leetcode.com/..."
                                        className="w-full"
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
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Space Complexity</label>
                                        <input
                                            type="text"
                                            value={formData.spaceComplexity}
                                            onChange={e => setFormData({ ...formData, spaceComplexity: e.target.value })}
                                            placeholder="e.g., O(1)"
                                            className="w-full"
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
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Schedule For (Optional)</label>
                                    <input
                                        type="date"
                                        value={formData.scheduledFor ? formData.scheduledFor.split('T')[0] : ''}
                                        onChange={e => setFormData({ ...formData, scheduledFor: e.target.value })}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Date Solved</label>
                                    <input
                                        type="date"
                                        value={formData.dateSolved ? formData.dateSolved.split('T')[0] : ''}
                                        onChange={e => setFormData({ ...formData, dateSolved: e.target.value })}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Explanation</label>
                                    <textarea
                                        rows={3}
                                        value={formData.explanation}
                                        onChange={e => setFormData({ ...formData, explanation: e.target.value })}
                                        placeholder="Brief explanation of the problem..."
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Approaches</label>
                                    <textarea
                                        rows={3}
                                        value={formData.approaches}
                                        onChange={e => setFormData({ ...formData, approaches: e.target.value })}
                                        placeholder="Describe your approach(es)..."
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Code Solutions */}
                            <div className="space-y-4 flex flex-col h-full lg:h-auto">
                                <div className="flex justify-between items-center bg-slate-100 p-1 rounded-lg shrink-0">
                                    <div className="flex gap-1 overflow-x-auto">
                                        {formData.code.map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setActiveTab(index)}
                                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${activeTab === index
                                                    ? 'bg-white text-blue-600 shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {formData.code[index].title || `Solution ${index + 1}`}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addSolution}
                                        className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors whitespace-nowrap"
                                    >
                                        + Add
                                    </button>
                                </div>

                                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col flex-1 min-h-[400px]">
                                    <div className="flex justify-between mb-2">
                                        <input
                                            type="text"
                                            value={formData.code[activeTab].title}
                                            onChange={e => handleCodeChange(activeTab, 'title', e.target.value)}
                                            className="text-sm font-semibold bg-transparent border-none p-0 focus:ring-0 w-full"
                                            placeholder={`Solution ${activeTab + 1}`}
                                        />
                                        {formData.code.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSolution(activeTab)}
                                                className="text-xs text-red-500 hover:text-red-700 ml-2 whitespace-nowrap"
                                            >
                                                Remove Tab
                                            </button>
                                        )}
                                    </div>
                                    <textarea
                                        className="font-mono text-sm bg-white w-full flex-1 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none resize-none"
                                        value={formData.code[activeTab].content}
                                        onChange={e => handleCodeChange(activeTab, 'content', e.target.value)}
                                        placeholder="// Paste your code here"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50 shrink-0">
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
