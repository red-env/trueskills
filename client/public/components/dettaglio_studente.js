export default {
  template: /*html*/ `
    <div class="container">
    <label class="my-title">Dettaglio Studente</label>
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
      
    </div>`,
  components: {
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
      const tit = {
        "Nome": this.studente.nome,
        "Cognome": this.studente.cognome,
        "Email": this.studente.email,
        "Numero di Telefono": this.studente.telefono,
        "Codice Fiscale": this.studente.cf,
      };
      this.dettaglio = Object.entries(tit)
        .filter((e) => e[1] && e[1].length > 0)
        .map((e) => {
          return {
            key: e[0],
            value: e[1],
          };
        });
      for (const certificato of this.studente.certificati) {
        certificato.voto = certificato.voto + "/" + certificato.titolo.max_voto;
        certificato.segreteria_label = certificato.titolo.segreteria.nome;
        certificato.titolo_label = certificato.titolo.titolo;
      }
    },
  },
};
