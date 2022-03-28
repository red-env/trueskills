export default {
    template: /*html*/`
    <label class="my-title">Dashboard</label>
    <button class="my-btn" @click="() => $router.push('login')">Login</button>
    `,
    props: {
        utente: Object,
        routes: Array
    },
    created() {
        this.redirect();
    },
}