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
  const bodies = [
    {
      username: "UNIVPM",
      password: "password",
      ruolo_tipo: "SEGRETERIA",
      ruolo: {
        email: "protocollo@pec.univpm.it",
        telefono: "+390712201",
        nome: "UNIVPM",
        p_iva: "00382520427",
        stemma_url: "https://upload.wikimedia.org/wikipedia/it/thumb/9/9a/Logo_Universit%C3%A0_Politecnica_delle_Marche.svg/1920px-Logo_Universit%C3%A0_Politecnica_delle_Marche.svg.png"
      },
    },
    {
      username: "UNIPG",
      password: "password",
      ruolo_tipo: "SEGRETERIA",
      ruolo: {
        email: "protocollo@cert.unipg.it",
        telefono: "390755851",
        nome: "UNIPG",
        p_iva: "00448820548",
        stemma_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_unipg.svg/1200px-Logo_unipg.svg.png"
      },
    },
    {
      username: "UNICAM",
      password: "password",
      ruolo_tipo: "SEGRETERIA",
      ruolo: {
        email: "protocollo@pec.unicam.it",
        telefono: "800054000",
        nome: "UNICAM",
        p_iva: "00291660439",
        stemma_url: "https://upload.wikimedia.org/wikipedia/it/b/bd/Logo_unicam.png"
      },
    },
    {
      username: "UNIMC",
      password: "password",
      ruolo_tipo: "SEGRETERIA",
      ruolo: {
        email: "ateneo@pec.unimc.it",
        telefono: "800224071",
        nome: "UNIMC",
        p_iva: "00177050432",
        stemma_url: "https://apre.it/wp-content/uploads/2021/03/Universita-degli-Studi-di-Macerata.jpg"
      },
    }, {
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
    }
  ];
  for (const body of bodies) {
    console.log(`INIZIO Creazione ${body.ruolo_tipo}: `, body.username, body.password);
    const utente = await controller_utente.create({ body });
    console.log(`FINE Creazione ${body.ruolo_tipo}: `,  utente._id);
  }

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
