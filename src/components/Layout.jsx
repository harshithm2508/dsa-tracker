import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen pb-20">
            <nav className="glass sticky top-0 z-50 mb-8 rounded-none border-x-0 border-t-0">
                <div className="container mx-auto px-4 flex justify-between items-center py-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            DSA Tracker
                        </h1>
                    </div>

                    <div className="flex gap-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/track"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`
                            }
                        >
                            Track
                        </NavLink>
                        <NavLink
                            to="/bookmarks"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? 'text-yellow-600' : 'text-slate-500 hover:text-slate-900'}`
                            }
                        >
                            Bookmarks
                        </NavLink>
                    </div>
                </div>
            </nav>
            <main className="container animate-fade-in">
                {children}
            </main>
        </div>
    );
}
