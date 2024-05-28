"use client"
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

export interface Deadline {
  id: number;
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
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/registrations`)
      .then((response) => {
        console.log('Fetched deadlines', response.data)
        console.log("Converted date", new Date(response.data[0].startDate))
        setDeadlines([{
          id: response.data[0].id,
          name: response.data[0].name,
          semester: '241',
          startsAt: new Date(response.data[0].startDate),
          endsAt: new Date(response.data[0].endDate)
        }]);
      })
      .catch((error) => {
        console.error("Error fetching deadlines:", error);
      });
  }, []);

  const [deadlines, setDeadlines] = useState<Deadline[]>([{
    id: 0,
    name: "Loading",
    semester: "loading",
    startsAt: new Date('2014-1-1'),
    endsAt: new Date('2014-1-1')
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
