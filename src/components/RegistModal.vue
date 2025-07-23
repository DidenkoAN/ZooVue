<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal">
        <div class="mb-4 row text-center"><h1>Registration</h1></div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Name</label>
          <input class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Password</label>
          <input type="password" class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">E-mail</label>
          <input class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Phone</label>
          <input class="col col-8" />
        </div>
        <div class="row">
          <div class="col col-5"></div>
          <button class="col col-3 mx-3 actBtn" @click="login">Cancel</button>
          <button class="col col-3 actBtn" @click="loginInWeb">OK</button>
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
    login() {
      this.$emit("setIsModal", "LoginModal");
    },
    loginInWeb() {
      this.$emit("setIsModal", "", true);
    },
  },
};
</script>
<style></style>
