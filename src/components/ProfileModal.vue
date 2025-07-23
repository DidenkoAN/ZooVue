<template>
  <div>
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
            <div class="col col-3"></div>
            <button class="col col-3 mx-3 actBtn">Cancel</button>
            <button class="col col-5 actBtn">Delete profile</button>
          </div>
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
};
</script>
<style></style>
