export default {
    template: /*html*/ `
    <div class="container">
    <label class="my-title">Dettaglio Certificato</label>
      <div class="row">
        <Table 
          :fields="[
            {type: 'text', value: 'key'},
            {type: 'text', value: 'value'},
          ]"
          :data="dettaglio"
          :notitle="true"
        ></Table>
      </div>
      <div class="row justify-content-center">
        <button class="row my-btn m-2" @click="visualizzaCerificato()">
          Visualizza Certificato
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="row my-btn m-2" @click="accertaAutenticita()">
          Accerta Autenticità
        </button>
      </div>
    </div>`,
    props: {
      utente: Object
    },
    components: {
      Table: Vue.defineAsyncComponent(() => import("./utility/table.js"))
    },
    data() {
      return {
        dettaglio: [],
        certificato: {},
        id : this.$route.params.id
      };
    },
    async created() {
      await this.cerca();
    },
    methods: {
      async cerca() {
        this.certificato = await this.rest("certificato?id=" + this.id);
        const cert = {
          "Ente Certificatore": this.certificato.titolo.segreteria.nome,
          "Corso di Riferimento": this.certificato.titolo.titolo,
          "Descrizione del Corso": this.certificato.titolo.descrizione,
          "Studente": this.certificato.studente.nome + " " + this.certificato.studente.cognome,
          "Note": this.certificato.commento,
          "Voto Finale": this.certificato.voto+"/"+this.certificato.titolo.max_voto,
          "Id Certificato": this.certificato._id,
          "Hash": this.certificato.tx_hash
        };
        this.dettaglio = Object.entries(cert).filter(e => e[1] && e[1].length > 0).map(e => {
          return {
            key: e[0],
            value: e[1]
          }
        });
      },
      visualizzaCerificato() {
        const headers = { "Content-type": "application/pdf"};
        const jwt = localStorage.getItem(STORAGE_KEYS.JWT);
        if(jwt)
          headers.Authorization = "Bearer "+ jwt;
        const win = window.open();
        fetch("api/certificato_pdf?id=" + this.certificato._id, {headers}).then(res => res.blob().then(blob => {
          const objectUrl = URL.createObjectURL(blob);
          win.location = objectUrl;
        }));
      },
      accertaAutenticita() {
        window.open(this.certificato.tx_url, '_blank');
      }
    },
  };
  