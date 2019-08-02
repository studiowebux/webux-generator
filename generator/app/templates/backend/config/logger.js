module.exports = {
  application_id: process.env.APP_ID || "Application",
  forceConsole: process.env.CONSOLE || true,
  logstash: {
    host: process.env.LOGSTASH_URL || "127.0.0.1",
    port: "5000" // udp only !
  },
  filenames: {
    error: "log/error.log",
    warn: "log/warn.log",
    info: "log/info.log",
    verbose: "log/verbose.log",
    debug: "log/debug.log",
    silly: "log/silly.log"
  },
  blacklist: ["password", "authorization"]
};
