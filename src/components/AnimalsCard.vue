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
      <div class="col col-3"><h3>Animals Card</h3></div>
      <div class="col col-1">
        <button class="actBtn" @click="add">Add</button>
      </div>
      <div class="col col-6">
        <button v-if="!this.removed" @click="this.isRemoved" class="actBtn">
          Removed
        </button>
        <button v-else @click="this.isRemoved" class="actBtn">Existing</button>
      </div>
    </div>
    <div class="row pt-5 pb-3 text-center">
      <div class="col col-4">
        <label class="col col-4">Aviary number</label>
        <input type="number" class="col col-4" v-model="this.aviary_number" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Moniker</label>
        <input type="text" class="col col-4" v-model="this.moniker" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Food</label>
        <input type="text" class="col col-4" v-model="this.food" />
      </div>
    </div>

    <div>
      <table class="my-3 container text-center">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">aviary number</th>
            <th scope="col">animal</th>
            <th scope="col">birthday</th>
            <th scope="col">moniker</th>
            <th scope="col">description</th>
            <th scope="col">food</th>
            <th scope="col" v-if="!this.removed">actions</th>
          </tr>
        </thead>
        <tbody v-if="this.datas != []" v-for="data in this.datas">
          <tr
            v-if="
              data.removed == this.removed &&
              (this.aviary_number == '' ||
                data.aviarynumber.toString().includes(this.aviary_number)) &&
              (this.moniker == '' || data.moniker.includes(this.moniker)) &&
              (this.food == '' || data.food.includes(this.food))
            "
          >
            <th class="col" scope="row">{{ data.id }}</th>
            <td class="col">{{ data.aviarynumber }}</td>
            <td class="col">{{ data.Animal.kind_of_animal }}</td>
            <td class="col">{{ data.birthday }}</td>
            <td class="col">{{ data.moniker }}</td>
            <td class="col">{{ data.description }}</td>
            <td class="col">{{ data.food }}</td>
            <td class="col" v-if="!this.removed">
              <div class="row">
                <div class="col col-6">
                  <button @click="this.updateM(data.id)">U</button>
                </div>
                <div class="col col-6">
                  <button @click="this.deleteAnimalCard(data.id)">R</button>
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
import { getAnimalCards } from "@/api/animalCardAPI";
import AddAnimalsCardModal from "./AddAnimalsCardModal.vue";
import DeleteEntryCardModal from "./deleteEntryCardModal.vue";
import UpdateAnimalsCardModal from "./UpdateAnimalsCardModal.vue";
export default {
  components: {
    AddAnimalsCardModal,
    DeleteEntryCardModal,
    UpdateAnimalsCardModal,
  },
  data() {
    return {
      isModal: "",
      datas: [],
      removed: false,
      id: 0,
      aviary_number: "",
      moniker: "",
      food: "",
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    setIsModal1(_isModal) {
      this.isModal = _isModal;
    },

    async start() {
      this.datas = await getAnimalCards();
      console.log(this.datas);
    },

    add() {
      this.isModal = "AddAnimalsCardModal";
    },

    deleteAnimalCard(id) {
      this.id = id;
      this.isModal = "DeleteEntryCardModal";
    },

    setDatas(_data) {
      this.datas.push(_data);
    },
    update(id, mas) {
      for (let key in mas) {
        this.datas[this.datas.findIndex((item) => item.id === id)][key] =
          mas[key];
      }
    },

    updateM(id) {
      this.id = this.datas[this.datas.findIndex((item) => item.id === id)];
      this.isModal = "UpdateAnimalsCardModal";
    },
    isRemoved() {
      this.removed = !this.removed;
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
