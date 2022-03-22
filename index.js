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

app.post('/api/student', (req, res) => handleResponse(res, () => controller.addStudent(req.body)));
app.get("/api/student", (req, res) => handleResponse(res, () => controller.getStudent(req.query.id)));
app.post("/api/certificate", (req, res) => handleResponse(res, () => controller.addCertificate(req.body)));
app.get("/api/certificate", (req, res)  => handleResponse(res, () => controller.getCertificate(req.query.id)));
app.post("/api/assignment", (req, res) => handleResponse(res, () => controller.addAssignment(req.body)));

app.listen(port, () => console.log("Server Listening at port: " + port));
