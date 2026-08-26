import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

const NoteDetail = () => {
  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center text-gray-400 text-sm">
          Loading note...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <article className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
            <Tag size={12} />
            {note.subject}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{note.title}</h1>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <Calendar size={12} />
          Created: {new Date(note.createdAt).toLocaleString()}
          <span className="mx-1">|</span>
          Updated: {new Date(note.updatedAt).toLocaleString()}
        </div>

        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
          {note.content}
        </div>
      </article>
    </div>
  );
};

export default NoteDetail;
