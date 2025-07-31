<template>
  <div v-if="this.user">
    <div class="modal-overlay">
      <div class="modal-content1">
        <div class="fotterModal p-3">
          <div class="row">
            <h1 class="lab col col-4">Nikname</h1>
            <h6 class="col col-8 mt-3">id 1345253</h6>
          </div>
        </div>
        <div class="bodyModal">
          <div class="mb-4 row">
            <label class="col col-4 lab">Name</label>
            <input class="col col-8" disabled v-model="this.user.name" />
          </div>

          <div class="mb-4 row">
            <label class="col col-4 lab">E-mail</label>
            <input class="col col-8" disabled v-model="this.user.email" />
          </div>
          <div class="mb-4 row">
            <label class="col col-4 lab">Phone</label>
            <input class="col col-8" disabled v-model="this.user.phone" />
          </div>
          <div class="row">
            <div class="col col-3"></div>
            <button class="col col-3 mx-3 actBtn" @click="cancel">
              Cancel
            </button>
            <button class="col col-5 actBtn" @click="deleteProfile">
              Delete profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DeleteProfile } from "@/api/userAPI";
import "../modal.css";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    cancel() {
      this.$emit("setIsModal", "");
    },
    async deleteProfile() {
      const error = await DeleteProfile();
      if (error) {
        window.alert(error.message);
        return;
      }
      this.$emit("setIsModal", "LoginModal");
    },
  },

  mounted() {
    const userData = localStorage.getItem("user");
    if (userData) this.user = JSON.parse(userData);
  },
};
</script>
<style></style>
