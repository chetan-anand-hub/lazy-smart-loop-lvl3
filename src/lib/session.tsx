import { createContext, useContext, useState, ReactNode } from "react";

type SessionState = {
  signedIn: boolean;
  trialDay: number;
  setSignedIn: (v: boolean) => void;
};

const Ctx = createContext<SessionState | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <Ctx.Provider value={{ signedIn, trialDay: 2, setSignedIn }}>{children}</Ctx.Provider>
  );
}

export function useSession() {
  const v = useContext(Ctx);
  if (!v) throw new Error("SessionProvider missing");
  return v;
}