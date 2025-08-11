<template>
  <div class="mx-3 my-5">
    <label>Animal Card</label>
    <v-btn class="btn1 mx-5" @click="addAnimalCard.showModal = true">Add</v-btn>
    <v-btn v-if="!removed" class="btn1" @click="removed = true">Removed</v-btn>
    <v-btn v-else class="btn1" @click="removed = false">Existing</v-btn>
  </div>

  <div>
    <v-row class="mag">
      <v-col>
        <v-row>
          <v-col cols="5" class="text-center">
            <label>Aviary number</label></v-col
          >
          <v-col cols="7"
            ><v-text-field
              variant="solo"
              v-model="filterAnimalCard.aviaryNumber"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-col cols="4" class="text-center"> <label>Moniker</label></v-col>
          <v-col cols="8"
            ><v-text-field
              variant="solo"
              v-model="filterAnimalCard.moniker"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-row>
          <v-col cols="4" class="text-center"> <label>Food</label></v-col>
          <v-col cols="8"
            ><v-text-field
              variant="solo"
              v-model="filterAnimalCard.food"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
  <div class="mag">
    <v-table class="text-center">
      <thead>
        <tr>
          <th class="text-center">id</th>
          <th class="text-center">aviary number</th>
          <th class="text-center">animal</th>
          <th class="text-center">birthday</th>
          <th class="text-center">moniker</th>
          <th class="text-center">description</th>
          <th class="text-center">food</th>
          <th class="text-center" v-if="!this.removed">actions</th>
        </tr>
      </thead>
      <tbody
        v-if="this.animalCard != []"
        v-for="animalCard in this.animalCards"
      >
        <tr
          v-if="
            animalCard.removed == this.removed &&
            (this.filterAnimalCard.aviaryNumber == '' ||
              animalCard.aviary_number
                .toString()
                .includes(this.filterAnimalCard.aviaryNumber)) &&
            (this.filterAnimalCard.moniker == '' ||
              animalCard.moniker.includes(this.filterAnimalCard.moniker)) &&
            (this.filterAnimalCard.food == '' ||
              animalCard.food.includes(this.filterAnimalCard.food))
          "
        >
          <th class="text-center">{{ animalCard.id }}</th>
          <td>{{ animalCard.aviary_number }}</td>
          <td>{{ animalCard.Animal.kind_of_animal }}</td>
          <td>
            {{ animalCard.birthday.replace("T00:00:00.000Z", "") }}
          </td>
          <td>{{ animalCard.moniker }}</td>
          <td>{{ animalCard.description }}</td>
          <td>{{ animalCard.food }}</td>
          <td v-if="!this.removed">
            <v-row>
              <v-col cols="6">
                <v-img
                  class="icon"
                  @click="selectEdit(animalCard)"
                  src="../icon/edit.png"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-img
                  class="icon"
                  @click="selectDelete(animalCard)"
                  src="../icon/delete.png"
                ></v-img
              ></v-col>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
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
    <v-dialog v-model="addAnimalCard.showModal" max-width="500px" persistent>
      <v-card class="px-5 py-3 color2">
        <v-card-title class="lbl1 title text-center">
          Add animal card
        </v-card-title>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal type</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-select
              :items="animals"
              return-object
              v-model="addAnimalCard.animal"
              label="Select an animal"
              variant="solo"
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-if="this.error.animal.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.animal.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal birthday</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field
              variant="solo"
              v-model="addAnimalCard.birthday"
              type="date"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.birthday.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.birthday.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Aviary number</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field variant="solo" v-model="addAnimalCard.aviaryNumber">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.aviaryNumber.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.aviaryNumber.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Moniker</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field variant="solo" v-model="addAnimalCard.moniker">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.moniker.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.moniker.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal food</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field variant="solo" v-model="addAnimalCard.food">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.food.status"
          ><label class="lbl1 mb-10 ml-6">{{ this.error.food.message }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Description</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-textarea variant="solo" v-model="addAnimalCard.description">
            </v-textarea>
          </v-col>
        </v-row>
        <v-row v-if="this.error.description.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.description.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4"> <label class="lbl2">Upload a photo</label></v-col>
          <v-col cols="4 text-center">
            <v-btn @click="selectPhoto" class="buttonFiles"> Overview </v-btn>
          </v-col>
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            style="display: none"
            @change="onFileSelected"
          />
          <v-col cols="4" class="px-3 pb-5">
            <v-img
              v-if="addAnimalCard.url"
              :src="addAnimalCard.url"
              max-width="300"
            ></v-img>
          </v-col>
        </v-row>
        <v-row v-if="this.error.photo.status"
          ><label class="lbl1 mb-10 ml-6">{{ this.error.photo.message }}</label>
        </v-row>

        <v-card-actions class="pt-5">
          <v-btn class="btn1" @click="addAnimalCard.showModal = false"
            >Cancel</v-btn
          >
          <v-btn class="btn1" @click="add">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <!-- Edit -->
  <v-container>
    <v-dialog v-model="editAnimalCard.showModal" max-width="500px" persistent>
      <v-card class="px-5 py-3 color2">
        <v-card-title class="lbl1 title text-center">
          Edit animal card
        </v-card-title>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal type</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-select
              :items="animals"
              return-object
              v-model="editAnimalCard.animal"
              label="Выберите предмет"
              variant="solo"
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-if="this.error.animal.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.animal.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal birthday</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field
              variant="solo"
              v-model="editAnimalCard.birthday"
              type="date"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.birthday.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.birthday.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Aviary number</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field variant="solo" v-model="editAnimalCard.aviaryNumber">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.aviaryNumber.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.aviaryNumber.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Moniker</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field variant="solo" v-model="editAnimalCard.moniker">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.moniker.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.moniker.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Animal food</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-text-field variant="solo" v-model="editAnimalCard.food">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="this.error.food.status"
          ><label class="lbl1 mb-10 ml-6">{{ this.error.food.message }}</label>
        </v-row>

        <v-row>
          <v-col cols="4" class="text-center nopad">
            <label class="lbl2">Description</label>
          </v-col>
          <v-col cols="8" class="nopad">
            <v-textarea variant="solo" v-model="editAnimalCard.description">
            </v-textarea>
          </v-col>
        </v-row>
        <v-row v-if="this.error.description.status"
          ><label class="lbl1 mb-10 ml-6">{{
            this.error.description.message
          }}</label>
        </v-row>

        <v-row>
          <v-col cols="4"> <label class="lbl2">Upload a photo</label></v-col>
          <v-col cols="4 text-center">
            <v-btn @click="selectPhotoEdit" class="buttonFiles">
              Overview
            </v-btn>
          </v-col>
          <input
            type="file"
            ref="fileInputEdit"
            accept="image/*"
            style="display: none"
            @change="onFileSelectedEdit"
          />
          <v-col cols="4" class="px-3 pb-5">
            <v-img
              v-if="editAnimalCard.url"
              :src="editAnimalCard.url"
              max-width="300"
            ></v-img>
          </v-col>
        </v-row>
        <v-row v-if="this.error.photo.status"
          ><label class="lbl1 mb-10 ml-6">{{ this.error.photo.message }}</label>
        </v-row>

        <v-card-actions class="pt-5">
          <v-btn class="btn1" @click="editAnimalCard.showModal = false"
            >Cancel</v-btn
          >
          <v-btn class="btn1" @click="edit">Apply</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { getAnimals } from "@/API/animalAPI";
import {
  getAnimalCards,
  addAnimalCard,
  deleteAnimalCard,
  editAnimalCard,
} from "@/API/animalCardAPI";
import { date, existing, number } from "@/Validation";

export default {
  data: () => ({
    selectAnimalCard: null,
    animalCards: [],
    animals: [],
    filterAnimalCard: { aviaryNumber: "", moniker: "", food: "" },
    addAnimalCard: {
      animal: null,
      birthday: "",
      aviaryNumber: "",
      moniker: "",
      food: "",
      description: "",
      url: null,
      photo: null,
      showModal: false,
    },

    editAnimalCard: {
      animal: null,
      birthday: "",
      aviaryNumber: "",
      moniker: "",
      food: "",
      description: "",
      url: null,
      photo: null,
      showModal: false,
    },
    removed: false,
    dialogEdit: false,
    dialogDelete: false,
    imageUrl: null,

    error: {
      animal: {
        status: false,
        message: "Warning - invalid data, user must choose the type of animal.",
      },
      birthday: {
        status: false,
        message:
          "Warning - invalid data, user must input the animal birthday date.",
      },
      aviaryNumber: {
        status: false,
        message:
          "Warning - invalid data, user must input the animal aviary number.",
      },
      moniker: {
        status: false,
        message: "Warning - invalid data, user must input the animal moniker.",
      },
      food: {
        status: false,
        message: "Warning - invalid data, user must list the animal food.",
      },
      description: {
        status: false,
        message:
          "Warning - invalid data, user must input the animal description.",
      },
      photo: {
        status: false,
        message:
          "Warning - invalid data, user must upload a photo of the animal.",
      },
    },
  }),
  mounted() {
    this.getAnimalCards();
  },
  methods: {
    async getAnimalCards() {
      let _animalCards = await getAnimalCards();
      if (_animalCards.status == "ok") this.animalCards = _animalCards.value;
      else window.alert(_animalCards.value);
      console.log(this.animalCards);
      const animalIn = await getAnimals();
      if (animalIn.status == "error") {
        window.alert(error.value);
        return;
      } else
        this.animals = animalIn.value
          .filter((animal) => animal.removed == 0)
          .map((animal) => ({
            title: animal.kind_of_animal,
            value: animal.id,
          }));
    },

    selectPhoto() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      this.addAnimalCard.photo = file;
      if (file) {
        this.addAnimalCard.url = URL.createObjectURL(file);
      }
    },

    selectPhotoEdit() {
      this.$refs.fileInputEdit.click();
    },
    onFileSelectedEdit(event) {
      const file = event.target.files[0];
      this.editAnimalCard.photo = file;
      if (file) {
        this.editAnimalCard.url = URL.createObjectURL(file);
      }
    },

    selectDelete(animalCard) {
      this.selectAnimalCard = animalCard;
      this.dialogDelete = true;
    },

    delete() {
      deleteAnimalCard(this.selectAnimalCard.id);
      this.selectAnimalCard.removed = true;
      this.dialogDelete = false;
    },

    async edit() {
      if (
        this.Valid(
          this.editAnimalCard.animal,
          this.editAnimalCard.birthday,
          this.editAnimalCard.aviaryNumber,
          this.editAnimalCard.moniker,
          this.editAnimalCard.food,
          this.editAnimalCard.description,
          this.editAnimalCard.url
        )
      )
        return;
      let newAnimalCard = {
        ...(this.editAnimalCard.url !=
          process.env.VUE_APP_URL_SERVER +
            "/uploads/" +
            this.selectAnimalCard.photo && {
          photo: this.editAnimalCard.photo,
        }),
        ...(this.editAnimalCard.animal != this.selectAnimalCard.animal && {
          animal: this.editAnimalCard.animal.value,
        }),
        ...(this.editAnimalCard.aviaryNumber !=
          this.selectAnimalCard.aviary_number && {
          aviary_number: this.editAnimalCard.aviaryNumber,
        }),
        ...(this.editAnimalCard.birthday !=
          this.selectAnimalCard.birthday.replace("T00:00:00.000Z", "") && {
          birthday: this.editAnimalCard.birthday,
        }),
        ...(this.editAnimalCard.moniker != this.selectAnimalCard.moniker && {
          moniker: this.editAnimalCard.moniker,
        }),
        ...(this.editAnimalCard.description !=
          this.selectAnimalCard.description && {
          description: this.editAnimalCard.description,
        }),
        ...(this.editAnimalCard.food != this.selectAnimalCard.food && {
          food: this.editAnimalCard.food,
        }),
      };

      if (Object.keys(newAnimalCard).length == 0) {
        this.closeModal(this.editAnimalCard);
        return;
      }

      const _animalCard = await editAnimalCard(
        this.selectAnimalCard.id,
        newAnimalCard
      );
      if (_animalCard.status == "error") {
        window.alert(_animalCard.value);
        return;
      }

      if (_animalCard.value) newAnimalCard.photo = _animalCard.value;

      for (let key in newAnimalCard) {
        this.selectAnimalCard[key] = newAnimalCard[key];
      }
      this.closeModal(this.editAnimalCard);
    },

    selectEdit(animalCard) {
      this.selectAnimalCard = animalCard;
      this.editAnimalCard.animal = this.selectAnimalCard.animal;
      this.editAnimalCard.birthday = this.selectAnimalCard.birthday.replace(
        "T00:00:00.000Z",
        ""
      );
      this.editAnimalCard.aviaryNumber = this.selectAnimalCard.aviary_number;
      this.editAnimalCard.moniker = this.selectAnimalCard.moniker;
      this.editAnimalCard.food = this.selectAnimalCard.food;
      this.editAnimalCard.description = this.selectAnimalCard.description;
      this.editAnimalCard.url =
        process.env.VUE_APP_URL_SERVER +
        "/uploads/" +
        this.selectAnimalCard.photo;
      this.editAnimalCard.showModal = true;
    },

    closeModal(modal) {
      modal.showModal = false;
      this.error.animal.status = false;
      this.error.birthday.status = false;
      this.error.aviaryNumber.status = false;
      this.error.moniker.status = false;
      this.error.food.status = false;
      this.error.description.status = false;
      this.error.photo.status = false;
    },

    Valid(animal, birthday, aviaryNumber, moniker, food, description, photo) {
      this.error.animal.status = !existing(animal);
      this.error.birthday.status = !existing(birthday) || !date(birthday);
      this.error.aviaryNumber.status =
        !existing(aviaryNumber) || !number(aviaryNumber);
      this.error.moniker.status = !existing(moniker);
      this.error.food.status = !existing(food);
      this.error.description.status = !existing(description);
      this.error.photo.status = !existing(photo);

      return (
        this.error.animal.status ||
        this.error.birthday.status ||
        this.error.aviaryNumber.status ||
        this.error.moniker.status ||
        this.error.food.status ||
        this.error.description.status ||
        this.error.photo.status
      );
    },

    async add() {
      if (
        this.Valid(
          this.addAnimalCard.animal,
          this.addAnimalCard.birthday,
          this.addAnimalCard.aviaryNumber,
          this.addAnimalCard.moniker,
          this.addAnimalCard.food,
          this.addAnimalCard.description,
          this.addAnimalCard.url
        )
      )
        return;

      let _animalCard = await addAnimalCard(
        this.addAnimalCard.animal,
        this.addAnimalCard.birthday,
        this.addAnimalCard.aviaryNumber,
        this.addAnimalCard.moniker,
        this.addAnimalCard.food,
        this.addAnimalCard.description,
        this.addAnimalCard.photo
      );

      if (_animalCard.status != "ok") {
        window.alert(_animalCard.value);
        return;
      }
      this.animalCards.push(_animalCard.value);
      closeModal(this.addAnimalCard);
      this.clearAnimalCard();
    },

    closeModal(modal) {
      modal.showModal = false;
      this.error.animal.status = false;
      this.error.birthday.status = false;
      this.error.aviaryNumber.status = false;
      this.error.moniker.status = false;
      this.error.food.status = false;
      this.error.description.status = false;
      this.error.photo.status = false;
      this.clearAnimalCard();
    },

    clearAnimalCard() {
      this.addAnimalCard.animal = null;
      this.addAnimalCard.birthday = "";
      this.addAnimalCard.aviaryNumber = "";
      this.addAnimalCard.moniker = "";
      this.addAnimalCard.food = "";
      this.addAnimalCard.description = "";
      this.addAnimalCard.url = null;
      this.addAnimalCard.photo = null;
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

.buttonFiles {
  font-weight: normal;
  text-transform: none;
  padding: 5px;
  color: white;
  font-size: 15px;
  border: 1px solid #fca311;
  background-color: #14213d;
  border-radius: 15px;
  width: 120px;
  height: 50px;
}
</style>
