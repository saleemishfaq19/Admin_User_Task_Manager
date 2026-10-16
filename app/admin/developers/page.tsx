"use client";

import { useDeveloper } from "@/app/components/conntext";
import { useState } from "react";

export default function AddDeveloper() {
  const { addDeveloper, developers } = useDeveloper();

  const [Name, setName] = useState<string>("");
  const [Role, setRole] = useState<string>("");
  const [Experience, setExperience] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Skills, setSkills] = useState<string>("");
  const [Phone, setPhone] = useState<string>("");
  const [Password, setPassword] = useState<string>("");

  // Clear all inputs
  function clearForm() {
    setName("");
    setRole("");
    setExperience("");
    setEmail("");
    setSkills("");
    setPhone("");
    setPassword("");
  }

  // Form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!Name.trim()) {
      alert("Please enter developer name.");
      return;
    }

    if (!Email.trim()) {
      alert("Please enter email address.");
      return;
    }

    if (!Password.trim()) {
      alert("Please enter password.");
      return;
    }

    if (!Role.trim()) {
      alert("Please select developer role.");
      return;
    }

    if (!Experience.trim()) {
      alert("Please select developer experience.");
      return;
    }

    if (!Skills.trim()) {
      alert("Please enter developer skills.");
      return;
    }

    if (!Phone.trim()) {
      alert("Please enter phone number.");
      return;
    }

    // Create developer object
    const newDeveloper = {
      id: Date.now(),
      name: Name.trim(),
      email: Email.trim(),
      password: Password,
      role: Role.trim(),
      skills: Skills.trim(),
      experience: Experience.trim(),
      phone: Phone.trim(),
    };

    // Add developer
    addDeveloper(newDeveloper);

    // Success message
    alert("Developer added successfully!");

    // Clear all inputs
    clearForm();
  };

  console.log(developers);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-blue-400 font-medium mb-2">Developer Management</p>

          <h1 className="text-3xl md:text-4xl font-bold">Add Developer</h1>

          <p className="text-slate-400 mt-2">
            Add a new developer to your development team.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name, Email and Password */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter developer name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Role and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Role */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Developer Role
                </label>

                <select
                  name="role"
                  value={Role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select role</option>

                  <option value="Frontend Developer">Frontend Developer</option>

                  <option value="Backend Developer">Backend Developer</option>

                  <option value="Full Stack Developer">
                    Full Stack Developer
                  </option>

                  <option value="React Developer">React Developer</option>

                  <option value="Next.js Developer">Next.js Developer</option>

                  <option value="UI/UX Developer">UI/UX Developer</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Experience
                </label>

                <select
                  name="experience"
                  value={Experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select experience</option>

                  <option value="Beginner">Beginner</option>

                  <option value="1-2 Years">1-2 Years</option>

                  <option value="3-5 Years">3-5 Years</option>

                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Skills
              </label>

              <input
                type="text"
                name="skills"
                value={Skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Next.js, TypeScript, Node.js..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-500"
              />

              <p className="text-xs text-slate-500 mt-2">
                Separate multiple skills with commas.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 placeholder:text-slate-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-800">
              {/* Clear */}
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition font-medium"
              >
                Clear
              </button>

              {/* Submit */}
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                Add Developer
              </button>
            </div>
          </form>
        </div>

        {/* Information */}
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-3">Developer Information</h2>

          <p className="text-sm text-slate-400">
            Make sure the developer information is correct before adding them to
            the team. You can later assign projects and tasks from the admin
            dashboard.
          </p>
        </div>
      </div>
    </main>
  );
}
