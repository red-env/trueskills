export default {
  template: /*html*/ `
  <div>
  <label class="my-title">Lista Studenti</label>
    <Form 
      @done="(data) => cerca(data)"
      submit_text="Cerca"
      :structs="[
        [
          {type: 'text', title: 'Nome', attribute: 'nome'},
          {type: 'text', title: 'Cognome', attribute: 'cognome'},
        ],
        [{type: 'text', title: 'Codice Fiscale', attribute: 'cf'}]
      ]"
    ></Form>
    <Button v-if="utente.utente.ruolo_tipo == 'SEGRETERIA'" class="my-btn"@click="() => $router.push('/crea_studente')">
      Crea Nuovo
    </Button>
    <Table 
        :fields="[
          {title: 'Nome', type: 'text', value: 'nome'},
          {title: 'Cognome', type: 'text', value: 'cognome'},
          {title: 'Email', type: 'text', value: 'email'},
          {title: 'Telefono', type: 'text', value: 'telefono'},
          {title: 'Codice Fiscale', type: 'text', value: 'cf'},
        ]"
        :data="studenti"
      ></Table>
  </div>`,
  props: {
    utente: Object
  },
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
    Table: Vue.defineAsyncComponent(() => import("./utility/table.js")),
  },
  data() {
    return {
      studenti: [],
    };
  },
  async created() {
    await this.cerca();
  },
  methods: {
    async cerca(filter = {}) {
      this.studenti = await this.rest(
        "studenti" + this.formatFilter(filter)
      );
    },
  },
};
