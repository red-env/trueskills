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
    path: "/dettaglio_certificato/:id",
    component: () => import("./components/dettaglio_certificato.js"),
  },
];

const app = Vue.createApp({
  template: /*html*/ `
        <Loading :loading="loading"></Loading>
        <Notification :notification="notification"></Notification>
        <div class="container-fluid">
        <div class="row vh-100">
          <Menu :routes="routes" :utente="utente" @logout="logout"></Menu>
          <div class="col">
            <router-view @fetch="fetch" @login="login" @notify="notify" @loading="setLoading" :utente="utente"></router-view>
          </div>
        </div>
        <div class="row">
          <footer></footer>
        </div>
    `,
  components: {
    Menu: Vue.defineAsyncComponent(() =>
      import("./components/utility/menu.js")
    ),
    Loading: Vue.defineAsyncComponent(() =>
      import("./components/utility/loading.js")
    ),
    Notification: Vue.defineAsyncComponent(() =>
      import("./components/utility/notification.js")
    ),
  },
  data() {
    return {
      routes: routes,
      utente: undefined,
      loading: false,
      notification: { show: false },
    };
  },
  async created() {
    await this.init();
  },
  methods: {
    async init() {
      const jwt = localStorage.getItem(STORAGE_KEYS.JWT);
      if (jwt) {
        this.utente = (
          await (
            await fetch("api/utente", {
              headers: { Authorization: "Bearer " + jwt },
            })
          ).json()
        ).result;
        if (this.utente) {
          const path = this.routes.find(
            (r) => r.ruolo == this.utente.utente.ruolo_tipo || r.ruolo.includes(this.utente.utente.ruolo_tipo)
          ).path;
          if (path) this.$router.push(path);
        }
      }
    },
    setLoading(flag) {
      this.loading = flag;
    },
    notify(flag, title, description = "") {
      this.notification = { flag, title, description, show: true };
    },
    async login(jwt) {
      if (jwt) {
        localStorage.setItem(STORAGE_KEYS.JWT, jwt);
        await this.init();
      }
    },
    logout() {
      localStorage.removeItem(STORAGE_KEYS.JWT);
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
      this.$emit("setLoading", true);
      let result;
      const jwt = localStorage.getItem(STORAGE_KEYS.JWT);
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
      this.$emit("setLoading", false);
      return result;
    },
  },
});

app.mount("#app");
