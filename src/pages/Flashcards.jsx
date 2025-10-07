import MainLayout from "../components/MainLayout";
import React, { useState } from 'react';
import { Plus, X, Save, RotateCw, ChevronLeft, Layers, ChevronRight, Edit2, Trash2, BookOpen, Target, SquareChartGantt } from 'lucide-react';

export default function Flashcards() {
  const [view, setView] = useState('library');
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentSet, setCurrentSet] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [newSet, setNewSet] = useState({
    title: '',
    description: '',
    cards: [{ question: '', answer: '' }]
  });

  const handleCreateSet = () => {
    if (newSet.title.trim() && newSet.cards.some(card => card.question.trim() && card.answer.trim())) {
      const validCards = newSet.cards.filter(card => card.question.trim() && card.answer.trim());
      setFlashcardSets([...flashcardSets, {
        ...newSet,
        cards: validCards,
        id: Date.now(),
        createdAt: new Date().toLocaleDateString()
      }]);
      setNewSet({ title: '', description: '', cards: [{ question: '', answer: '' }] });
      setShowCreateModal(false);
    }
  };

  const addCard = () => {
    setNewSet({
      ...newSet,
      cards: [...newSet.cards, { question: '', answer: '' }]
    });
  };

  const updateCard = (index, field, value) => {
    const updatedCards = [...newSet.cards];
    updatedCards[index][field] = value;
    setNewSet({ ...newSet, cards: updatedCards });
  };

  const removeCard = (index) => {
    if (newSet.cards.length > 1) {
      setNewSet({
        ...newSet,
        cards: newSet.cards.filter((_, i) => i !== index)
      });
    }
  };

  const startStudying = (set) => {
    setCurrentSet(set);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setView('study');
  };

  const nextCard = () => {
    if (currentCardIndex < currentSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const deleteSet = (id) => {
    setFlashcardSets(flashcardSets.filter(set => set.id !== id));
  };

  return (
    <MainLayout>
      <div className="min-h-screen text-white p-8">
        <div className="max-w-7xl mx-auto">
          {view === 'library' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Flashcard Library</h1>
                  <p className="text-zinc-400">Create and study flashcard sets to boost your learning</p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-emerald-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Flashcard Set
                </button>
              </div>

              {flashcardSets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Layers className="w-24 h-24 text-zinc-700 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">No flashcard sets yet</h3>
                  <p className="text-zinc-400 mb-6">Create your first flashcard set to start studying</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-emerald-800 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Set
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flashcardSets.map(set => (
                    <div key={set.id} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-zinc-500/50 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">{set.title}</h3>
                          <p className="text-sm text-zinc-400 mb-2">{set.description}</p>
                        </div>
                        <button
                          onClick={() => deleteSet(set.id)}
                          className="text-zinc-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded text-sm font-medium">
                          {set.cards.length} cards
                        </div>
                        <div className="text-xs text-zinc-500">
                          Created: {set.createdAt}
                        </div>
                      </div>
                      <button
                        onClick={() => startStudying(set)}
                        className="w-full bg-emerald-800 hover:bg-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Study Now
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

         
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
              <div className="bg-zinc-800 rounded-xl p-6 max-w-3xl w-full border border-zinc-700 my-8">
                Hello World
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}