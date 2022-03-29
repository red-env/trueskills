require("dotenv").config();
const controller_utente = require("../src/utente/controller.js");
const controller_studente = require("../src/studente/controller.js");
const controller_segreteria = require("../src/segreteria/controller.js");
const controller_certificato = require("../src/certificato/controller.js");
const controller_titolo = require("../src/titolo/controller.js");
const mongoose = require("mongoose");

async function clean() {
  await controller_utente.delete();
  await controller_studente.delete();
  await controller_segreteria.delete();
  await controller_certificato.delete();
  await controller_titolo.delete();
}

async function initializer() {

  const body_studente = {
    username: "segreteria",
    password: "password",
    ruolo_tipo: "SEGRETERIA",
    ruolo: {
      email: "ateneo@pec.unimc.it",
      telefono: "800224071",
      nome: "UNIMC",
      p_iva: "00177050432",
      stemma_url: "https://apre.it/wp-content/uploads/2021/03/Universita-degli-Studi-di-Macerata.jpg"
    },
  };
  console.log("Creazione STUDENTE: ", body_studente.username, body_studente.password);
  const studente = await controller_utente.create({ body: body_studente });
  console.log("Creato STUDENTE: ", studente._id);

  const body_segreteria = {
    username: "studente",
    password: "password",
    ruolo_tipo: "STUDENTE",
    ruolo: {
      email: "gemipampi@gmail.com",
      telefono: "3663452479",
      nome: "Geremia",
      cognome: "Pompei",
      cf: "PMPGRM99E07E783G",
    },
  };
  console.log("Creazione SEGRETERIA: ", body_segreteria.username, body_segreteria.password);
  const segreteria = await controller_utente.create({ body: body_segreteria });
  console.log("Creata SEGRETERIA: ",  segreteria._id);
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
  })
  .then((res) => {
    console.log("Connected to db!");
    main();
  })
  .catch(console.error);
