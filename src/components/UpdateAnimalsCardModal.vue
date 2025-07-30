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
  props: {
    id: Object,
  },
  async mounted() {
    this.id.birthday = this.id.birthday.replace("T00:00:00.000Z", "");
    this.imageUrl = "http://localhost:5000/uploads/" + this.id.photo;
    this.animal = this.id.animal;
    this.aviary_number = this.id.aviarynumber;
    this.birthday = this.id.birthday;
    this.moniker = this.id.moniker;
    this.description = this.id.description;
    this.food = this.id.food;
    this.animals = await getAnimals();
  },

  methods: {
    cancel() {
      this.$emit("setIsModal1", "");
    },
    async apply() {
      await Add(
        this.photo,
        this.animal,
        this.aviary_number,
        this.birthday,
        this.moniker,
        this.description,
        this.food
      );
    },
    async apply() {
      let newAnimal = {
        ...(this.imageUrl !=
          "http://localhost:5000/uploads/" + this.id.photo && {
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
      if (Object.keys(newAnimal).length == 0) {
        this.cancel();
        return;
      }

      await Update(this.id.id, newAnimal);
      this.$emit("setIsModal1", "");
      this.$emit("update", this.id.id, newAnimal);
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
