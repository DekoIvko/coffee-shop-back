const http = require("http");
const { Worker } = require("node:worker_threads");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plan" });
    res.end("Home page");
  } else if (req.url === "/slow-page") {
    const worker = new Worker("./worker-thread.js");
    worker.on("message", (data) => {
      res.writeHead(200, { "Content-Type": "text/plan" });
      res.end(`Slow Page ${data}`);
    });
  }
});

server.listen(8000, () => console.log("Server is running on port 800"));
