"use client";

import { useEffect, useMemo, useState } from "react";

import Footer from "./Footer";
import { MobileNavContext } from "./MobileNavContext";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function AppShell({
  children,
  showFooter = true,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      if (desktop.matches) setSidebarOpen(false);
    };

    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const value = useMemo(
    () => ({ openSidebar: () => setSidebarOpen(true) }),
    []
  );

  return (
    <MobileNavContext.Provider value={value}>
      <div className="flex min-h-screen flex-col bg-surface lg:h-screen lg:overflow-hidden">
        <div className="flex flex-1 lg:min-h-0">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="flex min-w-0 flex-1 flex-col lg:min-h-0">
            <main className="flex-1 lg:min-h-0 lg:overflow-y-auto">
              {children}
            </main>
          </div>
        </div>

        {showFooter ? <Footer /> : null}
      </div>
    </MobileNavContext.Provider>
  );
}
