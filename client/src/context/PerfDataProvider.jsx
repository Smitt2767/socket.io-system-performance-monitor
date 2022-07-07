import React, { useState } from "react";
import { useCallback } from "react";
import { createContext } from "react";

export const perfDataContext = createContext();

const PerfDataProvider = ({ children }) => {
  const [data, setData] = useState({});

  const changeData = useCallback((data) => setData(data), []);

  return (
    <perfDataContext.Provider value={{ data, setData: changeData }}>
      {children}
    </perfDataContext.Provider>
  );
};

export default PerfDataProvider;
