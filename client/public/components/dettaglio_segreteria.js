export default {
  template: /*html*/ `
    <div class="container">
    <label class="my-title">Dettaglio Segreteria</label>
      <div class="row">
      <Grid :fields="dettaglio"></Grid>
        <div class="p-4">
        <label class="my-title">Titoli</label>
          <Table v-if="segreteria.titoli && segreteria.titoli.length > 0"
            :fields="[
              {title: 'Id', type: 'text', value: '_id'},
              {title: 'Titolo', type: 'text', value: 'titolo'},
              {title: 'Descrizione', type: 'text', value: 'descrizione'},
              {title: 'Massimo Voto', type: 'text', value: 'max_voto'},
              {title: 'Data', type: 'date', value: 'data'},
              {title: '', type: 'button_label', value: 'Visualizza', select: (obj) => $router.push('/dettaglio_titolo/'+obj._id)},
            ]"
            :data="segreteria.titoli"
          ></Table>
        </div>
      </div>
      
    </div>`,
  components: {
    Grid: Vue.defineAsyncComponent(() => import("./utility/grid.js")),
    Table: Vue.defineAsyncComponent(() => import("./utility/table.js")),
  },
  data() {
    return {
      dettaglio: [],
      segreteria: {},
      id: this.$route.params.id,
    };
  },
  async created() {
    await this.cerca();
  },
  methods: {
    async cerca() {
      this.segreteria = await this.rest("segreteria?id=" + this.id);
      this.dettaglio = [
        {title: "Nome", value: this.segreteria.nome},
        {title: "Email", label: this.segreteria.email, type: "url", value: "mailto://"+this.segreteria.email},
        {title: "Numero di Telefono", label: this.segreteria.telefono, type: "url", value: "tel://"+this.segreteria.email},
        {title: "Partita IVA", value: this.segreteria.p_iva},
      ];
    },
  },
};
