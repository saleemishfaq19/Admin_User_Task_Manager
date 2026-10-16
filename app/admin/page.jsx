"use client";

import React from "react";
import { useDeveloper } from "@/app/components/conntext";

export default function AdminPage() {
  const { developers } = useDeveloper();

  // Count developers
  const totalDevelopers = developers.length;

  // Developers who have a task
  const activeDevelopers = developers.filter(
    (developer) => developer.task?.title
  ).length;

  // Developers without a task
  const availableDevelopers = developers.filter(
    (developer) => !developer.task?.title
  ).length;

  // Count assigned tasks
  const totalTasks = developers.filter(
    (developer) => developer.task?.title
  ).length;

  const stats = [
    {
      title: "Total Developers",
      value: totalDevelopers,
      icon: "👨‍💻",
      description: `${activeDevelopers} developers working`,
    },
    {
      title: "Available Developers",
      value: availableDevelopers,
      icon: "🟢",
      description: "Currently available",
    },
    {
      title: "Assigned Tasks",
      value: totalTasks,
      icon: "📋",
      description: "Tasks currently assigned",
    },
    {
      title: "Team Members",
      value: developers.length,
      icon: "👥",
      description: "Total team members",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="text-blue-400 font-medium mb-2">
              Admin Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, Saleem
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your developers and tasks from one place.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
              S
            </div>

            <div>
              <h2 className="font-semibold">Saleem</h2>

              <p className="text-sm text-slate-400">
                Administrator
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="text-3xl">
                  {stat.icon}
                </div>

                <span className="text-3xl font-bold">
                  {stat.value}
                </span>
              </div>

              <h3 className="mt-5 font-semibold text-lg">
                {stat.title}
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <button className="text-left bg-blue-600 hover:bg-blue-700 transition rounded-2xl p-6">
              <div className="text-2xl mb-3">
                ➕
              </div>

              <h3 className="font-bold text-lg">
                Assign New Task
              </h3>

              <p className="text-blue-100 text-sm mt-1">
                Assign development work to a developer.
              </p>
            </button>

            <button className="text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 transition rounded-2xl p-6">
              <div className="text-2xl mb-3">
                👨‍💻
              </div>

              <h3 className="font-bold text-lg">
                Add Developer
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Add a new developer to your team.
              </p>
            </button>

            <button className="text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 transition rounded-2xl p-6">
              <div className="text-2xl mb-3">
                📊
              </div>

              <h3 className="font-bold text-lg">
                View Reports
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Check developer performance.
              </p>
            </button>

          </div>
        </section>

        {/* Developers */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">
                Development Team
              </h2>

              <p className="text-slate-400 mt-1">
                Manage your web development team.
              </p>
            </div>
          </div>

          {developers.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-semibold">
                No developers found
              </h3>

              <p className="text-slate-400 mt-2">
                Add developers to see them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {developers.map((developer) => {

                const hasTask = Boolean(
                  developer.task?.title
                );

                return (
                  <div
                    key={developer.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
                  >

                    {/* Developer Header */}
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
                          {developer.name
                            ? developer.name.charAt(0).toUpperCase()
                            : "D"}
                        </div>

                        <div>
                          <h3 className="font-semibold">
                            {developer.name}
                          </h3>

                          <p className="text-sm text-slate-400">
                            {developer.role}
                          </p>
                        </div>

                      </div>

                      {/* Status */}
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          hasTask
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {hasTask ? "Working" : "Available"}
                      </span>

                    </div>

                    {/* Email */}
                    <div className="mt-5">
                      <p className="text-sm text-slate-500">
                        Email
                      </p>

                      <p className="text-sm text-slate-300 mt-1">
                        {developer.email}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-4">
                      <p className="text-sm text-slate-500">
                        Skills
                      </p>

                      <p className="text-sm text-slate-300 mt-1">
                        {developer.skills}
                      </p>
                    </div>

                    {/* Experience */}
                    <div className="mt-4">
                      <p className="text-sm text-slate-500">
                        Experience
                      </p>

                      <p className="text-sm text-slate-300 mt-1">
                        {developer.experience}
                      </p>
                    </div>

                    {/* Task */}
                    <div className="mt-5 pt-5 border-t border-slate-800">

                      <p className="text-sm text-slate-500">
                        Assigned Task
                      </p>

                      {developer.task?.title ? (
                        <div className="mt-2">

                          <p className="font-medium">
                            {developer.task.title}
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            {developer.task.description}
                          </p>

                          <div className="flex items-center gap-3 mt-3">

                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                developer.task.priority === "High"
                                  ? "bg-red-500/10 text-red-400"
                                  : developer.task.priority === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : developer.task.priority === "Urgent"
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "bg-green-500/10 text-green-400"
                              }`}
                            >
                              {developer.task.priority}
                            </span>

                            <span className="text-xs text-slate-400">
                              {new Date(
                                developer.task.deadline
                              ).toLocaleDateString()}
                            </span>

                          </div>

                        </div>
                      ) : (
                        <p className="text-sm text-green-400 mt-2">
                          No task assigned
                        </p>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}
        </section>

        {/* Recent Tasks */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Recent Tasks
            </h2>

            <p className="text-slate-400 mt-1">
              Track the latest development tasks.
            </p>
          </div>

          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">

            <table className="w-full min-w-200">

              <thead>
                <tr className="border-b border-slate-800 text-left">

                  <th className="p-5 text-sm text-slate-400">
                    Task
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Developer
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Priority
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Deadline
                  </th>

                </tr>
              </thead>

              <tbody>

                {developers
                  .filter(
                    (developer) => developer.task?.title
                  )
                  .map((developer) => {

                    const task = developer.task;

                    return (
                      <tr
                        key={developer.id}
                        className="border-b border-slate-800 last:border-none hover:bg-slate-800/50"
                      >

                        <td className="p-5 font-medium">
                          {task.title}
                        </td>

                        <td className="p-5 text-slate-300">
                          {developer.name}
                        </td>

                        <td className="p-5">

                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              task.priority === "High"
                                ? "bg-red-500/10 text-red-400"
                                : task.priority === "Medium"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : task.priority === "Urgent"
                                ? "bg-purple-500/10 text-purple-400"
                                : "bg-green-500/10 text-green-400"
                            }`}
                          >
                            {task.priority}
                          </span>

                        </td>

                        <td className="p-5 text-slate-400">
                          {new Date(
                            task.deadline
                          ).toLocaleDateString()}
                        </td>

                      </tr>
                    );
                  })}

              </tbody>

            </table>

          </div>
        </section>

      </div>
    </main>
  );
}