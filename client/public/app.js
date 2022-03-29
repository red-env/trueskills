const routes = [
  {
    path: "/login",
    name: "Login",
    ruolo: "PUBBLICO",
    component: () => import("./components/login.js"),
  },
  {
    path: "/lista_certificati",
    name: "Lista Certificati",
    ruolo: ["SEGRETERIA", "STUDENTE"],
    component: () => import("./components/lista_certificati.js"),
  },
  {
    path: "/crea_certificato/:id_titolo?",
    name: "Crea Certificato",
    ruolo: "SEGRETERIA",
    component: () => import("./components/crea_certificato.js"),
  },
  {
    path: "/lista_titoli",
    name: "Lista Titoli",
    ruolo: "SEGRETERIA",
    component: () => import("./components/lista_titoli.js"),
  },
  {
    path: "/crea_titolo",
    name: "Crea Titolo",
    ruolo: "SEGRETERIA",
    component: () => import("./components/crea_titolo.js"),
  },
  {
    path: "/lista_studenti",
    name: "Lista Studenti",
    ruolo: "SEGRETERIA",
    component: () => import("./components/lista_studenti.js"),
  },
  {
    path: "/crea_studente",
    name: "Crea Studente",
    ruolo: "SEGRETERIA",
    component: () => import("./components/crea_studente.js"),
  },
  {
    path: "/impostazioni_utente",
    name: "Impostazioni",
    ruolo: ["SEGRETERIA", "STUDENTE"],
    component: () => import("./components/impostazioni_utente.js"),
  },
  {
    path: "/dettaglio_certificato/:id",
    component: () => import("./components/dettaglio_certificato.js"),
  },
  {
    path: "/dettaglio_studente/:id",
    component: () => import("./components/dettaglio_studente.js"),
  },
  {
    path: "/dettaglio_titolo/:id",
    component: () => import("./components/dettaglio_titolo.js"),
  },
  {
    path: "/dettaglio_segreteria/:id",
    component: () => import("./components/dettaglio_segreteria.js"),
  },
  {
    path: "/",
    component: () => import("./components/dashboard.js"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./components/page_not_found.js"),
  },
];

const app = Vue.createApp({
  template: /*html*/ `
  <div>
    <Loading :loading="loading"></Loading>
    <Notification :notification="notification"></Notification>
    <Popup :popup="popup"></Popup>
    <div class="container-fluid">
        <Header></Header
        <div class="row vh-100">
          
          <div class="col">
           <Menu v-if="utente" :routes="routes" :utente="utente" @logout="logout"></Menu>
           <router-view :class="[utente?'log':'nolog']" @fetch="fetch" @login="login" @notify="notify" @sendPopup="sendPopup" @loading="setLoading" :utente="utente" :routes="routes"></router-view>
           <div class="clear"></div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
    `,
  components: {
    Menu: Vue.defineAsyncComponent(() =>
      import("./components/utility/menu.js")
    ),
    Loading: Vue.defineAsyncComponent(() =>
      import("./components/utility/loading.js")
    ),
    Popup: Vue.defineAsyncComponent(() =>
      import("./components/utility/popup.js")
    ),
    Notification: Vue.defineAsyncComponent(() =>
      import("./components/utility/notification.js")
    ),
    Header: Vue.defineAsyncComponent(() =>
      import("./components/utility/header.js")
    ),
    Footer: Vue.defineAsyncComponent(() =>
      import("./components/utility/footer.js")
    ),
  },
  data() {
    return {
      routes: routes,
      utente: undefined,
      loading: false,
      notification: { show: false },
      popup: { show: false },
    };
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      const jwt = localStorage.getItem("JWT");
      if (jwt) {
        this.utente = (
          await (
            await fetch("api/utente", {
              headers: { Authorization: "Bearer " + jwt },
            })
          ).json()
        ).result;
      }
    },
    setLoading(flag) {
      this.loading = flag;
    },
    notify(flag, title, description = "") {
      this.notification = { flag, title, description, show: true };
    },
    sendPopup(title, description="", submit=undefined) {
      this.popup = {
        title,
        description,
        submit,
        show: true,
      };
    },
    async login(jwt) {
      if (jwt) {
        localStorage.setItem("JWT", jwt);
        await this.init();
        this.$router.push("/dashboard");
        this.redirect();
      }
    },
    logout() {
      localStorage.removeItem("JWT");
      this.utente = undefined;
      this.$router.push("/login");
    },
  },
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
app.use(router);

app.mixin({
  methods: {
    redirect() {
      if (this.utente) {
        const path = this.routes.find(
          (r) =>
            r.ruolo == this.utente.utente.ruolo_tipo ||
            r.ruolo.includes(this.utente.utente.ruolo_tipo)
        ).path;
        if (path) this.$router.push(path);
      } else {
        this.$router.push("/login");
      }
    },
    formatFilter(filter) {
      const entries = Object.entries(filter);
      return entries.length == 0
        ? ""
        : "?" +
            entries.map((e) => e[0] + "=" + e[1]).reduce((x, y) => x + "&" + y);
    },
    async rest(
      path,
      options = { method: "GET" },
      notifySuccess = false,
      notifyError = true
    ) {
      this.$emit("loading", true);
      let result;
      const jwt = localStorage.getItem("JWT");
      options.headers = {};
      if (jwt) options.headers["Authorization"] = "Bearer " + jwt;
      if (options.method == "POST") {
        options.headers["Content-type"] = "application/json";
        options.body = JSON.stringify(options.body);
      }
      try {
        const res = await (await fetch("api/" + path, options)).json();
        if (res.status) {
          if (notifySuccess) this.$emit("notify", true, "Success");
          result = res.result;
        } else {
          if (notifyError)
            this.$emit("notify", false, `Error ${res.code || ""}`, res.result);
          if (res.code == 401) this.$emit("logout");
        }
      } catch (e) {
        if (notifyError) this.$emit("notify", false, "General Error", e);
      }
      this.$emit("loading", false);
      return result;
    },
  },
});

app.mount("#app");
