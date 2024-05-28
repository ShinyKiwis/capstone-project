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
  const [deadlines, setDeadlines] = useState<Deadline[]>([{
    name:"Projects registration",
    semester:'241',
    startsAt: new Date("March 01, 2024 00:00:00"),
    endsAt: new Date("March 30, 2024 11:59:59"),
  }]);
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
