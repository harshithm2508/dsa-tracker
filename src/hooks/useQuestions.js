import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/questions';

export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const addQuestion = async (questionData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionData),
      });
      const newQuestion = await res.json();
      setQuestions([newQuestion, ...questions]);
    } catch (err) {
      console.error('Error adding question:', err);
    }
  };

  const updateQuestion = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setQuestions(questions.map(q => q.id === id ? updated : q));
    } catch (err) {
      console.error('Error updating question:', err);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  const toggleBookmark = (id) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      updateQuestion(id, { isBookmarked: !question.isBookmarked });
    }
  };

  const markAsSolved = (id) => {
    updateQuestion(id, { status: 'Solved', dateSolved: new Date().toISOString() });
  };

  const getStats = () => {
    const total = questions.length;
    const solved = questions.filter(q => q.status === 'Solved').length;
    const bookmarked = questions.filter(q => q.isBookmarked && q.status !== 'Solved').length;
    return { total, solved, bookmarked };
  };

  return {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleBookmark,
    markAsSolved,
    getStats
  };
};
