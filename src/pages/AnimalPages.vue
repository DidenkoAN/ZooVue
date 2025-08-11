<template>
  <div class="mx-5 my-5">
    <label>Animal</label>
    <v-btn class="btn1 mx-5" @click="addAnimal.showModal = true">Add</v-btn>
    <v-btn v-if="!removed" class="btn1 mx-5" @click="removed = true"
      >Removed</v-btn
    >
    <v-btn v-else class="btn1 mx-5" @click="removed = false">Existing</v-btn>
  </div>

  <div>
    <v-row class="mag">
      <v-col>
        <v-row>
          <v-col cols="4" class="text-center">
            <label>Kind of animal</label></v-col
          >
          <v-col cols="8"
            ><v-text-field
              variant="solo"
              v-model="filterAnimal.kind_of_animal"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-col cols="4" class="text-center">
            <label>Description</label></v-col
          >
          <v-col cols="8"
            ><v-text-field
              variant="solo"
              v-model="filterAnimal.description"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
  <div class="mag">
    <v-table class="text-center">
      <thead>
        <tr class="row">
          <th class="col col-1 text-center">id</th>
          <th class="col col-3 text-center">kind of animal</th>
          <th class="col col-5 text-center">description</th>
          <th v-if="!this.removed" class="col col-3 text-center">actions</th>
        </tr>
      </thead>
      <tbody v-if="this.animal != []" v-for="animal in this.animals">
        <tr
          class="row"
          v-if="
            animal.removed == this.removed &&
            (this.filterAnimal.kind_of_animal == '' ||
              animal.kind_of_animal.includes(
                this.filterAnimal.kind_of_animal
              )) &&
            (this.filterAnimal.description == '' ||
              animal.description.includes(this.filterAnimal.description))
          "
        >
          <th class="col col-1 text-center">{{ animal.id }}</th>
          <td class="col col-3">{{ animal.kind_of_animal }}</td>
          <td class="col col-5">{{ animal.description }}</td>
          <td class="col col-3" v-if="!this.removed">
            <v-row>
              <v-col cols="6">
                <v-img
                  class="icon"
                  @click="selectEdit(animal)"
                  src="../icon/edit.png"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-img
                  class="icon"
                  @click="selectDelete(animal)"
                  src="../icon/delete.png"
                ></v-img
              ></v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>

  <!-- delete -->
  <v-container>
    <v-dialog v-model="dialogDelete" max-width="250px" persistent>
      <v-card class="px-5 py-3 color2">
        <v-card-text class="text-center lbl1">
          Are you sure want to delete the entry?
        </v-card-text>
        <v-card-actions>
          <v-col cols="6" class="text-center">
            <v-btn class="btn1" @click="this.delete">Yea</v-btn></v-col
          >
          <v-col cols="6" class="text-center"
            ><v-btn class="btn1" @click="dialogDelete = false">No</v-btn></v-col
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Add -->
  <v-container>
    <v-dialog v-model="addAnimal.showModal" max-width="500px" persistent>
      <v-card class="px-5 color2">
        <v-card-title class="lbl1 title text-center">Add animal</v-card-title>
        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Type</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field
              variant="solo"
              v-model="addAnimal.kind_of_animal"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.kind_of_animal.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.kind_of_animal.message
          }}</label>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Description</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-textarea
              rows="3"
              variant="solo"
              v-model="this.addAnimal.description"
            >
            </v-textarea>
          </v-col>
        </v-row>
        <v-row v-if="this.error.description.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.description.message
          }}</label>
        </v-row>
        <v-card-actions class="mb-5">
          <v-btn class="btn1" @click="closeModal(addAnimal)">Cancel</v-btn>
          <v-btn class="btn1" @click="add">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Edit -->
  <v-container>
    <v-dialog v-model="editAnimal.showModal" max-width="500px" persistent>
      <v-card class="px-5 py-3 color2">
        <v-card-title class="lbl1 text-center title">Edit animal</v-card-title>
        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal type</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field variant="solo" v-model="editAnimal.kind_of_animal">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.kind_of_animal.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.kind_of_animal.message
          }}</label>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal description</label></v-col
          >
          <v-col cols="8" class="nopad"
            ><v-textarea
              variant="solo"
              v-model="editAnimal.description"
            ></v-textarea
          ></v-col>
          <v-row v-if="this.error.description.status"
            ><label class="lbl1 mb-10 ml-6">{{
              this.error.description.message
            }}</label>
          </v-row>
        </v-row>
        <v-card-actions>
          <v-btn class="btn1" @click="closeModal(editAnimal)">Cancel</v-btn>
          <v-btn class="btn1" @click="edit">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import {
  getAnimals,
  addAnimal,
  deleteAnimal,
  editAnimal,
} from "@/API/animalAPI";
import { existing } from "@/Validation";

export default {
  data: () => ({
    animals: [],
    selectAnimal: null,
    filterAnimal: { kind_of_animal: "", description: "" },
    addAnimal: { kind_of_animal: "", description: "", showModal: false },
    editAnimal: { kind_of_animal: "", description: "", showModal: false },
    error: {
      kind_of_animal: {
        status: false,
        message: "Warning - invalid data, user must input the type of animal.",
      },
      description: {
        status: false,
        message:
          "Warning - invalid data, user must fill the animal description.",
      },
    },
    removed: false,
    dialogDelete: false,
  }),
  mounted() {
    this.getAnimals();
  },
  methods: {
    async getAnimals() {
      let _animals = await getAnimals();
      if (_animals.status == "ok") this.animals = _animals.value;
      else window.alert(_animals.value);
    },

    selectDelete(animal) {
      this.selectAnimal = animal;
      this.dialogDelete = true;
    },
    selectEdit(animal) {
      this.selectAnimal = animal;
      this.editAnimal.description = this.selectAnimal.description;
      this.editAnimal.kind_of_animal = this.selectAnimal.kind_of_animal;
      this.editAnimal.showModal = true;
    },

    Valid(kind_of_animal, description) {
      this.error.kind_of_animal.status = !existing(kind_of_animal);
      this.error.description.status = !existing(description);

      return this.error.kind_of_animal.status || this.error.description.status;
    },

    closeModal(modal) {
      modal.showModal = false;
      this.error.kind_of_animal.status = false;
      this.error.description.status = false;
      this.clearAnimal();
    },

    async add() {
      if (this.Valid(this.addAnimal.kind_of_animal, this.addAnimal.description))
        return;
      let _animal = await addAnimal(
        this.addAnimal.kind_of_animal,
        this.addAnimal.description
      );
      if (_animal.status != "ok") {
        window.alert(_animal.value);
        return;
      }
      this.animals.push(_animal.value);
      this.addAnimal.showModal = false;
      this.clearAnimal();
    },

    clearAnimal() {
      this.addAnimal.kind_of_animal = "";
      this.addAnimal.description = "";
    },

    delete() {
      deleteAnimal(this.selectAnimal.id);
      this.selectAnimal.removed = true;
      this.dialogDelete = false;
    },

    async edit() {
      if (
        this.Valid(this.editAnimal.kind_of_animal, this.editAnimal.description)
      )
        return;

      let newAnimal = {
        ...(this.selectAnimal.kind_of_animal !=
          this.editAnimal.kind_of_animal && {
          kind_of_animal: this.editAnimal.kind_of_animal,
        }),
        ...(this.selectAnimal.description != this.editAnimal.description && {
          description: this.editAnimal.description,
        }),
      };
      if (Object.keys(newAnimal).length == 0) {
        this.closeModal(this.editAnimal);
        return;
      }

      const _animal = await editAnimal(this.selectAnimal.id, newAnimal);
      if (_animal.status == "error") {
        window.alert(_animal.value);
        return;
      }

      for (let key in newAnimal) {
        this.selectAnimal[key] = newAnimal[key];
      }
      this.closeModal(this.editAnimal);
    },
  },
};
</script>
<style></style>
