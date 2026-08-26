import { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  FileText,
  BarChart3,
  MessageSquare,
  StickyNote,
  Settings,
  LogOut,
  Search,
  Sparkles,
  MoreVertical,
  Plus,
  ChevronDown,
  MessageCircle,
  MapPin,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Calendar, label: "Schedule" },
  { icon: CheckSquare, label: "Tasks", badge: 3 },
  { icon: FileText, label: "Tests" },
  { icon: BarChart3, label: "Reports" },
  { icon: MessageSquare, label: "Chat", badge: 12 },
  { icon: StickyNote, label: "Notes", badge: 2 },
];

const INITIAL_TASKS = [
  {
    id: 1,
    title: "Math homework — Chapter 5 exercises",
    status: "in-progress",
    subject: "Mathematics",
    dueDate: "May 16, 2025",
    comments: 4,
    progress: 65,
  },
  {
    id: 2,
    title: "Science lab report: Chemical reactions",
    status: "todo",
    subject: "Science",
    dueDate: "May 18, 2025",
    comments: 2,
    progress: 0,
  },
  {
    id: 3,
    title: "English essay — Book review",
    status: "todo",
    subject: "English",
    dueDate: "May 20, 2025",
    comments: 0,
    progress: 0,
  },
  {
    id: 4,
    title: "History presentation slides",
    status: "in-progress",
    subject: "History",
    dueDate: "May 15, 2025",
    comments: 6,
    progress: 40,
  },
  {
    id: 5,
    title: "Art project — Watercolor painting",
    status: "done",
    subject: "Art",
    dueDate: "May 12, 2025",
    comments: 1,
    progress: 100,
  },
  {
    id: 6,
    title: "PE fitness journal entry",
    status: "done",
    subject: "PE",
    dueDate: "May 10, 2025",
    comments: 0,
    progress: 100,
  },
];

const INITIAL_NOTES = [
  {
    id: 1,
    title: "Quadratic Formula",
    color: "green",
    preview:
      "The quadratic formula: x = (-b ± √(b²-4ac)) / 2a — used to solve any quadratic equation ax²+bx+c=0.",
    date: "May 14, 2025",
  },
  {
    id: 2,
    title: "French Vocabulary",
    color: "purple",
    preview:
      "Bonjour — Hello, Merci — Thank you, S'il vous plaît — Please, Au revoir — Goodbye, Oui — Yes, Non — No.",
    date: "May 13, 2025",
  },
];

const SCHEDULE_DATA = [
  { time: "08:30", lesson: "Mathematics", teacher: "Mr. Davis", location: "Room 204" },
  { time: "09:15", lesson: "English", teacher: "Ms. Carter", location: "Room 112" },
  { time: "10:10", lesson: "Science", teacher: "Dr. Patel", location: "Lab 3" },
  { time: "11:05", lesson: "History", teacher: "Mrs. Stone", location: "Room 308" },
  { time: "12:00", lesson: "Lunch", teacher: "—", location: "Cafeteria" },
  { time: "12:45", lesson: "French", teacher: "Mme. Dubois", location: "Room 105" },
  { time: "13:30", lesson: "Art", teacher: "Ms. Rivera", location: "Art Studio" },
];

const TASK_FILTERS = ["All task", "To do", "In progress", "Done"];

function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-200 p-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
        </span>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          EduWay
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1">
        {NAV_ITEMS.map((item, i) => {
          const isActive = activeNav === i;
          return (
            <button
              key={item.label}
              onClick={() => setActiveNav(i)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              <item.icon size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer">
          <Settings size={18} />
          Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}

function TopBar({ query, setQuery }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Search */}
      <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200 shadow-sm">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      {/* AI button */}
      <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors cursor-pointer">
        <Sparkles size={18} />
      </button>

      {/* Profile pill */}
      <div className="hidden sm:flex items-center gap-2.5 bg-white rounded-xl px-3 py-1.5 border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
          KM
        </div>
        <div className="text-left leading-tight">
          <p className="text-sm font-semibold text-gray-800">Kate Malone</p>
          <p className="text-[11px] text-gray-400">Class 9A</p>
        </div>
        <ChevronDown size={14} className="text-gray-400 ml-1" />
      </div>

      {/* Menu */}
      <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
        <MoreVertical size={18} />
      </button>
    </div>
  );
}

function TaskCard({ task }) {
  const isInProgress = task.status === "in-progress";
  const isTodo = task.status === "todo";

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-semibold text-gray-800 leading-snug">
          {task.title}
        </h4>
        <span
          className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
            isInProgress
              ? "bg-orange-100 text-orange-600"
              : isTodo
              ? "bg-purple-100 text-purple-600"
              : "bg-emerald-100 text-emerald-600"
          }`}
        >
          {isInProgress ? "In progress" : isTodo ? "To do" : "Done"}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <span className="font-medium text-gray-500">{task.subject}</span>
        <span>•</span>
        <span>{task.dueDate}</span>
      </div>

      {/* Progress bar — only for in-progress */}
      {isInProgress && (
        <div className="mb-2">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 rounded-full transition-all"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 text-xs text-gray-400">
        <MessageCircle size={13} />
        <span>{task.comments}</span>
      </div>
    </div>
  );
}

function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), subject: subject.trim() || "General", dueDate: dueDate || "No date" });
    setTitle("");
    setSubject("");
    setDueDate("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-800">Add New Task</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Mathematics"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddNoteModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), content: content.trim() || "No content" });
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-800">Add New Note</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              rows={4}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 resize-none"
            />
          </div>
          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const filterMap = {
    0: null,
    1: "todo",
    2: "in-progress",
    3: "done",
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesFilter =
      filterMap[activeFilter] === null || t.status === filterMap[activeFilter];
    const matchesSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddTask = ({ title, subject, dueDate }) => {
    setTasks((prev) => [
      {
        id: Date.now(),
        title,
        status: "todo",
        subject,
        dueDate,
        comments: 0,
        progress: 0,
      },
      ...prev,
    ]);
  };

  const handleAddNote = ({ title, content }) => {
    setNotes((prev) => [
      {
        id: Date.now(),
        title,
        color: prev.length % 2 === 0 ? "green" : "purple",
        preview: content,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <TopBar query={searchQuery} setQuery={setSearchQuery} />

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
            {/* ---- Middle Column: Tasks ---- */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">My Tasks</h2>
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-3.5 py-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                {TASK_FILTERS.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setActiveFilter(i)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      activeFilter === i
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Task list */}
              <div className="flex flex-col gap-3">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center text-gray-400 text-sm">
                    No tasks match this filter.
                  </div>
                )}
              </div>

              {filteredTasks.length > 0 && (
                <button className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-white hover:text-gray-700 transition-colors cursor-pointer">
                  View all tasks
                </button>
              )}
            </section>

            {/* ---- Right Column: Notes + Schedule ---- */}
            <aside className="flex flex-col gap-6">
              {/* Notes */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">My notes</h2>
                  <button
                    onClick={() => setShowNoteModal(true)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className={`rounded-2xl p-4 ${
                        note.color === "green"
                          ? "bg-emerald-50 border border-emerald-100"
                          : "bg-purple-50 border border-purple-100"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4
                          className={`text-sm font-bold ${
                            note.color === "green"
                              ? "text-emerald-800"
                              : "text-purple-800"
                          }`}
                        >
                          {note.title}
                        </h4>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                          <MoreVertical size={14} />
                        </button>
                      </div>
                      <p
                        className={`text-xs leading-relaxed mb-3 ${
                          note.color === "green"
                            ? "text-emerald-600/70"
                            : "text-purple-600/70"
                        }`}
                      >
                        {note.preview}
                      </p>
                      <p
                        className={`text-[11px] ${
                          note.color === "green"
                            ? "text-emerald-400"
                            : "text-purple-400"
                        }`}
                      >
                        {note.date}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schedule */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    My schedule
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-gray-500 font-medium cursor-pointer">
                    May 14, Mon
                    <ChevronDown size={14} />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-[70px_1fr_140px_100px] gap-2 px-4 py-2.5 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    <span>Time</span>
                    <span>Lesson</span>
                    <span>Teacher</span>
                    <span>Location</span>
                  </div>

                  {/* Rows */}
                  {SCHEDULE_DATA.map((row, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[70px_1fr_140px_100px] gap-2 px-4 py-3 items-center text-sm ${
                        i < SCHEDULE_DATA.length - 1 ? "border-b border-gray-50" : ""
                      } ${row.lesson === "Lunch" ? "text-gray-400" : ""}`}
                    >
                      <span className="font-medium text-gray-500 tabular-nums">
                        {row.time}
                      </span>
                      <span className="font-medium text-gray-700">
                        {row.lesson}
                      </span>
                      <span className="flex items-center gap-2 text-gray-500">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {row.teacher !== "—"
                            ? row.teacher
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)
                            : ""}
                        </span>
                        {row.teacher}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <MapPin size={12} className="shrink-0" />
                        {row.location}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onAdd={handleAddTask}
      />
      <AddNoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onAdd={handleAddNote}
      />
    </div>
  );
}
