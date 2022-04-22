export default {
  template: /*html*/ `
  <div>
  <label class="my-title">Crea Titolo</label>
    <Form 
      not_hide="true"
      @done="(data) => crea(data)"
      submit_text="Crea"
      :structs="[
        [
          {type: 'text', title: 'Titolo', attribute: 'titolo'},
          {type: 'number', title: 'Massimo Voto', attribute: 'max_voto'}
        ],
        [
          {type: 'textarea', title: 'Descrizione', attribute: 'descrizione'},
        ]
      ]"
    ></Form>
  </div>`,
  props: {
    utente: Object
  },
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
  },
  methods: {
    async crea(titolo) {
      await this.rest(
        "titolo",
        { method: "POST", body: titolo },
        true
      );
    },
  },
};
