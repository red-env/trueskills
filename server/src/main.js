require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 80;

app.use("/", express.static('client/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all("/api/*", require("./blockchain_type/router.js"));

// Add routers
app.use(require("./utente/router.js"));
app.use(require("./certificato/router.js"));
app.use(require("./studente/router.js"));
app.use(require("./segreteria/router.js"));
app.use(require("./titolo/router.js"));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to db!");
    app.listen(port, () => console.log("Server Listening at port: " + port));
  })
  .catch(console.error);
