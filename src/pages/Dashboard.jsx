export default function Dashboard({ stats }) {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Progress</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card flex flex-col items-center justify-center p-8">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{stats.total}</div>
                    <div className="text-slate-500 font-medium">Total Questions</div>
                </div>

                <div className="glass-card flex flex-col items-center justify-center p-8">
                    <div className="text-4xl font-bold text-green-500 mb-2">{stats.solved}</div>
                    <div className="text-slate-500 font-medium">Solved Questions</div>
                </div>

                <div className="glass-card flex flex-col items-center justify-center p-8">
                    <div className="text-4xl font-bold text-yellow-500 mb-2">{stats.bookmarked}</div>
                    <div className="text-slate-500 font-medium">Bookmarked (Active)</div>
                </div>
            </div>

            <div className="mt-12 glass-card">
                <h2 className="text-xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-slate-600">
                    Keep tracking your DSA journey. Go to the <a href="/track" className="text-blue-600 font-semibold">Track</a> page to add new questions or view your collection.
                </p>
            </div>
        </div>
    );
}
