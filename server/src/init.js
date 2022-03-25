require("dotenv").config();
const controller_utente = require("../src/utente/controller.js");
const controller_blockchain_type = require("../src/blockchain_type/controller.js");
const controller_studente = require("../src/studente/controller.js");
const controller_segreteria = require("../src/segreteria/controller.js");
const controller_certificato = require("../src/certificato/controller.js");
const controller_titolo = require("../src/titolo/controller.js");
const mongoose = require("mongoose");

async function clean() {
  await controller_utente.delete();
  await controller_blockchain_type.delete();
  await controller_studente.delete();
  await controller_segreteria.delete();
  await controller_certificato.delete();
  await controller_titolo.delete();
}

async function initializer() {
  const blockchain_type = await controller_blockchain_type.create({
    body: {
      nome: "ETHEREUM",
      url_base: "https://ropsten.etherscan.io/tx/",
    },
  });
  console.log("Creato BLOCKCHAIN_TYPE: ", blockchain_type._id);

  const studente = await controller_studente.create({
    body: {
      email: "gemipampi@gmail.com",
      telefono: "3668728922",
      nome: "Geremia",
      cognome: "Pompei",
      cf: "PMPGRM99E07E783G",
    },
  });
  console.log("Creato STUDENTE: ", studente._id);

  const segreteria = await controller_segreteria.create({
    body: {
      email: "ateneo@pec.unimc.it",
      telefono: "800224071",
      nome: "UNIMC",
      p_iva: "00177050432",
    },
  });
  console.log("Creata SEGRETERIA: ", segreteria._id);
}

async function main() {
  await clean();
  await initializer();
  process.exit(0);
}

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_DBNAME,
  })
  .then((res) => {
    console.log("Connected to db!");
    main();
  })
  .catch(console.error);
