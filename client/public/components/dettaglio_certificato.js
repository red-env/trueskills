export default {
    template: /*html*/ `
    <div class="container">
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
        <button class="row btn btn-primary m-2" @click="visualizzaCerificato()">
          Visualizza Certificato
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="row btn btn-primary m-2" @click="accertaAutenticita()">
          Accerta Autenticità
        </button>
      </div>
    </div>`,
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
          "ente certificatore": this.certificato.titolo.segreteria.nome,
          "corso i riferimento": this.certificato.titolo.titolo,
          "descrizione del corso": this.certificato.titolo.descrizione,
          "studente": this.certificato.studente.nome + " " + this.certificato.studente.cognome,
          "note": this.certificato.commento,
          "voto finale": this.certificato.voto+"/"+this.certificato.titolo.max_voto,
          "id certificato": this.certificato._id,
          "hash": this.certificato.tx_hash
        };
        this.dettaglio = Object.entries(cert).filter(e => e[1] && e[1].length > 0).map(e => {
          return {
            key: e[0],
            value: e[1]
          }
        });
      },
      async visualizzaCerificato() {
        const res = await fetch("api/certificato_pdf?id=" + this.certificato._id, {
          headers: {
            "Content-type": "application/pdf",
            "Authorization": "Bearer "+ localStorage.getItem(STORAGE_KEYS.JWT)
          }
        });
        const objectUrl = URL.createObjectURL(await res.blob());
        window.open(objectUrl);
      },
      accertaAutenticita() {
        window.open(this.certificato.tx_url, '_blank');
      }
    },
  };
  