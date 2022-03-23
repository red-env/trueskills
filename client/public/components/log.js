module.exports = {
  template:
    /*html*/
    `<div class="p-4 table-wrapper-scroll-y my-custom-scrollbar">
                    <table class="table table-bordered table-striped mb-0">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Seconds</th>
                                <th scope="col">Status</th>
                                <th scope="col">Hash/Error</th>
                                <th scope="col">BlockNumber</th>
                                <th scope="col">Raw Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(log, key) in logs.slice().reverse()" :key="key">
                                <td scope="row">{{key+1}}</td>
                                <td>{{log.date}}</td>
                                <td>{{log.timer}}</td>
                                <td>{{log.status}}</td>
                                <td v-if="log.status">
                                    <a target="_blank" :href="etherscan_url+'tx/'+log.data.tx">{{log.data.tx}}</a>
                                </td>
                                <td v-if="log.status">
                                    {{log.data.receipt.blockNumber}}
                                </td>
                                <td>
                                    {{log.status ? log.data : log.error}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                `,
  props: {
    logs: Array,
    etherscan_url: String,
  },
};