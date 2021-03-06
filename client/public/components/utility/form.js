export default {
  template:
    /*html*/
    `<div class="p-4">
        <label v-if="title.length > 0" class="my-title">{{title}}</label>
        <button v-if="!not_hide" class="my-btn" @click="toggle" v-html="hide ? apri_filtro + ' &#8595;' : 'Chiudi &#8593;'"></button>
        <form v-show="not_hide || !hide" class="p-4 my-form" @submit.prevent="done()">
        <p v-if="subtitle.length > 0" class="form_subtitle">{{subtitle}}</p>
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

              <ul v-else-if="struct.type=='grid'"
                class="grid_wrap" :name="struct.attribute" :id="struct.attribute" v-model="data[struct.attribute]">
                  <li v-for="(option, key) in struct.options" :key="key" :value="option.value" :class="'grid_content gc_'+key">
                    <p>{{option.label}}</p> 
                    <img :src="option.url" :class="'icon_grid ic_'+key"></img>
                  </li>
              </ul>

              <textarea v-else-if="struct.type=='textarea'" :type="struct.type" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]"></textarea>
              <label v-else-if="struct.type=='label'" :type="struct.type" class="form-control" :id="struct.attribute">{{struct.label}}</label>
              <input v-else :type="struct.type" class="form-control" :id="struct.attribute" v-model="data[struct.attribute]">
            </div>
          </div>
          <input type="submit" class="my-btn my-bg-color-primary m-2" :value="submit_text">

          <div v-if="end_html" v-html="end_html"></div>

        </form>
      </div>`,
  props: {
    not_hide: {
      type: Boolean,
      default: false
    },
    apri_filtro: {
      type: String,
      default: "Cerca"
    },
    end_html: {
      type: String
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    type: {
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
      data: {},
      hide: true
    }
  },
  created() {
    this.init();
  },
  methods: {
    toggle() {
      this.hide = !this.hide;
    },
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
