export default {
    template: /*html*/`
    <div>
    <label class="my-title">Impostazioni Utente</label>
      <Form 
        title="Cambia Password"
        @done="(data) => cambioPassword(data)"
        submit_text="Cambia Password"
        :structs="[
            [
              {type: 'password', title: 'Password Attuale', attribute: 'password'}
            ], [ 
              {type: 'password', title: 'Nuova Password', attribute: 'new_password'}
            ], [
              {type: 'password', title: 'Ripeti Nuova Password', attribute: 'repeat_password'},
            ]
          ]"
      ></Form>
    </div>
    `,
    props: {
        utente: Object
    },
    components: {
      Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
    },
    methods: {
        async cambioPassword(data) {
            await this.rest("cambia_password", { method: "POST", body: data }, true);
        }
    }
}