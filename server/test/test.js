require("dotenv").config();
const controller_utente = require("../src/utente/controller.js");
const controller_blockchain_type = require("../src/blockchain_type/controller.js");
const controller_studente = require("../src/studente/controller.js");
const controller_segreteria = require("../src/segreteria/controller.js");
const controller_certificato = require("../src/certificato/controller.js");
const controller_titolo = require("../src/titolo/controller.js");
const mongoose = require("mongoose");

async function clean() {
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

  const studente = await controller_utente.create({
    body: {
      username: "studente",
      password: "password",
      ruolo_tipo: "STUDENTE",
      ruolo: {
        email: "gemipampi@gmail.com",
        password: "password",
        telefono: "3668728922",
        nome: "Geremia",
        cognome: "Pompei",
        cf: "PMPGRM99E07E783G",
      },
    },
  });
  console.log("Creato STUDENTE: ", studente._id);

  const segreteria = await controller_utente.create({
    body: {
      username: "segreteria",
      password: "password",
      ruolo_tipo: "SEGRETERIA",
      ruolo: {
        email: "ateneo@pec.unimc.it",
        password: "password",
        telefono: "800224071",
        nome: "Unimc",
        p_iva: "00177050432",
      },
    },
  });
  console.log("Creata SEGRETERIA: ", segreteria._id);

  const titolo = await controller_titolo.create({
    body: {
      titolo: "MYSQL",
      descrizione: "",
      max_voto: 30,
      segreteria: segreteria._id,
    },
  });
  console.log("Creata TITOLO: ", titolo._id);

  const certificato = await controller_certificato.create({
    body: {
      titolo: titolo._id,
      studente: studente._id,
      voto: 30,
      commento: "buono",
      blockchain_type: blockchain_type._id,
    },
  });
  console.log("Creata CERTIFICATO: ", certificato._id);
}

async function main() {
  await clean();
  await initializer();
  await clean();
  process.exit(0);
}

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_DBNAME_TEST,
  })
  .then((res) => {
    console.log("Connected to db!");
    main();
  })
  .catch(console.error);
