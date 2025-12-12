import { useState } from 'react';

export default function QuestionDetails({ question, onClose, onEdit }) {
    if (!question) return null;

    // Normalize code to array if it's a string (backward compatibility)
    const codeSolutions = Array.isArray(question.code)
        ? question.code
        : [{ title: 'Solution', content: question.code || '' }];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="bg-white rounded-xl shadow-2xl w-full h-full overflow-y-auto relative animate-fade-in">
                <div className="p-4 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">{question.title}</h2>
                        <div className="flex flex-wrap gap-2">
                            {question.tags.map(t => (
                                <span key={t} className="tag">{t}</span>
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">
                        ✕
                    </button>
                </div>

                <div className="p-4 grid gap-4">
                    {/* Meta Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wider mb-2">Complexity</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-slate-400 block">Time</span>
                                    <span className="font-mono font-medium text-slate-700">{question.timeComplexity || '-'}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block">Space</span>
                                    <span className="font-mono font-medium text-slate-700">{question.spaceComplexity || '-'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-4 rounded-lg flex flex-col justify-center">
                            <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wider mb-2">Status</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${question.status === 'Solved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {question.status}
                                    </span>
                                    {question.link && (
                                        <a href={question.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                            View Problem ↗
                                        </a>
                                    )}
                                </div>
                                {question.scheduledFor && (
                                    <div className="text-sm text-slate-600 flex items-center gap-2">
                                        <span>📅 Scheduled for:</span>
                                        <span className="font-medium">
                                            {new Date(question.scheduledFor).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Explanation */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Explanation</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {question.explanation || 'No explanation provided.'}
                        </p>
                    </div>

                    {/* Approaches */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">Approaches</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {question.approaches || 'No approaches recorded.'}
                        </p>
                    </div>

                    {/* Code */}
                    <div>
                        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                            <h3 className="text-lg font-bold text-slate-800">Code Solution</h3>
                            {codeSolutions.length > 1 && (
                                <div className="flex gap-2">
                                    {codeSolutions.map((sol, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveTab(idx)}
                                            className={`px-3 py-1 text-xs rounded-full transition-colors ${activeTab === idx
                                                ? 'bg-blue-100 text-blue-700 font-medium'
                                                : 'text-slate-500 hover:bg-slate-100'
                                                }`}
                                        >
                                            {sol.title || `Solution ${idx + 1}`}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto relative group">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                                    {codeSolutions[activeTab]?.title || 'Solution'}
                                </span>
                            </div>
                            <pre className="font-mono text-sm text-slate-200">
                                <code>{codeSolutions[activeTab]?.content || '// No code provided'}</code>
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 sticky bottom-0 flex justify-end gap-3">
                    <button onClick={onClose} className="btn btn-secondary">
                        Close
                    </button>
                    <button
                        onClick={() => {
                            onEdit(question);
                            onClose();
                        }}
                        className="btn btn-primary"
                    >
                        Edit Question
                    </button>
                </div>
            </div>
        </div>
    );
}
