import MainLayout from "../components/MainLayout";
import React, { useState } from 'react';
import { Plus, X, Save, RotateCw, ChevronLeft, ChevronRight, Edit2, Trash2, BookOpen, Target, SquareChartGantt } from 'lucide-react';

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
                <p className="text-slate-400">Create and study flashcard sets to boost your learning</p>
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Flashcard Set
              </button>
            </div>

            {flashcardSets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <SquareChartGantt className="w-24 h-24 text-slate-700 mb-6" />
                <h3 className="text-2xl font-bold mb-2">No flashcard sets yet</h3>
                <p className="text-slate-400 mb-6">Create your first flashcard set to start studying</p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Set
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashcardSets.map(set => (
                  <div key={set.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{set.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{set.description}</p>
                      </div>
                      <button 
                        onClick={() => deleteSet(set.id)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-sm font-medium">
                        {set.cards.length} cards
                      </div>
                      <div className="text-xs text-slate-500">
                        Created: {set.createdAt}
                      </div>
                    </div>
                    <button 
                      onClick={() => startStudying(set)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Study Now
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {view === 'study' && currentSet && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <button 
                  onClick={() => setView('library')}
                  className="text-emerald-500 hover:text-emerald-400 mb-2 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Library
                </button>
                <h1 className="text-4xl font-bold mb-2">{currentSet.title}</h1>
                <p className="text-slate-400">Card {currentCardIndex + 1} of {currentSet.cards.length}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-500">
                  {Math.round((currentCardIndex / currentSet.cards.length) * 100)}%
                </div>
                <div className="text-sm text-slate-400">Progress</div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                    style={{ width: ((currentCardIndex + 1) / currentSet.cards.length * 100) + '%' }}
                  ></div>
                </div>
              </div>

              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-slate-800 rounded-xl p-12 border border-slate-700 min-h-[400px] flex items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-all mb-6"
              >
                <div className="text-center">
                  <div className="text-sm text-slate-500 mb-4">
                    {isFlipped ? 'Answer' : 'Question'}
                  </div>
                  <div className="text-3xl font-medium">
                    {isFlipped 
                      ? currentSet.cards[currentCardIndex].answer 
                      : currentSet.cards[currentCardIndex].question
                    }
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
                    <RotateCw className="w-4 h-4" />
                    <span className="text-sm">Click to flip</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button 
                  onClick={previousCard}
                  disabled={currentCardIndex === 0}
                  className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                <div className="text-slate-400">
                  {currentCardIndex + 1} / {currentSet.cards.length}
                </div>
                <button 
                  onClick={nextCard}
                  disabled={currentCardIndex === currentSet.cards.length - 1}
                  className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {currentCardIndex === currentSet.cards.length - 1 && (
                <div className="mt-6 bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-6 text-center">
                  <Target className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Set Complete!</h3>
                  <p className="text-slate-400 mb-4">You have reviewed all {currentSet.cards.length} cards</p>
                  <button 
                    onClick={() => {
                      setCurrentCardIndex(0);
                      setIsFlipped(false);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Review Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-slate-800 rounded-xl p-6 max-w-3xl w-full border border-slate-700 my-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create Flashcard Set</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Set Title</label>
                  <input
                    type="text"
                    value={newSet.title}
                    onChange={(e) => setNewSet({ ...newSet, title: e.target.value })}
                    placeholder="e.g., Spanish Vocabulary, Biology Terms"
                    className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Description (Optional)</label>
                  <input
                    type="text"
                    value={newSet.description}
                    onChange={(e) => setNewSet({ ...newSet, description: e.target.value })}
                    placeholder="Brief description of this set"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-white">Cards</label>
                    <button 
                      onClick={addCard}
                      className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Card
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {newSet.cards.map((card, index) => (
                      <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-400">Card {index + 1}</span>
                          {newSet.cards.length > 1 && (
                            <button 
                              onClick={() => removeCard(index)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-slate-500 mb-1">Question</label>
                            <input
                              type="text"
                              value={card.question}
                              onChange={(e) => updateCard(index, 'question', e.target.value)}
                              placeholder="Enter question or term"
                              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 mb-1">Answer</label>
                            <textarea
                              value={card.answer}
                              onChange={(e) => updateCard(index, 'answer', e.target.value)}
                              placeholder="Enter answer or definition"
                              rows="2"
                              className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-slate-700">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateSet}
                  className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Create Set
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </MainLayout>
  );
}