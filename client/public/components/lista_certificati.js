export default {
  template: /*html*/ `
  <div>
    <Form 
      @done="(data) => cerca(data)"
      submit_text="Cerca..."
      :structs="[
        [
          {type: 'date', title: 'Start', attribute: 'start'},
          {type: 'date', title: 'End', attribute: 'end'},
        ],
        [{type: 'text', title: 'Commento', attribute: 'commento'}]
      ]"
    ></Form>
    <Table 
        :fields="[
          {title: 'Id', type: 'text', value: '_id'},
          {title: 'Studente', type: 'composed', mapping:(data) => data.studente.nome+' '+data.studente.cognome},
          {title: 'Titolo', type: 'composed', mapping:(data) => data.titolo.titolo},
          {title: 'Data', type: 'text', value: 'data'},
          {title: '', type: 'button', value: 'Visualizza', select: select}
        ]"
        :data="certificati"
      ></Table>
  </div>`,
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
    Table: Vue.defineAsyncComponent(() => import("./utility/table.js")),
  },
  data() {
    return {
      certificati: [],
    };
  },
  async created() {
    await this.cerca();
  },
  methods: {
    async cerca(filter = {}) {
      this.certificati = await this.rest(
        "certificati_personali" + this.formatFilter(filter)
      );
    },
    async select(obj) {
      this.$router.push("/dettaglio_certificato/" + obj._id);
    },
  },
};
