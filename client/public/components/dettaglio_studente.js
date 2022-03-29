export default {
  template: /*html*/ `
    <div class="container">
    <label class="my-title">Dettaglio Studente</label>
    <div v-if="studente">
      <div class="row">
      <Grid :fields="dettaglio"></Grid>
        <div class="p-4">
        <label class="my-title">Certificati</label>
          <Table v-if="studente.certificati && studente.certificati.length > 0"
            :fields="[
              {title: 'Id', type: 'text', value: '_id'},
              {title: 'Titolo', type: 'button', value: 'titolo_label', select: (obj) => $router.push('/dettaglio_titolo/'+obj.titolo._id)},
              {title: 'Segreteria', type: 'button', value: 'segreteria_label', select: (obj) => $router.push('/dettaglio_segreteria/'+obj.titolo.segreteria._id)},
              {title: 'Voto', type: 'text', value: 'voto'},
              {title: 'Commento', type: 'text', value: 'commento'},
              {title: '', type: 'button_label', value: 'Visualizza', select: (obj) => $router.push('/dettaglio_certificato/'+obj._id)},
            ]"
            :data="studente.certificati"
          ></Table>
        </div>
      </div>
      </div>
      <div v-else class="p-4">
        Studente non esistente
      </div>
    </div>`,
  components: {
    Grid: Vue.defineAsyncComponent(() => import("./utility/grid.js")),
    Table: Vue.defineAsyncComponent(() => import("./utility/table.js")),
  },
  data() {
    return {
      dettaglio: [],
      studente: {},
      id: this.$route.params.id,
    };
  },
  async created() {
    await this.cerca();
  },
  methods: {
    async cerca() {
      this.studente = await this.rest("studente?id=" + this.id);
      this.dettaglio = [
        {title: "Nome", value: this.studente.nome},
        {title: "Cognome", value: this.studente.cognome},
        {title: "Email", label: this.studente.email, type: "url", value: "mailto://"+this.studente.email},
        {title: "Numero di Telefono", label: this.studente.telefono, type: "url", value: "tel://"+this.studente.email},
        {title: "Codice Fiscale", value: this.studente.cf},
      ];
      for (const certificato of this.studente.certificati) {
        certificato.voto = certificato.voto + "/" + certificato.titolo.max_voto;
        certificato.segreteria_label = certificato.titolo.segreteria.nome;
        certificato.titolo_label = certificato.titolo.titolo;
      }
    },
  },
};
