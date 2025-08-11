<template>
  <div class="mx-5 my-5">
    <label>User</label>
    <v-btn v-if="!removed" class="btn1 mx-5" @click="removed = true"
      >Removed</v-btn
    >
    <v-btn v-else class="btn1 mx-5" @click="removed = false">Existing</v-btn>
  </div>

  <div>
    <v-row class="mag">
      <v-col>
        <v-row>
          <v-col cols="4" class="text-center"> <label>Name</label></v-col>
          <v-col cols="8"
            ><v-text-field variant="solo" v-model="name"></v-text-field
          ></v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-col cols="4" class="text-center"> <label>Email</label></v-col>
          <v-col cols="8"
            ><v-text-field variant="solo" v-model="email"></v-text-field
          ></v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-col cols="4" class="text-center"> <label>Phone</label></v-col>
          <v-col cols="8"
            ><v-text-field variant="solo" v-model="phone"></v-text-field
          ></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
  <div class="mag">
    <v-table class="text-center">
      <thead>
        <tr>
          <th class="text-center">id</th>
          <th class="text-center">name</th>
          <th class="text-center">email</th>
          <th class="text-center">phone</th>
        </tr>
      </thead>
      <tbody v-if="this.user != []" v-for="user in users">
        <tr
          v-if="
            user.removed == this.removed &&
            (this.name == '' || user.name.includes(this.name)) &&
            (this.email == '' || user.email.includes(this.email)) &&
            (this.phone == '' || user.phone.includes(this.phone))
          "
        >
          <th scope="row" class="text-center">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import { getUsers } from "@/API/userAPI";

export default {
  mounted() {
    this.getUsers();
  },
  data: () => ({
    users: [],
    name: "",
    email: "",
    phone: "",
    isModal: "",
    removed: false,
  }),
  methods: {
    async getUsers() {
      let _users = await getUsers();
      console.log(_users);
      if (_users.status == "ok") this.users = _users.value;
      else window.alert(_users.value);
    },
  },
};
</script>
<style src="../table.css"></style>
