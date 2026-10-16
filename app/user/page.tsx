"use client";

import { useEffect, useState } from "react";

type Priority = "high" | "medium" | "low" | "urgent";

export type Developer = {
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
    deadline: Date;
    priority: Priority;
  };
};

export default function UserDashboard() {
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const developerData = JSON.parse(
      sessionStorage.getItem("developer") || "null",
    );
    setDeveloper(developerData);
    setLoading(false);
    console.log(developerData);
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
          <p className="mt-4 text-slate-400">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  if (!developer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
            👨‍💻
          </div>

          <h1 className="mt-5 text-2xl font-bold">Welcome to TaskFlow</h1>

          <p className="mt-3 leading-6 text-slate-400">
            No developer profile was found. Please log in again or contact your
            administrator.
          </p>
        </div>
      </main>
    );
  }

  const displayName = developer.name?.trim() || "Developer";
  const displayRole = developer.role || "Developer";

  return (
    <main className="min-h-screen bg-slate-950 p-5 text-white sm:p-8 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Welcome section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-indigo-950 via-slate-900 to-slate-900 p-7 sm:p-10">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Developer Portal
            </span>

            <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
              Welcome back, {displayName}!
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              Welcome to your TaskFlow dashboard. View your profile, explore
              your skills and stay connected with your team.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium">
                {displayRole}
              </span>

              <span className="rounded-lg border border-slate-700 bg-slate-800/70 px-4 py-2 text-sm text-slate-300">
                {developer.experience || "Experience not specified"}
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
        </section>

        {/* Summary cards */}
        <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500/50">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                👤
              </div>
              <span className="text-xs text-green-400">Registered</span>
            </div>

            <h2 className="mt-5 text-2xl font-bold">My Profile</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your developer account is available in TaskFlow.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500/50">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                💻
              </div>
              <span className="text-xs text-cyan-400">Professional</span>
            </div>

            <h2 className="mt-5 text-2xl font-bold">{displayRole}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your current position in the development team.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500/50 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                ⚡
              </div>
              <span className="text-xs text-purple-400">Skills</span>
            </div>

            <h2 className="mt-5 text-2xl font-bold">{developer?.skills?.length || 0}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Skills listed in your developer profile.
            </p>
          </div>
        </section>

        {/* Profile overview */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">Profile Overview</h2>
            <p className="mt-2 text-slate-400">
              Your personal and professional information.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Personal information */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-2xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-bold">{displayName}</h3>
                  <p className="mt-1 break-all text-sm text-slate-400">
                    {developer.email || "Email not provided"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 border-t border-slate-800 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="mt-2 font-medium">{displayName}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Email Address</p>
                  <p className="mt-2 break-all font-medium">
                    {developer.email || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Phone Number</p>
                  <p className="mt-2 font-medium">
                    {developer.phone || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Experience</p>
                  <p className="mt-2 font-medium">
                    {developer.experience || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                  ⚡
                </div>
                <h3 className="text-lg font-semibold">My Skills</h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {developer.skills}
              </div>

              <div className="mt-8 border-t border-slate-800 pt-5">
                <p className="text-sm text-slate-500">Current Position</p>
                <p className="mt-2 font-medium">{displayRole}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Workspace information */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
              ℹ️
            </div>

            <div>
              <h2 className="text-lg font-bold">Your Workspace</h2>
              <p className="mt-2 leading-6 text-slate-400">
                This is your personal dashboard for viewing your developer
                information. Your assigned tasks can be displayed here once
                connected to your task management system.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          TaskFlow Developer Portal
        </footer>
      </div>
    </main>
  );
}
