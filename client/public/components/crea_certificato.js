export default {
  template: /*html*/ `
  <div>
    <Form 
      title="Crea Certificato"
      @done="(data) => crea(data)"
      submit_text="Crea"
      :structs="[
        [
          {type: 'number', title: 'Voto', attribute: 'voto'},
          {type: 'string', title: 'Note', attribute: 'commento'},
        ],
        [
          {type: 'filter', title: 'Studente', attribute: 'studente', component: 'studente_filter.js'}, 
          {type: 'filter', title: 'Titolo', attribute: 'titolo', component: 'titolo_filter.js'}
        ],
        [
          {type: 'filter', title: 'Blockchain', attribute: 'blockchain_type', component: 'titolo_filter.js'},
        ]
      ]"
    ></Form>
  </div>`,
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
  },
  data() {
    return {
      certificati: [],
      studenti: []
    };
  },
  async created() {
    this.studenti = await this.rest("studenti");
  },
  methods: {
    async crea(certificato) {
      //TODO CONTINUARE
      await this.rest(
        "certificato",
        { method: "POST", body: certificato },
        true
      );
    },
  },
};
