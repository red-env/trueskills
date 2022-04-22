export default {
  template: /*html*/ `
  <div>
  <label class="my-title">Richiedi Certificato</label>
  <p class="my-description">Se hai conseguito il titolo prima del 2020 richiedi alla segreteria la sua digitalizzazione</p>
    <Form 
      @done="(data) => cerca(data)"
      submit_text="Richiedi certificazione"
      :structs="structs"
    ></Form>
  </div>`,
  components: {
    Form: Vue.defineAsyncComponent(() => import("./utility/form.js")),
  },
  props: {
    utente: Object
  },
  data() {
    return {
      structs: []
    };
  },
  async created() {
    const titoli = await this.rest("titoli");
    const blockchain_type = await this.rest("blockchain_types");
    this.structs = [
      [
        { type: 'date', title: 'Anno conseguimento titolo', attribute: 'anno_conseguimento_titolo' },
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
        {
          type: 'select',
          title: 'Titolo',
          attribute: "titolo",
          options: titoli.map((t) => {
            return {
              label: t.titolo,
              value: t._id,
            }
          })
        },
      ],
      [
        {
          type: "grid",
          title: "Metodo di Pagamento",
          attribute: "metodo_pagamento",
          options: [
            {
              label: "Paypal",
              value: "paypal",
              url: "https://cdn1.iconfinder.com/data/icons/social-media-outline-6/128/SocialMedia_PayPal-Outline-512.png"
            },
            {
              label: "Carta di Credito",
              value: "carta_credito",
              url: "https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png"
            },
            {
              label: "MetaMask",
              value: "metamask",
              url: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            },
            {
              label: "Coinbase Wallet",
              value: "coinbase_wallet",
              url: "https://bitcoincasinoreview.com/wp-content/uploads/2021/02/transparent-1.png"
            },
            {
              label: "Phantom",
              value: "phantom",
              url: "https://cryptonomist.ch/wp-content/uploads/2022/02/phantom-icon-purple-1.jpg"
            }
          ]
        },
      ]
    ];
  }
};
