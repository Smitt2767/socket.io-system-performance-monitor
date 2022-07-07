import { useContext } from "react";
import { themeContext } from "../context/ThemeProvider";

const useTheme = () => {
  return useContext(themeContext);
};

export default useTheme;
