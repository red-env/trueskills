export default {
  template:
    /*html*/
    `<div class="p-4">
        <label v-if="title.length > 0" class="my-title">{{title}}</label>
        <form class="p-4 my-form" @submit.prevent="done()">
          <div v-for="(row, r) in structs" :key="r" class="row">
            <div v-for="(struct, c) in row" :key="c" class="col form-group">
              <label :for="struct.attribute">{{struct.title}}</label>
              <input v-if="struct.type=='number'" 
                  type="number" min="0" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]">
              <input v-else-if="struct.type=='date'" 
                type="date" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]">
              <select v-else-if="struct.type=='select'"
                class="form-control" :name="struct.attribute" :id="struct.attribute" v-model="data[struct.attribute]">
                <option v-for="(option, key) in struct.options" :key="key" :value="option.value">
                  {{option.label}}
                </option>
              </select>
              <textarea v-else-if="struct.type=='textarea'" :type="struct.type" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]"></textarea>
              <label v-else-if="struct.type=='label'" :type="struct.type" class="form-control" :id="struct.attribute">{{struct.label}}</label>
              <input v-else :type="struct.type" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]">
            </div>
          </div>
          <input type="submit" class="my-btn my-bg-color-primary m-2" :value="submit_text">
          <div v-if="title == 'Accedi come Studente'"  class="my-btn my-bg-color-primary m-2 fake_spid" >ENTRA CON SPID</div>
          
        </form>
      </div>`,
  props: {
    title: {
      type: String,
      default: "",
    },
    structs: Array,
    submit_text: {
      type: String,
      default: "Submit",
    },
    clean_text: {
      type: String,
      default: "Pulisci dati Filtro",
    },
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
        this.structs.forEach((struct) =>
        struct.forEach((field) => {
          if (field.type == "select" && field.options.length > 0) {
            this.data[field.attribute] = field.options[0].value;
          }
        })
      );
    },
    async done() {
      this.structs.forEach((struct) =>
        struct.forEach((field) => {
          if (field.value) {
            this.data[field.attribute] = field.value;
          }
        })
      );
      const toExport = Object.assign({}, this.data);
      Object.keys(this.data).forEach((k) => delete this.data[k]);
      this.init();
      this.$emit("done", toExport);
    },
  },
};
