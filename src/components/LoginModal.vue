<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal text-center">
        <div class="mb-4 row"><h1>Authorization</h1></div>
        <div class="row mx-5">
          <input placeholder="Login" v-model="this.email" />
        </div>
        <div class="row mx-5 my-4">
          <input
            placeholder="Password"
            type="password"
            v-model="this.password"
          />
        </div>
        <div class="row mb-4">
          <a class="col col-7" @click="registration">Registration</a>
          <button class="col col-3 actBtn" @click="loginInWeb">Login</button>
        </div>

        <div v-if="this.error" class="mt-5 mx-5 row error">
          {{ this.error }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Authorization } from "@/api/userAPI";
import "../modal.css";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },

  methods: {
    async loginInWeb() {
      const error = await Authorization(this.email, this.password);
      if (error) {
        this.error = error;
        return;
      }
      this.$emit("setIsModal", "");
    },
    registration() {
      this.$emit("setIsModal", "RegistModal");
    },
  },
};
</script>

<style></style>
