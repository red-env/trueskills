module.exports = (titolo, certificato, studente, segreteria) => {
  let text = `L'ente ${segreteria.nome}(${segreteria.p_iva}) assegna allo studente ${studente.nome} ${studente.cognome}(${studente.cf}) il titolo ${titolo.titolo}`;
  if (titolo.descrizione) text += ` (${titolo.descrizione})`;
  if (certificato.voto && titolo.max_voto) text += ` con votazione ${certificato.voto}/${titolo.max_voto}`;
  if (certificato.commento)
    text += ` (${certificato.commento})`;
  return text;
}