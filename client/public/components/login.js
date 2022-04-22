export default {
  template: /*html*/ `
    <p class="title_presentazione">BENVENUTO NEL SISTEMA DI CERTIFICAZIONE DIGITALE TITOLI UNIMC</p>
    <p class="subtitle_presentazione">Il servizio offerto da Unicam per introdurre nel tuo curriculim prova ufficiale del titolo conseguito presso la nostra università.</p>
  <div class="row loginformapage">
    
    <div class="col login-segreteria">
      <Form 
        title="Segreteria"
        subtitle="Accesso riservato al personale UNIMC"
        @done="(data) => {
          data.ruolo = 'SEGRETERIA';
          login(data);
        }"
        submit_text="ACCEDI"
        :structs="[
          [{type: 'text', title: 'Username', attribute: 'username'}],
          [{type: 'password', title: 'Password', attribute: 'password'}]
        ]"
      ></Form>
    </div>
    <div class="col login-studenti">
      <Form 
        title="Area Studente"
        type="studente"
        subtitle="Accedi per recuperare i tuoi titoli in formato digitale"
        @done="(data) => {
          data.ruolo = 'STUDENTE';
          login(data);
        }"
        submit_text="ACCEDI"
        :structs="[
          [{type: 'text', title: 'Username', attribute: 'username'}],
          [{type: 'password', title: 'Password', attribute: 'password'}]
        ]"
        :end_html="end_html"
      ></Form>
    </div>
  </div>`,
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
  },
  data() {
    return {
      end_html: `
        <div class="register_action_wrp" >
          <p class="register_text">non sei ancora registrato?</p>
        </div>
        <div class="my-btn my-bg-color-primary m-2 fake_spid" >ENTRA CON SPID</div>`
    }
  },
  methods: {
    async login(utente) {
      const jwt = await this.rest(
        "login",
        { method: "POST", body: utente },
        true
      );
      this.$emit("login", jwt);
    },
  },
};
