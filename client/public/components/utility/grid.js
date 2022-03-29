export default {
    template: /*html*/`
    
        <table v-if="fields.length > 0" class="table table-striped text-center" >
            <tbody scope="row" v-for="(field, k) in fields" :key="k">
                <div v-if="field.value && field.value.length>0">
                    <th scope="col">{{field.title}}</th>
                    <td>
                        <a v-if="field.type=='url'" target="_blank" :href="field.value">{{field.label}}</a>
                        <div v-else-if="field.type=='button'" class="my-btn" @click="field.select()">{{field.value}}</div>
                        <div v-else-if="field.type=='date'">{{new Date(field.value).toLocaleDateString()}}</div>
                        <div v-else>{{field.value}}</div>
                    </td>
                </div>
            </tbody>
        </table>
    `,
    props: {
        fields: Array
    }
}