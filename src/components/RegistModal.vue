<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal">
        <div class="mb-4 row text-center"><h1>Registration</h1></div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Name</label>
          <input class="col col-8" v-model="this.name" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Password</label>
          <input type="password" class="col col-8" v-model="this.password" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">E-mail</label>
          <input class="col col-8" v-model="this.email" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Phone</label>
          <input class="col col-8" v-model="this.phone" />
        </div>
        <div class="row">
          <div class="col col-5"></div>
          <button class="col col-3 mx-3 actBtn" @click="login">Cancel</button>
          <button class="col col-3 actBtn" @click="regist">OK</button>
        </div>

        <div v-if="this.errors.length > 0" class="mt-5">
          <label v-for="error in this.errors" class="row text-start error">{{
            error
          }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Registration } from "@/api/userAPI";
import "../modal.css";

export default {
  data() {
    return {
      name: "",
      password: "",
      email: "",
      phone: "",
      errors: [],
    };
  },
  methods: {
    login() {
      this.$emit("setIsModal", "LoginModal");
    },
    loginInWeb() {
      this.$emit("setIsModal", "", true);
    },
    valid() {
      this.errors = [];
      if (this.name == "") this.errors.push("Name not specified");

      if (
        !(
          /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
            this.password
          ) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.password)
        )
      ) {
        this.errors.push(
          "The password must contain at least 8 characters long, uppercase\n and lowercase Latin letter, digit and a special character."
        );
      }

      // if (password.value != password1.value) {
      //   error =
      //     "Error in password confirmation.\nThe passwords you entered do not match\n\n";
      //   createError(password1, error);
      // }
      if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(this.email)) {
        this.errors.push(
          "The email can contain only Latin characters or digits, and '@'."
        );
      }

      if (!/^\+?[1-9][0-9]{9,10}$/.test(this.phone)) {
        this.errors.push(
          "The phone can contain only digits and '+' at the beginning.\n The phone number must consist of 11 number."
        );
      } else if (this.phone.charAt(0) == "8") {
        this.phone = this.phone.replace(/^8/, "+7");
      }
    },
    async regist() {
      // this.valid();
      const error = await Registration(
        this.name,
        this.password,
        this.email,
        this.phone
      );
      if (!error) this.$emit("setIsModal", "");
    },
  },
};
</script>
<style></style>
