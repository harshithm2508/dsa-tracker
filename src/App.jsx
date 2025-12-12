import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Track from './pages/Track';
import Bookmarks from './pages/Bookmarks';
import { useQuestions } from './hooks/useQuestions';

function App() {
  const {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleBookmark,
    markAsSolved,
    getStats
  } = useQuestions();

  const stats = getStats();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard stats={stats} questions={questions} />} />
          <Route path="/track" element={
            <Track
              questions={questions}
              addQuestion={addQuestion}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
              toggleBookmark={toggleBookmark}
              markAsSolved={markAsSolved}
            />
          } />
          <Route path="/bookmarks" element={
            <Bookmarks
              questions={questions}
              toggleBookmark={toggleBookmark}
              markAsSolved={markAsSolved}
            />
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
