import { useState } from "react";
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const useMyTheme = () => {
  return useContext(ThemeContext);
};

export default function MyThemeProvider({ children }) {
  const [myTheme, setMyTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{ myTheme, setMyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
