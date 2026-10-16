"use client";

import { useDeveloper } from "@/app/components/conntext";
import Link from "next/link";
import { useState } from "react";


export default function Page() {
  const { developers } = useDeveloper();

  const [search, setSearch] = useState("");

  // Search developers
  const filteredDevelopers = developers.filter((developer) => {
    const searchValue = search.toLowerCase();

    return (
      developer.name.toLowerCase().includes(searchValue) ||
      developer.email.toLowerCase().includes(searchValue) ||
      developer.role.toLowerCase().includes(searchValue) ||
      developer.skills.toLowerCase().includes(searchValue)
    );
  });

  // Developers with assigned task
  const activeDevelopers = developers.filter(
    (developer) => developer.task && developer.task.title
  );

  // Developers whose role contains "developer"
  const totalDevelopers = developers.filter((developer) =>
    developer.role.toLowerCase().includes("developer")
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <p className="text-blue-400 font-medium mb-2">
              Management
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              Users
            </h1>

            <p className="text-slate-400 mt-2">
              Manage developers and team members.
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-medium">
           <Link href="/developers"> + Add User</Link>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          {/* Total Users */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">
              Total Users
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {developers.length}
            </h2>
          </div>

          {/* Active Developers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">
              Active Users
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {activeDevelopers.length}
            </h2>
          </div>

          {/* Developers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">
              Developers
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              {totalDevelopers.length}
            </h2>
          </div>

        </div>

        {/* Search */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, email, role or skills..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none text-white placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full min-w-275">

              <thead>
                <tr className="border-b border-slate-800 text-left">

                  <th className="p-5 text-sm text-slate-400">
                    User
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Role
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Skills
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Experience
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Phone
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Task
                  </th>

                  <th className="p-5 text-sm text-slate-400">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredDevelopers.map((developer) => (

                  <tr
                    key={developer.id}
                    className="border-b border-slate-800 last:border-none hover:bg-slate-800/40 transition"
                  >

                    {/* User */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                          {developer.name
                            ? developer.name.charAt(0).toUpperCase()
                            : "U"}
                        </div>

                        <div>
                          <h3 className="font-medium">
                            {developer.name || "No name"}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {developer.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Role */}
                    <td className="p-5 text-slate-300">
                      {developer.role || "Not specified"}
                    </td>

                    {/* Skills */}
                    <td className="p-5 text-slate-400 max-w-xs">
                      {developer.skills || "No skills added"}
                    </td>

                    {/* Experience */}
                    <td className="p-5 text-slate-400">
                      {developer.experience || "Not specified"}
                    </td>

                    {/* Phone */}
                    <td className="p-5 text-slate-400">
                      {developer.phone || "No phone"}
                    </td>

                    {/* Task */}
                    <td className="p-5">

                      {developer.task?.title ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                          {developer.task.title}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-500">
                          No Task
                        </span>
                      )}

                    </td>

                    {/* Actions */}
                    <td className="p-5">
                      <div className="flex gap-2">

                        <button className="px-3 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition">
                          View
                        </button>

                        <button className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                          Edit
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

                {/* Empty State */}
                {filteredDevelopers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-10 text-slate-500"
                    >
                      No developers found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>

        </div>

      </div>
    </main>
  );
}