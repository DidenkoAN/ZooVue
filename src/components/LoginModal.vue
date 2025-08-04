<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal text-center">
        <div class="mb-4 row"><h1>Authorization</h1></div>
        <div class="row mx-5">
          <input placeholder="E-mail" v-model="this.email" />
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
import { useVuelidate } from "@vuelidate/core";
import { required, integer, maxValue, minValue } from "@vuelidate/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  validations() {
    return {
      email: { required },
      password: { required },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },

  methods: {
    async loginInWeb() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        this.error = "Not all data is filled in";
        return;
      }
      const dataAPI = await Authorization(this.email, this.password);
      if (dataAPI.status == "error") {
        this.error = dataAPI.message;
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
