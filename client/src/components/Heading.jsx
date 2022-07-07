import React from "react";

import usePerf from "../hooks/usePerf";

const Heading = () => {
  const { data } = usePerf();

  const length = [...Object.keys(data)].length;

  return (
    <h2 className="dark:text-white text-center capitalize tracking-wider">
      Performance Monitor - {length} Machines
    </h2>
  );
};

export default Heading;
