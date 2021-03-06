export default {
  template: /*html*/ `
    <div class="container">
    <label class="my-title">Dettaglio Titolo</label>
    <div v-if="titolo">
      <div class="row">
      <Grid :fields="dettaglio"></Grid>
        <div class="p-4">
        <label class="my-title">Certificati</label>
        <Button v-if="utente.utente.ruolo_tipo == 'SEGRETERIA'" class="my-btn"@click="() => $router.push('/crea_certificato/'+id)">
          Crea Nuovo Certificato
        </Button>
        <Table v-if="titolo.certificati && titolo.certificati.length > 0"
          :fields="[
            {title: 'Id', type: 'text', value: '_id'},
            {title: 'Studente', type: 'button', value: 'studente_label', select: (obj) => $router.push('/dettaglio_studente/'+obj.studente._id)},
            {title: 'Voto', type: 'text', value: 'voto'},
            {title: 'Commento', type: 'text', value: 'commento'},
            {title: '', type: 'button_label', value: 'Visualizza', select: (obj) => $router.push('/dettaglio_certificato/'+obj._id)},
          ]"
          :data="titolo.certificati"
        ></Table>
        </div>
      </div>
      </div>
      <div v-else class="p-4">
        Titolo non esistente
      </div>
    </div>`,
    props: {
      utente: Object
    },
  components: {
    Grid: Vue.defineAsyncComponent(() => import("./utility/grid.js")),
    Table: Vue.defineAsyncComponent(() => import("./utility/table.js")),
  },
  data() {
    return {
      dettaglio: [],
      titolo: {},
      id: this.$route.params.id,
    };
  },
  async created() {
    await this.cerca();
  },
  methods: {
    async cerca() {
      this.titolo = await this.rest("titolo?id=" + this.id);
      this.dettaglio = [
        {title: "Titolo", value: this.titolo.titolo},
        {title: "Descrizione", value: this.titolo.descrizione},
        {title: "Massimo Voto voto", value: this.titolo.max_voto},
        {title: "Data", value: this.titolo.data, type: "date"},
      ];
      for (const certificato of this.titolo.certificati) {
        certificato.studente_label = certificato.studente.nome + " " + certificato.studente.cognome;
      }
    },
  },
};
