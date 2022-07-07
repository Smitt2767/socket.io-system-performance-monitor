const os = require("os");

const io = require("socket.io-client");
const socket = io("http://192.168.1.70:8181");

socket.on("connect", () => {
  console.log("connected to server");

  const ni = os.networkInterfaces();

  let macAdd;
  for (let key in ni) {
    if (!ni[key][0].internal) {
      macAdd = ni[key][0].mac;
      break;
    }
  }

  socket.emit("clientAuth", "abcdefg");

  getPerformanceData().then((data) => {
    socket.emit("initPerfData", { macAdd, ...data });
  });

  let intervalID = setInterval(() => {
    getPerformanceData().then((data) => {
      socket.emit("perfData", { macAdd, ...data });
    });
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(intervalID);
  });
});

/* 
    Required data:-
        - CPU Load
        - Memory Usage
            - Free
            - Total
        - OS Type
        - Uptime
        - CPU Info
            - Type
            _ Number of Cors
            - Clock Speed
*/

const getOsType = () => {
  const osTypes = {
    Linux: "Linux",
    Darwin: "Mac",
    Windows_NT: "Windows",
  };

  return osTypes[os.type()];
};

const cpus = os.cpus();

const getCpuAverage = () => {
  const cpus = os.cpus();
  const data = cpus.reduce(
    (state, core) => {
      [...Object.entries(core.times)].forEach(([key, value]) => {
        state.totalMs += value;
        if (key === "idle") state.idleMs += value;
      });
      return state;
    },
    {
      idleMs: 0,
      totalMs: 0,
    }
  );
  return {
    idle: data.idleMs / cpus.length,
    total: data.totalMs / cpus.length,
  };
};

const getCpuLoad = () =>
  new Promise((res) => {
    const start = getCpuAverage();
    setTimeout(() => {
      const end = getCpuAverage();
      const totalDiff = end.total - start.total;
      const idleDiff = end.idle - start.idle;
      res(100 - Math.floor((idleDiff / totalDiff) * 100));
    }, 100);
  });

const getPerformanceData = () =>
  new Promise(async (res) => {
    // OS Type
    const osType = getOsType();

    // Uptime  -- returns seconds
    const uptime = os.uptime();

    /* 
    Memory Usage
        - Free
        - Total
    */
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsage = Math.floor((usedMemory / totalMemory) * 100) / 100;

    /* 
    - CPU Info
        - Type
        _ Number of Cors
        - Clock Speed
    */

    const cpuModel = cpus[0].model;
    const cpuCors = cpus.length;
    const cpuSpeed = cpus[0].speed;

    // CPU Load
    const cpuLoad = await getCpuLoad();

    res({
      osType,
      uptime,
      freeMemory,
      totalMemory,
      usedMemory,
      memoryUsage,
      cpuModel,
      cpuCors,
      cpuSpeed,
      cpuLoad,
    });
  });
