<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal">
        <div class="mb-4 row text-center"><h1>Update animal</h1></div>
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
import { Update } from "@/api/animalAPI";

export default {
  data() {
    return {
      type: "",
      description: "",
    };
  },
  props: {
    id: Object,
  },
  mounted() {
    this.type = this.id.kind_of_animal;
    this.description = this.id.description;
  },
  methods: {
    cancel() {
      this.$emit("setIsModal1", "");
    },
    async apply() {
      let newAnimal = {
        ...(this.type != this.id.kind_of_animal && {
          kind_of_animal: this.type,
        }),
        ...(this.description != this.id.description && {
          description: this.description,
        }),
      };
      if (Object.keys(newAnimal).length == 0) {
        this.cancel();
        return;
      }

      await Update(this.id.id, newAnimal);
      this.$emit("setIsModal1", "");
      this.$emit("update", this.id.id, newAnimal);
    },
  },
};
</script>
<style></style>
