export default {
  template: /*html*/ `
  <div>
  <label class="my-title">Crea Studente</label>
    <Form 
      not_hide="true"
      @done="(data) => crea(data)"
      submit_text="Crea"
      :structs="structs"
    ></Form>
  </div>`,
  props: {
    utente: Object,
  },
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
  },
  data() {
    return {
      structs: [
        [
          { type: "string", title: "Nome", attribute: "nome" },
          { type: "string", title: "Cognome", attribute: "cognome" },
        ],
        [
          { type: "email", title: "Email", attribute: "email" },
          { type: "tel", title: "Numero di Telefono", attribute: "telefono" },
        ],
        [{ type: "string", title: "Codice Fiscale", attribute: "cf" }],
        [
          { type: "text", title: "Username", attribute: "username" },
          { type: "password", title: "Password", attribute: "password" },
        ],
      ],
    };
  },
  methods: {
    async crea(studente) {
      if (
        this.structs.filter((struct) =>
          struct
            .filter((field) => studente[field.attribute] && studente[field.attribute].length > 0)
            .reduce((x, y) => x && y)
        )
      ) {
        const utente = {
          username: studente.username,
          password: studente.password,
          ruolo_tipo: "STUDENTE",
          ruolo: studente,
        };
        await this.rest("utente", { method: "POST", body: utente }, true);
      } else {
        this.$emit("notify", false, "Completare i campi mancanti");
      }
    },
  },
};
