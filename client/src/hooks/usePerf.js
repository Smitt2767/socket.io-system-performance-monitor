import { useContext } from "react";
import { perfDataContext } from "../context/PerfDataProvider";

const usePerf = () => {
  return useContext(perfDataContext);
};

export default usePerf;
