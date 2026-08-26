import { useState } from "react";
import { Save, X } from "lucide-react";

const NoteForm = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), subject: subject.trim(), content });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save note");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {initialData ? "Edit Note" : "New Note"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {initialData
            ? "Update the details of your note."
            : "Write down what you want to remember."}
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-1.5">
              Title
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chapter 5 - Thermodynamics"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="note-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
              Subject
            </label>
            <input
              id="note-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Physics"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="note-content" className="block text-sm font-medium text-gray-700 mb-1.5">
              Content
            </label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your notes here..."
              rows={8}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 resize-none transition-colors"
            />
          </div>

          <div className="flex gap-3 mt-1">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Save size={16} />
              {submitting ? "Saving..." : initialData ? "Update Note" : "Create Note"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
