
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeveloper } from "./components/conntext";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const{developers} = useDeveloper();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      username.trim().toLowerCase() === "saleem ishfaq" &&
      password === "123salim"
    ) {
      setError("");
      router.push("/admin");
    } else {
      developers.filter((developer) => {
        if (
          developer.email.toLowerCase() === username.trim().toLowerCase() &&
          developer.password === password
        ) {
          setError("");
          router.push("/user");
          sessionStorage.setItem("developer", JSON.stringify(developer));
          console.log(developer);
        } else {
          setError("Invalid username or password.");
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white">
            T
          </div>

          <h1 className="text-3xl font-bold text-white">
            TaskFlow
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to your admin account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            Login to Admin Panel
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          TaskFlow Admin Dashboard
        </p>
      </div>
    </div>
  );
}
