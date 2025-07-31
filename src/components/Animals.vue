<template>
  <component
    v-if="isModal != ''"
    :is="isModal"
    :id="this.id"
    @setDatas="setDatas"
    @setIsModal1="setIsModal1"
    @update="update"
  />

  <div class="container">
    <div class="row pb-5">
      <div class="col col-3"><h3>Animals</h3></div>
      <div class="col col-1">
        <button class="actBtn" @click="this.add">Add</button>
      </div>
      <div class="col col-6">
        <button v-if="!this.removed" @click="this.isRemoved" class="actBtn">
          Removed
        </button>
        <button v-else @click="this.isRemoved" class="actBtn">Existing</button>
      </div>
    </div>
    <div class="row pt-5 pb-3 text-center">
      <div class="col col-6">
        <label class="col col-4">Kind of animal</label>
        <input type="text" class="col col-4" v-model="this.kind_of_animal" />
      </div>
      <div class="col col-6">
        <label class="col col-4">Description</label>
        <input type="text" class="col col-4" v-model="this.description" />
      </div>
    </div>

    <div>
      <table class="my-3 container text-center">
        <thead>
          <tr class="row">
            <th class="col col-1" scope="col">id</th>
            <th class="col col-3" scope="col">kind of animal</th>
            <th class="col col-5" scope="col">description</th>
            <th v-if="!this.removed" class="col col-3" scope="col">actions</th>
          </tr>
        </thead>
        <tbody v-if="this.datas != []" v-for="data in this.datas">
          <tr
            class="row"
            v-if="
              data.removed == this.removed &&
              (this.kind_of_animal == '' ||
                data.kind_of_animal.includes(this.kind_of_animal)) &&
              (this.description == '' ||
                data.description.includes(this.description))
            "
          >
            <th class="col col-1" scope="row">{{ data.id }}</th>
            <td class="col col-3">{{ data.kind_of_animal }}</td>
            <td class="col col-5">{{ data.description }}</td>
            <td class="col col-3" v-if="!this.removed">
              <div class="row">
                <div class="col col-6">
                  <button @click="this.updateM(data.id)">U</button>
                </div>
                <div class="col col-6">
                  <button @click="this.deleteAnimal(data.id)">R</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { getAnimals } from "@/api/animalAPI";
import AddAnimalModal from "./AddAnimalModal.vue";
import DeleteEntryModal from "./deleteEntryModal.vue";
import UpdateAnimalModal from "./UpdateAnimalModal.vue";
export default {
  components: {
    AddAnimalModal,
    DeleteEntryModal,
    UpdateAnimalModal,
  },
  data() {
    return {
      isModal: "",
      datas: [],
      kind_of_animal: "",
      description: "",
      removed: false,
      id: 0,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    setIsModal1(_isModal) {
      this.isModal = _isModal;
    },

    setDatas(_data) {
      console.log(_data, this.datas);
      this.datas.push(_data);
    },
    async start() {
      const data = await getAnimals();
      if (data.status == "ok") this.datas = data.message;
      else window.alert(data.message);
    },
    add() {
      this.isModal = "AddAnimalModal";
    },

    isRemoved() {
      this.removed = !this.removed;
    },

    deleteAnimal(id) {
      this.id = id;
      this.isModal = "DeleteEntryModal";
    },
    update(id, mas) {
      for (let key in mas) {
        this.datas[this.datas.findIndex((item) => item.id === id)][key] =
          mas[key];
      }
    },

    updateM(id) {
      this.id = this.datas[this.datas.findIndex((item) => item.id === id)];
      this.isModal = "UpdateAnimalModal";
    },
  },
};
</script>
<style>
th,
td {
  background-color: #4c5c81;
  border: 1px solid white;
  padding: 8px;
}
</style>
