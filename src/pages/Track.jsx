import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import QuestionDetails from '../components/QuestionDetails';

export default function Track({ questions, addQuestion, updateQuestion, deleteQuestion, toggleBookmark, markAsSolved }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const filteredQuestions = questions.filter(q => {
        const term = searchTerm.toLowerCase();
        return (
            q.title.toLowerCase().includes(term) ||
            q.tags.some(t => t.toLowerCase().includes(term))
        );
    });

    // Group by first tag for "Canvas" feel, or just list them if no tags
    const groupedQuestions = filteredQuestions.reduce((acc, q) => {
        const key = q.tags[0] || 'Uncategorized';
        if (!acc[key]) acc[key] = [];
        acc[key].push(q);
        return acc;
    }, {});

    const handleSave = (data) => {
        if (editingId) {
            updateQuestion(editingId, data);
        } else {
            addQuestion(data);
        }
        setIsFormOpen(false);
        setEditingId(null);
    };

    const handleEdit = (q) => {
        setEditingId(q.id);
        setIsFormOpen(true);
        setSelectedQuestion(null); // Close details view if open
    };

    return (
        <div className="relative border-x-10 border-white min-h-[80vh]">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-slate-50/90 backdrop-blur z-10 py-2 border-b border-slate-200">
                <h1 className="text-3xl font-bold">Track Questions</h1>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search questions or tags..."
                        className="w-64"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button onClick={() => setIsFormOpen(true)} className="btn w-64 btn-primary">
                        + Add Question
                    </button>
                </div>
            </div>

            <div className="canvas-grid pb-20">
                {Object.entries(groupedQuestions).sort((a, b) => a[0].localeCompare(b[0])).map(([group, items]) => (
                    <div key={group} className="glass-card break-inside-avoid mb-6">
                        <h3 className="font-bold text-lg mb-4 text-blue-600 uppercase tracking-wider text-xs border-b border-blue-100 pb-2">
                            {group}
                        </h3>
                        <div className="grid gap-4">
                            {items.map(q => (
                                <div
                                    key={q.id}
                                    onClick={() => setSelectedQuestion(q)}
                                    className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{q.title}</h4>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleBookmark(q.id); }}
                                            className={`text-lg ${q.isBookmarked ? 'text-yellow-500' : 'text-slate-300'}`}
                                        >
                                            ★
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {q.tags.map(t => (
                                            <span key={t} className="tag">{t}</span>
                                        ))}
                                    </div>

                                    <div className="text-xs text-slate-500 mb-3 line-clamp-2">
                                        {q.approaches || 'No approach added.'}
                                    </div>

                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                                        <div className="flex gap-2">
                                            {q.status !== 'Solved' && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); markAsSolved(q.id); }}
                                                    className="text-xs text-green-600 font-medium hover:underline"
                                                >
                                                    Mark Solved
                                                </button>
                                            )}
                                            {q.link && (
                                                <a
                                                    href={q.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-xs text-blue-500 hover:underline"
                                                >
                                                    Link ↗
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleEdit(q); }}
                                                className="text-xs text-slate-400 hover:text-slate-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteQuestion(q.id); }}
                                                className="text-xs text-red-400 hover:text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <QuestionForm
                    onSave={handleSave}
                    onCancel={() => { setIsFormOpen(false); setEditingId(null); }}
                    initialData={editingId ? questions.find(q => q.id === editingId) : {}}
                />
            )}

            {selectedQuestion && (
                <QuestionDetails
                    question={selectedQuestion}
                    onClose={() => setSelectedQuestion(null)}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
}
