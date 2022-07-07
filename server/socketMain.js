const Machine = require("./models/machine");

const checkAndAdd = (data) =>
  new Promise(async (res, rej) => {
    try {
      const rec = await Machine.findOne({ macAdd: data.macAdd });
      if (rec) {
        res("Found");
      } else {
        Machine.create(data)
          .then(() => res("Added"))
          .catch((err) => {
            throw err;
          });
      }
    } catch (err) {
      rej(err);
    }
  });

module.exports = (io, socket) => {
  console.log("Socket connected", socket.id);

  socket.on("clientAuth", (key) => {
    switch (key) {
      case "abcdefg": {
        socket.join("clients");
        break;
      }
      case "hijklm": {
        socket.join("ui");
        break;
      }
      default:
        socket.disconnect(true);
        break;
    }
  });

  socket.on("initPerfData", async (data) => {
    await checkAndAdd(data);
  });
  socket.on("perfData", (data) => {
    //
    io.to("ui").emit("data", data);
  });
};
