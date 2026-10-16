
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Priority = "medium" | "high" | "low" | "urgent";

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

type DeveloperContextType = {
  developers: Developer[];
  addDeveloper: (developer: Developer) => void;
  deleteDeveloper: (id: number) => void;
  updateDeveloperTask: (
    id: number,
    task: Developer["task"]
  ) => void;
};

const DeveloperContext = createContext<
  DeveloperContextType | undefined
>(undefined);

export function DeveloperProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load developers from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("developers");

      if (savedData) {
        const parsedData: Developer[] = JSON.parse(savedData);
        setDevelopers(parsedData);
      }
    } catch (error) {
      console.error("Error loading developers:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save developers whenever the array changes
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "developers",
      JSON.stringify(developers)
    );
  }, [developers, isLoaded]);

  // Add developer
  const addDeveloper = (developer: Developer) => {
    setDevelopers((prev) => [...prev, developer]);
  };

  // Delete developer
  const deleteDeveloper = (id: number) => {
    setDevelopers((prev) =>
      prev.filter((developer) => developer.id !== id)
    );
  };

  // Update developer task
  const updateDeveloperTask = (
    id: number,
    task: Developer["task"]
  ) => {
    setDevelopers((prev) =>
      prev.map((developer) =>
        developer.id === id
          ? { ...developer, task }
          : developer
      )
    );
  };

  return (
    <DeveloperContext.Provider
      value={{
        developers,
        addDeveloper,
        deleteDeveloper,
        updateDeveloperTask,
      }}
    >
      {children}
    </DeveloperContext.Provider>
  );
}

export function useDeveloper() {
  const context = useContext(DeveloperContext);

  if (!context) {
    throw new Error(
      "useDeveloper must be used inside DeveloperProvider"
    );
  }

  return context;
}
