
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  Filter,
  ListTodo,
  Target,
  AlertCircle,
} from "lucide-react";
import { useDeveloper } from "@/app/components/conntext";

type Priority = "Low" | "Medium" | "High" | "Urgent";

type TaskStatus = "In Progress" | "Completed" | "Pending";

type Developer = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  skills: string;
  experience: string;
  phone: number;
  task: {
    title: string;
    description: string;
    deadline: Date | string;
    priority: Priority;
  };
};

type TaskWithDeveloper = {
  id: number;
  developerName: string;
  title: string;
  description: string;
  deadline: string;
  priority: Priority;
  status: TaskStatus;
  category: string;
};

const statusStyles: Record<TaskStatus, string> = {
  "In Progress": "bg-blue-500/10 text-blue-400 ring-blue-500/20",
  Completed: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  Pending: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
};

const priorityStyles: Record<Priority, string> = {
  Urgent: "bg-red-500/10 text-red-400",
  High: "bg-rose-500/10 text-rose-400",
  Medium: "bg-amber-500/10 text-amber-400",
  Low: "bg-slate-500/10 text-slate-400",
};

function formatDeadline(deadline: Date | string): string {
  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    return "No deadline";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(deadline: string): boolean {
  if (deadline === "No deadline") return false;

  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return false;

  date.setHours(23, 59, 59, 999);

  return date < new Date();
}

export default function MyTasksPage() {
  const { developers } = useDeveloper();

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  /*
   * The Developer type currently has no task status property.
   * Therefore, newly assigned tasks are displayed as Pending.
   * Add a status property to the task type if you want to update
   * task progress and completion from this page.
   */
  const tasks = useMemo<TaskWithDeveloper[]>(() => {
    return ((developers ?? []) as unknown as Developer[])
      .filter(
        (developer) =>
          developer.task &&
          developer.task.title?.trim()
      )
      .map((developer) => ({
        id: developer.id,
        developerName: developer.name,
        title: developer.task.title,
        description: developer.task.description || "No description provided.",
        deadline: formatDeadline(developer.task.deadline),
        priority: developer.task.priority,
        status: "Pending",
        category: developer.role || "Development",
      }));
  }, [developers]);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === "All" || task.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText) ||
      task.developerName.toLowerCase().includes(searchText) ||
      task.category.toLowerCase().includes(searchText) ||
      task.priority.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round((completed / tasks.length) * 100)
      : 0;

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-indigo-400">
              WORKSPACE / MY TASKS
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Tasks
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              View tasks assigned to developers in TaskFlow.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
              <CalendarDays size={21} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Today</p>
              <p className="text-sm font-semibold">{today}</p>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Tasks"
            value={tasks.length}
            icon={<ClipboardList size={22} />}
            color="indigo"
          />

          <SummaryCard
            title="In Progress"
            value={inProgress}
            icon={<Clock3 size={22} />}
            color="blue"
          />

          <SummaryCard
            title="Completed"
            value={completed}
            icon={<CheckCircle2 size={22} />}
            color="emerald"
          />

          <SummaryCard
            title="Pending"
            value={pending}
            icon={<CircleDashed size={22} />}
            color="amber"
          />
        </section>

        {/* Progress */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                <Target size={24} />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Task Progress</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Track completed tasks across the team.
                </p>
              </div>
            </div>

            <p className="text-2xl font-bold text-emerald-400">
              {progress}%
              <span className="ml-2 text-sm font-normal text-slate-400">
                completed
              </span>
            </p>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-linear-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-500">
            <span>{completed} tasks completed</span>
            <span>{tasks.length - completed} remaining</span>
          </div>
        </section>

        {/* Assigned tasks */}
        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Assigned Work</h2>
              <p className="mt-1 text-sm text-slate-400">
                Search tasks by title, developer, role or priority.
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 sm:w-72"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={17} className="mr-1 text-slate-500" />

            {["All", "Pending", "In Progress", "Completed"].map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
                      : "border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Task cards */}
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredTasks.map((task) => (
                <article
                  key={task.id}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-950/20 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-1 rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                        <ListTodo size={21} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="wrap-break-word text-base font-semibold transition group-hover:text-indigo-300">
                          {task.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Task #{String(task.id).padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 min-h-12 text-sm leading-6 text-slate-400">
                    {task.description}
                  </p>

                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <p className="text-xs text-slate-500">
                      Assigned Developer
                    </p>
                    <p className="mt-1 font-medium text-slate-200">
                      {task.developerName}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${statusStyles[task.status]}`}
                    >
                      {task.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
                    >
                      {task.priority} Priority
                    </span>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {task.category}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <CalendarDays size={16} />
                      <span>Due {task.deadline}</span>
                    </div>

                    <span
                      className={`flex items-center gap-2 text-xs font-medium ${
                        task.status === "Completed"
                          ? "text-emerald-400"
                          : isOverdue(task.deadline)
                            ? "text-rose-400"
                            : "text-slate-400"
                      }`}
                    >
                      {isOverdue(task.deadline) &&
                      task.status !== "Completed" ? (
                        <AlertCircle size={15} />
                      ) : task.status === "Completed" ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <Clock3 size={15} />
                      )}

                      {task.status === "Completed"
                        ? "Finished"
                        : isOverdue(task.deadline)
                          ? "Overdue"
                          : "Awaiting progress"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 px-5 py-16 text-center">
              <Search
                size={36}
                className="mx-auto mb-4 text-slate-600"
              />

              <h3 className="text-lg font-semibold">
                {tasks.length === 0
                  ? "No tasks assigned yet"
                  : "No tasks found"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {tasks.length === 0
                  ? "Tasks assigned to developers will appear here."
                  : "Try another search term or change your selected filter."}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        <footer className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
          Stay organized, meet your deadlines and keep improving.
        </footer>
      </div>
    </main>
  );
}

type SummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "indigo" | "blue" | "emerald" | "amber";
};

function SummaryCard({
  title,
  value,
  icon,
  color,
}: SummaryCardProps) {
  const colors = {
    indigo: "bg-indigo-500/10 text-indigo-400",
    blue: "bg-blue-500/10 text-blue-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    amber: "bg-amber-500/10 text-amber-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div className={`rounded-xl p-3 ${colors[color]}`}>
          {icon}
        </div>
      </div>

      <p className="mt-5 text-3xl font-bold tracking-tight">{value}</p>

      <p className="mt-2 text-xs text-slate-500">
        Overview of assigned work
      </p>
    </div>
  )}
