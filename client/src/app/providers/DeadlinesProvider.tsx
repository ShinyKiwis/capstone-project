"use client"
import { createContext, useState, useContext } from "react";

export interface Deadline {
  name: string;
  semester: string;
  startsAt: Date;
  endsAt: Date;
}

interface DeadlineContextType {
  deadlines: Deadline[];
  setDeadlines: (arg: Deadline[]) => void;
}

export const DeadlineContext = createContext<DeadlineContextType | null>(null);

const DeadlinesProvider = ({ children }: { children: React.ReactNode }) => {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  return (
    <DeadlineContext.Provider value={{ deadlines, setDeadlines }}>
      {children}
    </DeadlineContext.Provider>
  );
};

export const useDeadlines = () => {
  const context = useContext(DeadlineContext)
  if(!context) {
    throw new Error("useDeadlines must be used inside the DeadlineProvider")
  }

  return context
}

export default DeadlinesProvider;
