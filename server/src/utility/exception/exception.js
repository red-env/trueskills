class Excetion {
    constructor(message, code = 400) {
        this.message = message;
        this.code = code;
    }
}

module.exports = {
    VOTO_NON_VALIDO: new Excetion("VOTO_NON_VALIDO"),
    TITOLO_NON_ESISTENTE: new Excetion("TITOLO_NON_ESISTENTE"),
    STUDENTE_NON_ESISTENTE: new Excetion("STUDENTE_NON_ESISTENTE"),
    MASSIMO_VOTO_NON_VALIDO: new Excetion("MASSIMO_VOTO_NON_VALIDO"),
    SEGRETERIA_NON_ESISTENTE: new Excetion("SEGRETERIA_NON_ESISTENTE"),
    CAMPI_AUTENTICAZIONE_MANCANTI: new Excetion("CAMPI_AUTENTICAZIONE_MANCANTI"),
    UTENTE_NON_ESISTENTE: new Excetion("UTENTE_NON_ESISTENTE"),
    UTENTE_GIA_ESISTENTE: new Excetion("UTENTE_GIA_ESISTENTE"),
    ACCESSO_NON_AUTORIZZATO: new Excetion("ACCESSO_NON_AUTORIZZATO", 401),
    RUOLO_NON_AUTORIZZATO: new Excetion("RUOLO_NON_AUTORIZZATO"),
    PASSWORD_ERRATA: new Excetion("PASSWORD_ERRATA")
};