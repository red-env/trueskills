export default {
  template: /*html*/ `
  <div>
  <label class="my-title">Crea Certificato</label>
    <Form :key="formKey"
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
      certificati: [],
      structs: [],
      formKey: 0,
    };
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      const filtro_titolo = {
        title: "Titolo",
        attribute: "titolo",
      };
      const blockchain_type = await this.rest("blockchain_types");
      const studenti = await this.rest("studenti");
      const id_titolo = this.$route.params.id_titolo;
      let titolo = false;
      if (id_titolo) {
        titolo = await this.rest("titolo?id=" + id_titolo);
        if (titolo) {
          filtro_titolo.type = "label";
          filtro_titolo.value = id_titolo;
          filtro_titolo.label = titolo.titolo;
        }
      }
      if (!titolo) {
        const titoli = await this.rest("titoli_personali");
        filtro_titolo.type = "select";
        filtro_titolo.options = titoli.map((t) => {
          return {
            label: t.titolo,
            value: t._id,
          };
        });
      }
      this.structs = [
        [
          { type: "number", title: "Voto", attribute: "voto" },
          {
            type: "select",
            title: "Blockchain",
            attribute: "blockchain_type",
            options: blockchain_type.map((b) => {
              return {
                label: b.label,
                value: b.value,
              };
            }),
          },
        ],
        [
          filtro_titolo,
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
      this.formKey++;
    },
    async crea(certificato) {
      const title_blockchain = this.structs
        .reduce((x, y) => [...x, ...y])
        .find((field) => field.attribute == "blockchain_type")
        .options.find((b) => b.value == certificato.blockchain_type).label;
      this.$emit(
        "sendPopup",
        "Attenzione",
        `<b>Procedendo si procederà con la creazione del certificato in blockchain ${title_blockchain}</b>
        </br></br>
        <p>La creazione del certificato non potrà essere revocata</p>`,
        {
          label: "PROCEDI",
          callback: async () => {
            const contratto = await this.rest(
              "certificato",
              { method: "POST", body: certificato },
              true
            );
            if(contratto)
              this.$emit(
                "sendPopup",
                "Certificato Creato",
                `Il certificato è stato registrato nella blockchain ed è possibile visualizzare la transazione al seguente 
                <a target="_blank" href="${contratto.tx_url}">link</a>.`);
          },
        }
      );
    },
  },
};
