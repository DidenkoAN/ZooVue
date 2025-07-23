<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal text-center">
        <div class="mb-4 row"><h1>Authorization</h1></div>
        <div class="row mx-5"><input placeholder="Login" /></div>
        <div class="row mx-5 my-4">
          <input placeholder="Password" type="password" />
        </div>
        <div class="row mb-4">
          <a class="col col-7" @click="registration">Registration</a>
          <button class="col col-3 actBtn" @click="loginInWeb">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../modal.css";
export default {
  data() {
    return {
      lo: false,
    };
  },

  methods: {
    loginInWeb() {
      this.$emit("setIsModal", "", true);
    },
    registration() {
      this.$emit("setIsModal", "RegistModal");
    },
  },
};
</script>

<style></style>
