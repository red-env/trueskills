const PDFDocument = require("pdfkit");
const fetch = require("node-fetch");

const colors = {
  primary: "#7E0441",
  dark: "#000000",
  light_dark: "#444444",
};

function addCornice(doc) {
  const distanceMargin = 18;
  doc
    .fillAndStroke(colors.primary)
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();
}

async function addImmagine(doc, url, y = 60, link = false, fit = [140, 70]) {
  const immagine = await (await fetch(url)).buffer();
  const x = doc.page.width / 2 - fit[0] / 2;
  doc.image(immagine, x, y, {
    fit,
    align: "center",
  });
  if (link) doc.link(x, y, fit[0], fit[1], link);
}

function addTesto(
  doc,
  testo,
  dim = 10,
  color = colors.dark,
  font = "Times-Italic"
) {
  doc.fontSize(dim).fill(color).font(font).text(testo, {
    align: "center",
  });
}

function saltaLinee(doc, lines) {
  doc.fontSize(2);
  for (let index = 0; index < lines; index++) {
    doc.moveDown();
  }
}

module.exports = async (certificato, res) => {
  const doc = new PDFDocument({
    bufferPages: true,
    layout: "landscape",
    size: "A4",
    displayTitle: certificato.titolo.titolo,
  });
  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition":
          "attachment;filename=certificato_" +
          certificato.titolo.titolo +
          ".pdf",
      })
      .end(pdfData);
  });
  addCornice(doc);

  certificato.titolo.segreteria.stemma_url =
    "https://apre.it/wp-content/uploads/2021/03/Universita-degli-Studi-di-Macerata.jpg"; // TODO

  if (certificato.titolo.segreteria.stemma_url)
    await addImmagine(doc, certificato.titolo.segreteria.stemma_url);
  saltaLinee(doc, 30);
  addTesto(doc, "corso di", 17, colors.light_dark);
  saltaLinee(doc, 4);
  addTesto(
    doc,
    certificato.titolo.titolo.toUpperCase(),
    35,
    colors.primary,
    "Times-Roman"
  );
  saltaLinee(doc, 3);
  if (certificato.titolo.descrizione && certificato.titolo.descrizione.length > 0)
    addTesto(
      doc,
      certificato.titolo.descrizione,
      15,
      colors.light_dark,
      "Times-Roman"
    );
  saltaLinee(doc, 10);
  addTesto(
    doc,
    "assegnato in data " +
      new Date(certificato.data).toLocaleDateString() +
      " allo studente",
    17,
    colors.light_dark
  );
  saltaLinee(doc, 6);
  addTesto(
    doc,
    certificato.studente.nome + " " + certificato.studente.cognome,
    38,
    colors.primary
  );
  saltaLinee(doc, 8);
  if (certificato.titolo.max_voto && certificato.voto)
    addTesto(
      doc,
      "con votazione " + certificato.voto + "/" + certificato.titolo.max_voto,
      20,
      colors.dark,
      "Times-Roman"
    );
  saltaLinee(doc, 10);
  if (certificato.commento && certificato.commento.length > 0)
    addTesto(
      doc,
      "nota della commisione: " + certificato.commento,
      15,
      colors.light_dark
    );
  await addImmagine(
    doc,
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      certificato.tx_url,
    470,
    certificato.tx_url,
    [60, 60]
  );

  doc.end();
};
