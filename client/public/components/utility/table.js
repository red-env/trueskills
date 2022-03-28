export default {
  template:
    /*html*/
    `<div class="p-4 table-wrapper-scroll-y my-custom-scrollbar">
        <label v-if="title.length > 0" class="my-title">{{title}}</label>
                    <table v-if="data.length > 0" class="table table-striped text-center">
                        <thead v-if="!notitle">
                            <tr>
                                <th scope="col" v-for="(field, k) in fields" :key="k">
                                    {{field.title}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(obj, o) in data" :key="o">
                                <td scope="col" v-for="(field, k) in fields" :key="k">
                                    <div v-if="field.type=='composed'">{{field.mapping(obj)}}</div>
                                    <a v-else-if="field.type=='url'" target="_blank" :href="obj[field.value]">{{obj.label}}</a>
                                    <div v-else-if="field.type=='text'">{{obj[field.value]}}</div>
                                    <div v-else-if="field.type=='date'">{{new Date(obj[field.value]).toLocaleDateString()}}</div>
                                    <div v-else-if="field.type=='button'" class="my-btn" @click="field.select(obj)">{{obj[field.value]}}</div>
                                    <div v-else-if="field.type=='button_label'" class="my-btn" @click="field.select(obj)">{{field.value}}</div>
                                    <div v-else>{{field.value}}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else>Tabella vuota</div>
                </div>
                `,
  props: {
      title: {
          type: String,
          default: ""
      },
    data: Array,
    fields: Array,
    notitle: Boolean
  },
};
