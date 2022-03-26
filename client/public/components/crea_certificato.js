export default {
  template: /*html*/ `
  <div>
  <label class="my-title">Crea Certificato</label>
    <Form 
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
      certificati: [],
      structs: [],
    };
  },
  async created() {
    const blockchain_type = await this.rest("blockchain_types");
    const studenti = await this.rest("studenti");
    const titoli = await this.rest("titoli_personali");
    this.structs = [
      [
        { type: "number", title: "Voto", attribute: "voto" },
        {
          type: "select",
          title: "Blockchain",
          attribute: "blockchain_type",
          options: blockchain_type.map((b) => {
            return {
              label: b.nome,
              value: b._id,
            };
          }),
        },
      ],
      [
        {
          type: "select",
          title: "Titolo",
          attribute: "titolo",
          options: titoli.map((t) => {
            return {
              label: t.titolo,
              value: t._id,
            };
          }),
        },
        {
          type: "select",
          title: "Studente",
          attribute: "studente",
          options: studenti.map((s) => {
            return {
              label: s.cf,
              value: s._id,
            };
          }),
        },
      ],
      [{ type: "textarea", title: "Note", attribute: "commento" }],
    ];
  },
  methods: {
    async crea(certificato) {
      await this.rest(
        "certificato",
        { method: "POST", body: certificato },
        true
      );
    },
  },
};
