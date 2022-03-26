export default {
  template: /*html*/ `
    <div class="container">
    <label class="my-title">Dettaglio Segreteria</label>
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
      const tit = {
        "Nome": this.segreteria.nome,
        "Email": this.segreteria.email,
        "Numero di Telefono": this.segreteria.telefono,
        "Partita IVA": this.segreteria.p_iva,
      };
      this.dettaglio = Object.entries(tit)
        .filter((e) => e[1] && e[1].length > 0)
        .map((e) => {
          return {
            key: e[0],
            value: e[1],
          };
        });
    },
  },
};
