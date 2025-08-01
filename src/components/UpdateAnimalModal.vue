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
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
  validations() {
    return {
      type: { required },
      description: { required },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    valid() {
      let error = "";
      if (this.v$.type.$invalid)
        error +=
          "Warning - invalid data, user must input the type of animal.\n";
      if (this.v$.description.$invalid)
        error +=
          "Warning - invalid data, user must fill the animal description.";
      window.alert(error);
    },
    cancel() {
      this.$emit("setIsModal1", "");
    },
    async apply() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        this.valid();
        return;
      }
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
      const error = await Update(this.id.id, newAnimal);
      if (error) {
        window.alert(error.message);
        return;
      }
      this.$emit("setIsModal1", "");
      this.$emit("update", this.id.id, newAnimal);
    },
  },
};
</script>
<style></style>
