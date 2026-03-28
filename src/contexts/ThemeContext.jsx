import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("sra-theme") ?? "system",
  );

  useEffect(() => {
    const applyTheme = (isDark) => {
      document.documentElement.classList.toggle("dark", isDark);
    };

    if (mode === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mql.matches);
      const handler = (e) => applyTheme(e.matches);
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }

    applyTheme(mode === "dark");
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("sra-theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}