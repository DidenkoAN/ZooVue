<template>
  <div class="container">
    <div class="row pb-5">
      <div class="col col-3"><h3>User list</h3></div>
      <div class="col col-6">
        <button class="actBtn">Removed</button>
      </div>
    </div>
    <div class="row pt-5 pb-3">
      <div class="col col-4">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
    </div>

    <div>
      <table class="my-3 container text-center">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">email</th>
            <th scope="col">phone</th>
            <th scope="col">password</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Otto</td>
            <td>Mark</td>
            <td>Mark</td>
            <td>@mdo</td>
            <td>
              <div class="row">
                <div class="col col-6"><button @click="start">U</button></div>
                <div class="col col-6"><button>R</button></div>
              </div>
            </td>
          </tr>

          <tr v-if="this.dates != []" v-for="date in this.dates">
            <th scope="row">{{ date.id }}</th>
            <td>{{ date.name }}</td>
            <td>{{ date.email }}</td>
            <td>{{ date.phone }}</td>
            <td>@mdo</td>
            <td>
              <div class="row">
                <div class="col col-6"><button @click="start">U</button></div>
                <div class="col col-6"><button>R</button></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { useFetch } from "@vueuse/core";
import { ref } from "vue";
const data1 = ref([]);

export default {
  data() {
    return {
      dates: [],
    };
  },
  methods: {
    async start() {
      let url = "https://jsonplaceholder.typicode.com/users";
      let { isFetching, error, data } = await useFetch(url).json();
      this.dates = data.value;
      console.log(this.dates, "2");
    },

    onMounted() {
      console.log("Hello");
    },
  },
};
</script>
<style>
th,
td {
  background-color: #4c5c81;
  border: 1px solid white;
  padding: 8px;
}
</style>
