export default {
  template: /*html*/ `
    <p class="title_presentazione">Benvenuto nel sistema di gestione smart contract di UniMc</p>
  <div class="row loginformapage">
    
    <div class="col login-segreteria">
      <Form 
        title="Accedi come Segreteia Studenti"
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
        title="Accedi come Studente"
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
