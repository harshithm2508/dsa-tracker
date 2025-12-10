export default function Bookmarks({ questions, toggleBookmark, markAsSolved }) {
    const bookmarkedQuestions = questions.filter(q => q.isBookmarked);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Bookmarked Questions</h1>
            <p className="text-slate-500 mb-8">Focus on these problems today.</p>

            {bookmarkedQuestions.length === 0 ? (
                <div className="text-center py-20 glass-card">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No Bookmarks</h3>
                    <p className="text-slate-500">
                        Go to the <a href="/track" className="text-blue-600 font-medium">Track</a> page to bookmark questions you want to solve.
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
