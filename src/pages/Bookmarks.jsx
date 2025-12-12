import { useState } from 'react';

export default function Bookmarks({ questions, toggleBookmark, markAsSolved }) {
    const [selectedDate, setSelectedDate] = useState('');

    const bookmarkedQuestions = questions.filter(q => {
        if (!q.isBookmarked) return false;
        if (!selectedDate) return true;
        if (!q.scheduledFor) return false;
        // Compare dates (YYYY-MM-DD)
        return q.scheduledFor.split('T')[0] === selectedDate;
    }).sort((a, b) => {
        // Sort by scheduledFor date ascending
        // If no date, put at the end
        if (!a.scheduledFor) return 1;
        if (!b.scheduledFor) return -1;
        return new Date(a.scheduledFor) - new Date(b.scheduledFor);
    });

    const clearFilter = () => setSelectedDate('');

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Bookmarked Questions</h1>
                    <p className="text-slate-500">Focus on these problems today.</p>
                </div>
                <div className="flex items-end gap-2">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Filter by Date</label>
                        <input
                            type="date"
                            className="py-2 px-3 text-sm"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    {selectedDate && (
                        <button onClick={clearFilter} className="text-sm text-slate-500 hover:text-slate-800 underline pb-2">
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {bookmarkedQuestions.length === 0 ? (
                <div className="text-center py-20 glass-card">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">
                        {selectedDate ? 'No questions scheduled for this date' : 'No Bookmarks'}
                    </h3>
                    <p className="text-slate-500">
                        {selectedDate
                            ? 'Try selecting a different date or clear the filter.'
                            : <span>Go to the <a href="/track" className="text-blue-600 font-medium">Track</a> page to bookmark questions.</span>
                        }
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {bookmarkedQuestions.map(q => (
                        <div key={q.id} className="glass-card flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg">{q.title}</h3>
                                    {q.status === 'Solved' && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                            Solved
                                        </span>
                                    )}
                                    {q.scheduledFor && (
                                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                                            📅 {new Date(q.scheduledFor).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2 text-sm text-slate-500">
                                    {q.tags.map(t => <span key={t}>#{t}</span>)}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {q.link && (
                                    <a href={q.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xs">
                                        Solve
                                    </a>
                                )}
                                {q.status !== 'Solved' && (
                                    <button onClick={() => markAsSolved(q.id)} className="btn btn-primary text-xs">
                                        Mark Solved
                                    </button>
                                )}
                                <button
                                    onClick={() => toggleBookmark(q.id)}
                                    className="btn btn-secondary text-xs text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                                >
                                    Remove Bookmark
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
