<template>
  <div class="container-fluid">
    <component v-if="isModal != ''" :is="isModal" @setIsModal="setIsModal" />

    <div class="row c1 p-3">
      <div class="col col-10 text-end"><label>Ник</label></div>
      <div class="col col-2 text-center">
        <button
          v-if="!this.login"
          class="actBtn"
          @click="setIsModal('LoginModal')"
        >
          Вход
        </button>

        <button v-else class="actBtn" @click="logout">Выход</button>
      </div>
    </div>

    <div class="row">
      <div class="col c2 col-3 p-4">
        <div><h1>ZooPark</h1></div>
        <div class="p-2 text-center">
          <button
            class="mainBtn"
            :class="
              this.currentComponent === 'AnimalsCard' ? 'actBtn' : 'nasBtn'
            "
            @click="animalsCardS"
          >
            Animals card
          </button>
        </div>

        <div class="p-2 text-center">
          <button
            class="mainBtn"
            :class="this.currentComponent === 'Animals' ? 'actBtn' : 'nasBtn'"
            @click="animalsS"
          >
            Animals
          </button>
        </div>
        <div class="p-2 text-center">
          <button
            class="mainBtn"
            :class="this.currentComponent === 'UserList' ? 'actBtn' : 'nasBtn'"
            @click="userListS"
          >
            User list
          </button>
        </div>
      </div>
      <!-- <div class="col c3 col-10 p-4"><default-text></default-text></div> -->
      <div class="col c3 col-9 p-4">
        <component :is="currentComponent" />
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import AnimalsCard from "@/components/AnimalsCard.vue";
import Animals from "@/components/Animals.vue";
import DefaultText from "@/components/DefaultText.vue";
import UserList from "@/components/UserList.vue";
import LoginModal from "@/components/LoginModal.vue";
import ProfileModal from "@/components/ProfileModal.vue";
import RegistModal from "@/components/RegistModal.vue";
import AddAnimalsCardModal from "@/components/AddAnimalsCardModal.vue";

export default {
  components: {
    AnimalsCard,
    DefaultText,
    Animals,
    UserList,
    LoginModal,
    ProfileModal,
    RegistModal,
    AddAnimalsCardModal,
  },
  data() {
    return {
      currentComponent: "DefaultText",
      login: false,
      isModal: this.login ? "" : "LoginModal",
      // isModal: "AddAnimalsCardModal",
    };
  },
  methods: {
    animalsS() {
      if (!this.login) return;
      this.currentComponent = "Animals";
    },
    animalsCardS() {
      if (!this.login) return;
      this.currentComponent = "AnimalsCard";
    },
    userListS() {
      if (!this.login) return;
      this.currentComponent = "UserList";
    },
    setIsModal(_isModal) {
      this.isModal = _isModal;
    },

    setIsModal(_isModal, _login) {
      this.isModal = _isModal;
      if (!_login) return;
      this.login = _login;
      this.currentComponent = "AnimalsCard";
    },

    logout() {
      this.isModal = "LoginModal";
      this.currentComponent = "DefaultText";
      this.login = false;
    },
  },
};
</script>

<style>
.actBtn {
  color: black;
  background-color: #fca311;
  border: none;
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
}

.mainBtn {
  width: 200px;
  height: 50px;
}

.nasBtn {
  color: white;
  background-color: #363363;
  border: none;
  border-radius: 10px;
}
.c1 {
  background-color: #141232;
  padding: 6px;
  color: white;
}

body {
  /* font-family: Roboto; */
  width: 100%;
  height: 100%;
  font-size: 20px;
}
.c2 {
  height: 96vh;
  background-color: #141232;
}

.c3 {
  height: 96vh;
  background-color: #14213d;
  color: white;
}
h1 {
  color: #fca311;
}
</style>
