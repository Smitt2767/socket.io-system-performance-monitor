const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  macAdd: String,
  osType: String,
  uptime: Number,
  freeMemory: Number,
  totalMemory: Number,
  usedMemory: Number,
  memoryUsage: Number,
  cpuModel: String,
  cpuCors: Number,
  cpuSpeed: Number,
  cpuLoad: Number,
});
module.exports = mongoose.model("machine", machineSchema);
