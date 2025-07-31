<template>
  <component v-if="isModal != ''" :is="isModal" @setIsModal1="setIsModal1" />
  <div class="container">
    <div class="row pb-5">
      <div class="col col-3"><h3>User list</h3></div>
      <div class="col col-6">
        <button v-if="!this.removed" @click="this.isRemoved" class="actBtn">
          Removed
        </button>
        <button v-else @click="this.isRemoved" class="actBtn">Existing</button>
      </div>
    </div>
    <div class="row pt-5 pb-3">
      <div class="col col-4">
        <label class="col col-4">Name</label>
        <input type="text" class="col col-4" v-model="this.name" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Email</label>
        <input type="text" class="col col-4" v-model="this.email" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Phone</label>
        <input type="text" class="col col-4" v-model="this.phone" />
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
          </tr>
        </thead>
        <tbody v-if="this.datas != []" v-for="data in this.datas">
          <tr
            v-if="
              Boolean(data.removed) == this.removed &&
              (this.name == '' || data.name.includes(this.name)) &&
              (this.email == '' || data.name.includes(this.email)) &&
              (this.phone == '' || data.name.includes(this.phone))
            "
          >
            <th scope="row">{{ data.id }}</th>
            <td>{{ data.name }}</td>
            <td>{{ data.email }}</td>
            <td>{{ data.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import deleteProfileModal from "./deleteProfileModal.vue";
import { getUsers } from "@/api/userAPI";

export default {
  components: {
    deleteProfileModal,
  },
  data() {
    return {
      datas: [],
      name: "",
      email: "",
      phone: "",
      isModal: "",
      removed: false,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    async start() {
      let data = await getUsers();
      if (data.status == "ok") this.datas = data.message;
      else window.alert(data.message);
    },

    delete() {
      this.isModal = "deleteProfileModal";
    },

    setIsModal1(_isModal) {
      this.isModal = _isModal;
      this.$emit("setIsModal", "");
    },
    isRemoved() {
      this.removed = !this.removed;
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
