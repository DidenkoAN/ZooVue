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
                <div class="col col-6"><button @click="mounted">U</button></div>
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
import axios from "axios";
import { onMounted } from "vue";

export default {
  methods: {
    async mounted() {
      console.log("start");
      const resp = await axios.get("https://jsonplaceholder.org/users");
      console.log(resp);
    },
    onMounted() {
      mounted();
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
