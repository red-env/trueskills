module.exports = {
  template:
    /*html*/
    `<div class="p-4">
                <div class="p-4">
                    <form @submit.prevent="search()">
                        <div class="form-group">
                            <label for="id">Id {{name}}</label>
                            <input type="number" min="0" class="form-control" id="id" placeholder="search id" v-model="id">
                        </div>
                        <button type="submit" class="btn btn-primary">Search</button>
                    </form>
                </div>
                <div class="p-4">
                    <table v-if="data" class="table">
                        <tbody>
                            <tr v-for="(value, key) in data" :key="key">
                                <td>{{key}}</td>
                                <td>{{value}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <label v-else>{{name}} not found</label>
                </div>
            </div>`,
  props: {
    name: String,
    path: String
  },
  data() {
    return {
      data: null,
      id: null,
    };
  },
  methods: {
    async search() {
      this.$emit("loading", true);
      try {
        this.data = (await (await fetch(`/api/${this.path}?id=${this.id}`)).json()).data;
      } catch (e) {
        this.data = null;
        console.error(e);
      }
      this.$emit("loading", false);
    },
  },
};