<template>
  <div>
    <div class="modal-overlay" v-if="this.id">
      <div class="modal-content3 bodyModal text-center">
        <div class="mb-4 row"><h1>Edit animal card</h1></div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Animal</label>
          <select class="col col-8" id="mySelect" v-model="animal">
            <option value="" disabled selected>Выберите...</option>
            <option
              v-for="animal in animals"
              :key="animal.id"
              :value="animal.id"
            >
              {{ animal.kind_of_animal }}
            </option>
          </select>
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Birthday</label>
          <input type="date" class="col col-8" v-model="birthday" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Aviary number</label>
          <input type="number" class="col col-8" v-model="aviary_number" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Moniker</label>
          <input class="col col-8" v-model="moniker" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Food</label>
          <input class="col col-8" v-model="food" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Description</label>
          <textarea
            type="ltext"
            class="col col-8"
            v-model="description"
          ></textarea>
        </div>

        <div class="mb-4 row">
          <label class="col col-4 lab">Upload a photo</label>
          <label id="labelFiles" for="files" class="col col-4 text-center"
            >Overview</label
          >
          <input
            id="files"
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="col col-1"
            style="visibility: hidden"
          />
          <img
            :src="imageUrl"
            v-if="imageUrl"
            alt="Uploaded Image"
            class="imgAnimal col col-2"
          />
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
import { Update } from "@/api/animalCardAPI";
import "../modal.css";
import { getAnimals } from "@/api/animalAPI";
import { useVuelidate } from "@vuelidate/core";
import { required, integer, maxValue, minValue } from "@vuelidate/validators";

const isFutureDate = (value) => {
  if (!value) return false;
  const inputDate = new Date(value);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  return inputDate <= currentDate;
};

export default {
  data() {
    return {
      imageUrl: null,
      photo: null,
      animals: null,
      animal: null,
      aviary_number: null,
      birthday: null,
      moniker: null,
      description: null,
      food: null,
    };
  },
  validations() {
    return {
      animal: { required },
      birthday: {
        required,
        isFutureDate,
      },
      aviary_number: { required, integer },
      moniker: { required },
      food: { required },
      description: { required },
      imageUrl: { required },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    id: Object,
  },
  async mounted() {
    this.id.birthday = this.id.birthday.replace("T00:00:00.000Z", "");
    this.imageUrl =
      import.meta.env.VITE_URL_SERVER + "/uploads/" + this.id.photo;
    this.animal = this.id.animal;
    this.aviary_number = this.id.aviarynumber;
    this.birthday = this.id.birthday;
    this.moniker = this.id.moniker;
    this.description = this.id.description;
    this.food = this.id.food;
    const animalIn = await getAnimals();
    if (animalIn.status == "error") {
      window.alert(error.message);
      return;
    } else
      this.animals = animalIn.message.filter((animal) => animal.removed == 0);
  },

  methods: {
    valid() {
      let error = "";
      if (this.v$.animal.$invalid)
        error +=
          "Warning - invalid data, user must choose the type of animal.\n";
      if (this.v$.birthday.$invalid)
        error +=
          "Warning - invalid data, user must input the animal birthday date.\n";
      if (this.v$.aviary_number.$invalid)
        error +=
          "Warning - invalid data, user must input the animal aviary number.\n";
      if (this.v$.moniker.$invalid)
        error +=
          "Warning - invalid data, user must input the animal moniker.\n";
      if (this.v$.food.$invalid)
        error += "Warning - invalid data, user must list the animal food.\n";
      if (this.v$.description.$invalid)
        error +=
          "Warning - invalid data, user must input the animal description.\n";
      if (this.v$.imageUrl.$invalid)
        error +=
          "Warning - invalid data, user must upload a photo of the animal.";
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
      let newAnimalCard = {
        ...(this.imageUrl !=
          import.meta.env.VITE_URL_SERVER + "/uploads/" + this.id.photo && {
          photo: this.photo,
        }),
        ...(this.animal != this.id.animal && { animal: this.animal }),
        ...(this.aviary_number != this.id.aviarynumber && {
          aviarynumber: this.aviary_number,
        }),
        ...(this.birthday != this.id.birthday && { birthday: this.birthday }),
        ...(this.moniker != this.id.moniker && { moniker: this.moniker }),
        ...(this.description != this.id.description && {
          description: this.description,
        }),
        ...(this.food != this.id.food && { food: this.food }),
      };

      if (Object.keys(newAnimalCard).length == 0) {
        this.cancel();
        return;
      }
      const error = await Update(this.id.id, newAnimalCard);
      if (error.status == "error") {
        window.alert(error.message);
        return;
      }
      if ("photo" in newAnimalCard) newAnimalCard.photo = error.message;
      this.$emit("setIsModal1", "");
      this.$emit("update", this.id.id, newAnimalCard);
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.photo = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style>
#labelFiles {
  padding: 5px;
  font-size: 24px;
  border: 1px solid #fca311;
  border-radius: 15px;
  color: white;
  width: 120px;
  height: 50px;
}
</style>
