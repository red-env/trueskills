export default {
  template: /*html*/ `
  <div>
  <label class="my-title">Lista Titoli</label>
    <Form 
    title="Lista Titoli"
      @done="(data) => cerca(data)"
      submit_text="Cerca"
      :structs="[
        [
          {type: 'date', title: 'Start', attribute: 'start'},
          {type: 'date', title: 'End', attribute: 'end'},
        ],
        [
          {type: 'text', title: 'Titolo', attribute: 'titolo'},
          {type: 'text', title: 'Descrizione', attribute: 'descrizione'},
        ]
      ]"
    ></Form>
    <Button v-if="utente.utente.ruolo_tipo == 'SEGRETERIA'" class="my-btn"@click="() => $router.push('/crea_titolo')">
      Crea Nuovo
    </Button>
    <Table 
        :fields="[
          {title: 'Titolo', type: 'text', value: 'titolo'},
          {title: 'Massimo Voto', type: 'text', value: 'max_voto'},
          {title: 'Data', type: 'date', value: 'data'},
          {title: '', type: 'button_label', value: 'Visualizza', select: select}
        ]"
        :data="titoli"
      ></Table>
  </div>`,
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
    Table: Vue.defineAsyncComponent(() => import("./utility/table.js")),
  },
  props: {
    utente: Object
  },
  data() {
    return {
      titoli: [],
    };
  },
  async created() {
    await this.cerca();
  },
  methods: {
    async cerca(filter = {}) {
      this.titoli = await this.rest(
        "titoli_personali" + this.formatFilter(filter)
      );
    },
    async select(obj) {
      this.$router.push("/dettaglio_titolo/" + obj._id);
    },
  },
};
