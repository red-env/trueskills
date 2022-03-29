export default {
  template: /*html*/ `
    <div class="container dettaglio-certificato">
    <label class="my-title">Dettaglio Certificato</label>
    <img src="images/unimc.png" class="logo_certificato"/>
      <div class="wrp-certificato">
        <Grid :fields="dettaglio"></Grid>
      </div>
      <div class="row justify-content-center">
        <button class="row my-btn m-2" @click="visualizzaCerificato()">
          Visualizza Certificato
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="row my-btn m-2" @click="accertaAutenticita()">
          Accerta Autenticità
        </button>
      </div>
    </div>`,
  props: {
    utente: Object,
  },
  components: {
    Grid: Vue.defineAsyncComponent(() => import("./utility/grid.js")),
  },
  data() {
    return {
      dettaglio: [],
      certificato: {},
      id: this.$route.params.id,
    };
  },
  async created() {
    await this.cerca();
  },
  methods: {
    async cerca() {
      this.certificato = await this.rest("certificato?id=" + this.id);
      this.dettaglio = [
        {
          title: "Ente Certificatore",
          value: this.certificato.titolo.segreteria.nome,
          type: "text"
        },
        {
          title: "Corso di Riferimento",
          value: this.certificato.titolo.titolo,
          type: "text"
        },
        {
          title: "Descrizione del Corso",
          value: this.certificato.titolo.descrizione,
        },
        {
          title: "Studente",
          value:
            this.certificato.studente.nome +
            " " +
            this.certificato.studente.cognome,
          type: "text"
        },
        { title: "Note", value: this.certificato.commento },
        {
          title: "Voto Finale",
          value: this.certificato.voto + "/" + this.certificato.titolo.max_voto,
        },
        { title: "Id Certificato", value: this.certificato._id },
        {
          title: "Hash",
          value: this.certificato.tx_url,
          type: "url",
          label: this.certificato.tx_hash,
        },
      ];
    },
    visualizzaCerificato() {
      const headers = { "Content-type": "application/pdf" };
      const jwt = localStorage.getItem("JWT");
      if (jwt) headers.Authorization = "Bearer " + jwt;
      const win = window.open();
      fetch("api/certificato_pdf?id=" + this.certificato._id, { headers }).then(
        (res) =>
          res.blob().then((blob) => {
            const objectUrl = URL.createObjectURL(blob);
            win.location = objectUrl;
          })
      );
    },
    accertaAutenticita() {
      window.open(this.certificato.tx_url, "_blank");
    },
  },
};
