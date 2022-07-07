import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const themeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem("theme");

  if (theme) return theme;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    window.localStorage.setItem("theme", "dark");
    return "dark";
  }

  return "dark";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <themeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
