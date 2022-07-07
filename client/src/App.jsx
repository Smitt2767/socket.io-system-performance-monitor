import React from "react";
import { useEffect } from "react";
import Card from "./components/Card";
import Container from "./components/Container";
import Heading from "./components/Heading";
import usePerf from "./hooks/usePerf";
import { perfSocket } from "./services/socket";

const App = () => {
  const { setData, data } = usePerf();

  useEffect(() => {
    perfSocket.subscribe("data", (data) => {
      setData((prev) => ({
        ...prev,
        [data.macAdd]: { ...data },
      }));
    });
  }, [setData]);

  return (
    <div className="app dark:bg-gray-900 bg-white">
      <Container className="pt-4">
        <Heading />
        {[...Object.values(data)].map((machineData) => (
          <Card key={machineData.macAdd} {...machineData} />
        ))}
      </Container>
    </div>
  );
};

export default App;
