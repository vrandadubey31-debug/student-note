import { Link } from "react-router-dom";
import { Tag, Pencil, Trash2 } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  const preview =
    note.content.length > 140
      ? `${note.content.slice(0, 140)}...`
      : note.content;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full min-w-0">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug flex-1 min-w-0 break-words">
          <Link
            to={`/notes/${note._id}`}
            className="hover:text-emerald-600 transition-colors"
          >
            {note.title}
          </Link>
        </h3>
        <span className="shrink-0 max-w-[120px] inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold truncate">
          <Tag size={10} className="shrink-0" />
          <span className="truncate">{note.subject}</span>
        </span>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4 break-words line-clamp-3">
        {preview}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 flex-wrap gap-2 mt-auto">
        <span className="text-[11px] text-gray-400">
          {new Date(note.updatedAt || note.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(note)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <Pencil size={12} />
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

