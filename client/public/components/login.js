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
      ></Form>
    </div>
  </div>`,
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
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
