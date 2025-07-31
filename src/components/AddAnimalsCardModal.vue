<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content3 bodyModal text-center">
        <div class="mb-4 row"><h1>Add animal card</h1></div>
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
import { Add } from "@/api/animalCardAPI";
import { getAnimals } from "@/api/animalAPI";
import "../modal.css";
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
  async mounted() {
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
      if (this.animal == null) error += "Animal not selected. ";
      if (isNaN(Date.parse(this.birthday))) error += "Invalid date. ";
      if (typeof this.aviary_number != "number")
        error += "Invalid aviary number. ";
      if (this.moniker == null) error += "Moniker is not filled. ";
      if (this.food == null) error += "Food is not filled. ";
      if (this.description == null) error += "Description is not filled. ";
      if (this.imageUrl == null) error += "Image not selected. ";
      if (error != "") {
        window.alert(error);
        return false;
      }
      return true;
    },
    cancel() {
      this.$emit("setIsModal1", "");
    },
    async apply() {
      if (!this.valid()) return;
      const animalCard = await Add(
        this.photo,
        this.animal,
        this.aviary_number,
        this.birthday,
        this.moniker,
        this.description,
        this.food
      );
      if (animalCard.status == "error") {
        window.alert(animalCard.message);
        return;
      }
      this.$emit("setIsModal1", "");
      let newAnimalCard = animalCard.message;
      let animal = this.animals.find(
        (animal) => animal.id == newAnimalCard.animal
      );
      this.$emit("setDatas", { ...newAnimalCard, Animal: animal });
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

#files {
}
</style>
