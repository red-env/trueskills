export default {
    template: /*html*/`
    <div :class="{menu_close: !isBig}">
        <div class="bg-dark" :class="{menu_overlay: !isBig}" class="menu">
            <nav v-if="open || isBig" class="d-flex menu_open flex-column flex-shrink-0 p-3 text-white bg-dark">
                <div v-for="(route, key) in routes" :key="key">
                    <router-link v-if="(!utente && route.ruolo=='PUBBLICO') || (utente && route.ruolo && (route.ruolo==utente.utente.ruolo_tipo || route.ruolo.includes(utente.utente.ruolo_tipo)))" 
                    class="btn nav-link m-2 rounded-sm bg-light" :to="route.path">
                        {{route.name}}
                    </router-link>
                </div>
                <div v-if="utente" class="btn nav-link m-2 rounded-sm bg-light" @click="() => $emit('logout')">
                    Logout
                </div>
            </nav>
            <nav v-else class="d-flex menu_close flex-column flex-shrink-0 text-white bg-dark">
                <div ref="hamburger" class="btn p-0 m-0 mt-2" @click="open = true"> 
                    <svg viewBox="0 0 100 80" width="20" height="20" style="fill:rgb(255,255,255);stroke-width:3;stroke:rgb(0,0,0)">
                        <rect width="100" height="20" rx="8"></rect>
                        <rect y="30" width="100" height="20" rx="8"></rect>
                        <rect y="60" width="100" height="20" rx="8"></rect>
                    </svg>
                </div>
            </nav>
        </div>
  </div>
    `,
    props: {
        utente: Object,
        routes: Array,
        threshold: {
            type: Number,
            default: 800
        }
    },
    data() {
        return {
            open: false,
            opened: false,
            innitialTime: true,
            isBig: window.innerWidth > this.threshold
        }
    },
    methods: {
        eventHandler() {
            this.isBig = window.innerWidth > this.threshold
        },
        close(e) {
            if (this.opened) {
                this.open = false;
                this.opened = false;
            } else
                this.opened = true;
        }
    },
    created() {
        window.addEventListener("resize", this.eventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.eventHandler);
    },
    mounted() {
        document.addEventListener('click', this.close);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close);
    }
}