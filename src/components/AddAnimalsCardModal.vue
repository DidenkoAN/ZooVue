<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal text-center">
        <div class="mb-4 row"><h1>Add animal card</h1></div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Animal type</label>
          <input type="text" class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Animal birthday</label>
          <input type="date" class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Aviary number</label>
          <input type="number" class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Moniker</label>
          <input type="password" class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Animal food</label>
          <input type="password" class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Description</label>
          <textarea type="ltext" class="col col-8"></textarea>
        </div>

        <div class="mb-4 row">
          <label class="col col-4 lab">Upload a photo</label>
          <button class="col col-4">Overview</button>
          <img src="" alt="" />
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
