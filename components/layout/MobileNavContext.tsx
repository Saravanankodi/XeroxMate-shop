"use client";

import { createContext, useContext } from "react";

interface MobileNavValue {
  openSidebar: () => void;
}

export const MobileNavContext = createContext<MobileNavValue>({
  openSidebar: () => {},
});

export function useMobileNav() {
  return useContext(MobileNavContext);
}
