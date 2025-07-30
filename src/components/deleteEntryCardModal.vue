<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content2 bodyModal text-center">
        <div class="mb-5">
          <h1>Are you sure want</h1>
          <h1>to delete your</h1>
          <h1>entry?</h1>
        </div>

        <div class="row">
          <button class="col col-4 actBtn" @click="yes">Yes</button>
          <div class="col col-4"></div>
          <button class="col col-4 actBtn" @click="this.no">No</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../modal.css";
import { DeleteAnimalCard } from "@/api/animalCardAPI";
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      lo: false,
    };
  },

  methods: {
    async yes() {
      await DeleteAnimalCard(this.id);
      this.$emit("update", this.id, { removed: true });
      this.$emit("setIsModal1", "");
    },
    no() {
      this.$emit("setIsModal1", "");
    },
  },
};
</script>

<style></style>
