module.exports = logger;

function logger() {
  return (req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.originalUrl}`
    );
    next();
  }
}