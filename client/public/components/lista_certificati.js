export default {
  template: /*html*/ `
  <div>
    <label class="my-title">Lista Certificati</label>
    <Form 
      @done="(data) => cerca(data)"
      submit_text="Cerca"
      :structs="[
        [
          {type: 'date', title: 'Start', attribute: 'start'},
          {type: 'date', title: 'End', attribute: 'end'},
        ],
        [
          {type: 'text', title: 'Nome Studente', attribute: 'studente_nome'},
          {type: 'text', title: 'Cognome Studente', attribute: 'studente_cognome'}
        ],
        [
          {type: 'text', title: 'Titolo', attribute: 'titolo_titolo'},
          {type: 'text', title: 'Commento', attribute: 'commento'}
        ]
      ]"
    ></Form>
    <Button v-if="utente.utente.ruolo_tipo == 'SEGRETERIA'" class="my-btn"@click="() => $router.push('/crea_certificato')">
      Crea Nuovo
    </Button>
    <Table 
        :fields="[
          {title: 'Id', type: 'text', value: '_id'},
          {title: 'Studente', type: 'composed', mapping:(data) => data.studente.nome+' '+data.studente.cognome},
          {title: 'Titolo', type: 'composed', mapping:(data) => data.titolo.titolo},
          {title: 'Data', type: 'date', value: 'data'},
          {title: '', type: 'button_label', value: 'Visualizza', select: select},
          {title: '', type: 'button_label', value: 'Copy', select: copyCertificato}
        ]"
        :data="certificati"
      ></Table>
  </div>`,
  props: {
    utente: Object,
  },
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
    async copyCertificato(obj) {
      this.$emit(
          "sendPopup",
          "Certificato",
          `Il link del certificato è stato copiato`);
      await navigator.clipboard.writeText(
        window.location.href.split("#")[0] + "#/dettaglio_certificato/" + obj._id
      );
    },
  },
};
