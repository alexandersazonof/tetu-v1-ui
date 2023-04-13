const path = require("path");

const express = require("express");
const favicon = require("express-favicon");
const helmet = require("helmet");
const https = require("https");
const cors = require("cors");

cors({credentials: true, origin: true});

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.disable("x-powered-by");

app.use(favicon(__dirname + "/dist/tetu-v1-ui/favicon.png"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "dist/tetu-v1-ui")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/tetu-v1-ui/index.html"));
});

app.listen(port);
