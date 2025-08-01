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
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  data() {
    return {
      type: "",
      description: "",
    };
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
    cancel() {
      this.$emit("setIsModal1", "");
    },

    valid() {
      let error = "";
      if (this.v$.type.$invalid)
        error +=
          "Type is not filled. \nWarning - invalid data, user must input the type of animal.\n\n";
      if (this.v$.description.$invalid)
        error +=
          "Type is not filled. \nWarning - invalid data, user must fill the animal description.";
      window.alert(error);
    },
    async apply() {
      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        this.valid();
        return;
      }
      const animal = await Add(this.type, this.description);
      if (animal.status == "error") {
        window.alert(animal.message);
        return;
      }
      this.$emit("setIsModal1", "");
      this.$emit("setDatas", animal.message);
    },
  },
};
</script>
<style></style>
