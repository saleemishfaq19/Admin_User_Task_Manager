"use client";

import { useDeveloper } from "@/app/components/conntext";
import { useState } from "react";

type Priorities = "Low" | "Medium" | "High" | "Urgent";

export default function Page() {
  const { developers, updateDeveloperTask } = useDeveloper();

  const [developer, setDeveloper] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priorities>("Medium");
  const [deadline, setDeadline] = useState("");

  const handleAssignTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!developer || !taskTitle.trim() || !description.trim() || !deadline) {
      alert("Please fill in all fields.");
      return;
    }

    updateDeveloperTask(Number(developer), {
      title: taskTitle,
      description,
      priority: priority.toLowerCase() as
        | "low"
        | "medium"
        | "high"
        | "urgent",
      deadline: new Date(deadline),
    });

    alert("Task assigned successfully!");

    setDeveloper("");
    setTaskTitle("");
    setDescription("");
    setPriority("Medium");
    setDeadline("");
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 font-medium text-blue-400">Task Management</p>
          <h1 className="text-3xl font-bold md:text-4xl">Assign New Task</h1>
          <p className="mt-2 text-slate-400">
            Assign development tasks to your team members.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:col-span-2 md:p-8">
            <h2 className="mb-6 text-xl font-semibold">Task Information</h2>

            <form onSubmit={handleAssignTask} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Assign Developer
                </label>

                <select
                  required
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select a developer</option>
                  {developers.map((dev) => (
                    <option key={dev.id} value={dev.id}>
                      {dev.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Task Title
                </label>

                <input
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Task Description
                </label>

                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what the developer needs to do..."
                  rows={6}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as Priorities)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Deadline
                  </label>

                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-500">Assigned By</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-lg font-bold">
                  S
                </div>

                <div>
                  <h3 className="font-semibold">Saleem</h3>
                  <p className="text-sm text-slate-400">Administrator</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-4 text-lg font-semibold">Task Guidelines</h2>

              <ul className="space-y-3 text-sm text-slate-400">
                <li>• Give the task a clear title.</li>
                <li>• Explain the requirements properly.</li>
                <li>• Select the correct developer.</li>
                <li>• Set a realistic deadline.</li>
                <li>• Choose the correct priority.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-blue-600 p-6">
              <p className="text-sm text-blue-100">Current Assignment</p>

              <h2 className="mt-2 text-2xl font-bold">
                {developers.find((dev) => dev.id === Number(developer))
                  ?.name || "No Developer"}
              </h2>

              <p className="mt-2 text-sm text-blue-100">
                {taskTitle || "No task selected"}
              </p>

              <p className="mt-3 text-sm text-blue-100">
                Priority: {priority}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}