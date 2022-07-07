import moment from "moment";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const getColor = (value) =>
  value <= 25
    ? "#22c55e"
    : value <= 50
    ? "#3b82f6"
    : value <= 75
    ? "#eab308"
    : "#ef4444";

const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

const Loader = ({ title, percent, children }) => {
  return (
    <div className="flex flex-col p-2 items-center">
      <h3>{title}</h3>
      <div className="w-9/12 my-3">
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          styles={buildStyles({
            strokeLinecap: "round",
            textSize: "16px",
            pathTransitionDuration: 0.5,
            pathColor: getColor(percent),
            textColor: "#fff",
            trailColor: "rgb(55, 65, 81)",
            backgroundColor: "transparent",
          })}
        />
      </div>
      {children}
    </div>
  );
};

const SystemInfo = ({
  osType,
  upTime,
  cpuModel,
  cpuCors,
  cpuSpeed,
  macAdd,
}) => {
  return (
    <div className="p-2 flex flex-col">
      <div className="mb-3">
        <h3>Operating System</h3>
        <p className="text-xs text-gray-400">{osType}</p>
      </div>
      <div className="mb-3">
        <h3>Mac Address</h3>
        <p className="text-xs text-gray-400">{macAdd}</p>
      </div>
      <div className="mb-3">
        <h3>Time Online</h3>
        <p className="text-xs text-gray-400">
          {moment.duration(upTime).humanize()}
        </p>
      </div>
      <div className="mb-3">
        <h3>Processor information</h3>
        <p className="text-xs text-white mb-1">
          Type: <span className="text-gray-400">{cpuModel}</span>
        </p>
        <p className="text-xs text-white mb-1">
          Number of Cors: <span className="text-gray-400">{cpuCors}</span>
        </p>
        <p className="text-xs text-white mb-1">
          Clock Speed: <span className="text-gray-400">{cpuSpeed}</span>
        </p>
      </div>
    </div>
  );
};

const Card = ({ ...data }) => {
  return (
    <div className="grid grid-cols-3 mt-4 max-w-3xl mx-auto border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 p-2 rounded-sm">
      <Loader title="CPU Load" percent={Math.round(data.cpuLoad)} />
      <Loader title="Memory Usage" percent={Math.round(data.memoryUsage)}>
        <p className="text-xs text-gray-400 mb-1">
          Total Memory: {bytesToSize(data.totalMemory)}
        </p>
        <p className="text-xs text-gray-400">
          Free Memory: {bytesToSize(data.freeMemory)}
        </p>
      </Loader>
      <SystemInfo
        osType={data.osType}
        uptime={data.uptime}
        cpuModel={data.cpuModel}
        cpuCors={data.cpuCors}
        cpuSpeed={data.cpuSpeed}
        macAdd={data.macAdd}
      />
    </div>
  );
};

export default Card;
