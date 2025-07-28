<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal">
        <div class="mb-4 row text-center"><h1>Add animal</h1></div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Type</label>
          <input class="col col-8" v-model="this.type" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Description</label>
          <textarea
            type="ltext"
            class="col col-8"
            v-model="this.description"
          ></textarea>
        </div>
        <div class="row">
          <div class="col col-5"></div>
          <button class="col col-3 mx-3 actBtn" @click="this.cancel">
            Cancel
          </button>
          <button class="col col-3 actBtn" @click="this.apply">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Add } from "@/api/animalAPI";

export default {
  data() {
    return {
      type: "",
      description: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("setIsModal1", "");
    },
    async apply() {
      const animal = await Add(this.type, this.description);
      this.$emit("setIsModal1", "");
      this.$emit("setDatas", animal);
    },
  },
};
</script>
<style></style>
