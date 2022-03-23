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
            </div>`,
  props: {
    name: String,
    path: String,
    structs: Array,
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    async create() {
      this.$emit("loading", true);
      let log;
      const start = new Date().getTime();
      try {
        const res = await fetch(`/api/${this.path}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.data),
        });
        log = await res.json();
      } catch (e) {
        log = e;
      }
      const timer = new Date().getTime() - start; 
      log.date =
        new Date().toLocaleDateString() +
        " - " +
        new Date().toLocaleTimeString();
      log.timer = timer / 1000;
      this.$emit("logs", log);
      this.$emit("loading", false);
      this.$emit("end");
    },
  },
};
