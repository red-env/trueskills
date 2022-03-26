export default {
  template: /*html*/ `
    <div class="container">
    <label class="my-title">Dettaglio Titolo</label>
      <div class="row">
        <Table 
          :fields="[
            {type: 'text', value: 'key'},
            {type: 'text', value: 'value'},
          ]"
          :data="dettaglio"
          :notitle="true"
        ></Table>
        <div class="p-4">
        <label class="my-title">Certificati</label>
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
      
    </div>`,
  components: {
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
      const tit = {
        "Titolo": this.titolo.titolo,
        "Descrizione": this.titolo.descrizione,
        "Massimo Voto voto": this.titolo.max_voto+'',
        "Data": this.titolo.data,
      };
      this.dettaglio = Object.entries(tit)
        .filter((e) => e[1] && e[1].length > 0)
        .map((e) => {
          return {
            key: e[0],
            value: e[1],
          };
        });
      for (const certificato of this.titolo.certificati) {
        certificato.studente_label = certificato.studente.nome + " " + certificato.studente.cognome;
      }
    },
  },
};
