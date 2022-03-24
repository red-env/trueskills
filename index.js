require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');

const controller = require('./server/controller.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('client/public'));

async function handleResponse(res, callback) {
  try {
    const data = await callback();
    console.log(data); // TODO LOG
    res.send({
      status: true,
      data,
    });
  } catch (error) {
    console.error(error); // TODO LOG
    res.send({
      status: false,
      error,
    });
  }
}

app.get('/api/address', (req, res) => handleResponse(res, () => controller.getAddress()));
app.post("/api/certificate", (req, res) => handleResponse(res, () => controller.addCertificate(req.body)));
app.get("/api/certificate", (req, res)  => handleResponse(res, () => controller.getCertificate(req.query.id)));
app.post("/api/assignment", (req, res) => handleResponse(res, () => controller.addAssignment(req.body)));
app.get("/api/assignment", (req, res) => handleResponse(res, () => controller.getAssignment(req.query.id)));

app.listen(port, () => console.log("Server Listening at port: " + port));
