export default function Notes() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Notes</h1>
            <p className="text-slate-400">Capture your thoughts and ideas with rich formatting</p>
          </div>
          <button 
            onClick={() => setShowNoteModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <FileText className="w-24 h-24 text-slate-700 mb-6" />
            <h3 className="text-2xl font-bold mb-2">No notes yet</h3>
            <p className="text-slate-400 mb-6">Create your first note to get started</p>
            <button 
              onClick={() => setShowNoteModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Your First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div key={note.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                <p className="text-slate-400 text-sm">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  )
}
