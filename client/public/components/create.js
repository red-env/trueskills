module.exports = {
  template:
    /*html*/
    `<div class="p-4">
                <form class="p-4" @submit.prevent="create()">
                    <div v-for="(struct, key) in structs" :key="key" class="form-group">
                        <label :for="struct.attribute">{{struct.title}}</label>
                        <input v-if="struct.type=='number'" 
                            type="number" min="0" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]">
                        <input v-else-if="struct.type=='date'" 
                            type="date" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]">
                        <select v-else-if="struct.type=='select'"
                            class="form-control" :name="struct.attribute" :id="struct.attribute" v-model="data[struct.attribute]">
                            <option v-for="(option, key) in struct.options" 
                                :key="key" :value="option.value">{{option.label}}</option>
                        </select>
                        <input v-else 
                            type="text" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]">
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
                <div class="p-4 table-wrapper-scroll-y my-custom-scrollbar">
                    <table class="table table-bordered table-striped mb-0">
                        <tbody>
                            <tr v-for="(log, key) in logs" :key="key">
                                <td scope="row">{{key+1}}</td>
                                <td>{{log.status}}</td>
                                <td v-if="log.status">
                                    <a target="_blank" :href="etherscan_url+'tx/'+log.data.tx">{{log.data.tx}}</a>
                                </td>
                                <td>
                                    <textarea disabled rows="30" cols="150">
                                        {{JSON.stringify(log.status ? log.data : log.error, {}, "\t")}}
                                    </textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`,
  props: {
    name: String,
    path: String,
    structs: Array,
    etherscan_url: String,
  },
  data() {
    return {
      data: {},
      logs: [],
    };
  },
  methods: {
    async create() {
      this.$emit("loading", true);
      try {
        const res = await fetch(`/api/${this.path}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.data),
        });
        this.logs.push(await res.json());
      } catch (e) {
        this.logs.push(e);
      }
      this.$emit("loading", false);
    },
  },
};
