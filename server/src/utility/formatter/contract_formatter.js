module.exports = (certificato) => {
  let text = `L'ente ${certificato.titolo.segreteria.nome}(${certificato.titolo.segreteria.p_iva}) assegna allo studente ${certificato.studente.nome} ${certificato.studente.cognome}(${certificato.studente.cf}) il titolo ${certificato.titolo.titolo}`;
  if (certificato.titolo.descrizione)
    text += ` (${certificato.titolo.descrizione})`;
  if (certificato.voto && certificato.titolo.max_voto)
    text += ` con votazione ${certificato.voto}/${certificato.titolo.max_voto}`;
  if (certificato.commento)
    text += ` (${certificato.commento})`;
  return text;
}