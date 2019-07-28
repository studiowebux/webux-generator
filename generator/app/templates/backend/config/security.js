module.exports = {
  origin: process.env.ORIGIN || ["127.0.0.1"],
  bodyParser: {
    limit: "10mb",
    extended: true
  },
  cookieParser: {
    secret: process.env.COOKIE_SECRET || "SHUUUT!"
  }
};
