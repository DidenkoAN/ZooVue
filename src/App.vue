<template>
  <v-app>
    <v-container fluid height="60">
      <v-app-bar v-if="User" :elevation="0" class="color1" color="#141232">
        <v-spacer></v-spacer>
        <a @click="userProfile.showModal = true">Vitaly</a>
        <v-btn color="black" @click="logOut" class="btn1 mx-5">Logout</v-btn>
      </v-app-bar>
    </v-container>
    <v-container>
      <v-navigation-drawer
        :location="isPhone ? 'top' : 'left'"
        permanent
        :width="isPhone ? 150 : 300"
        class="color1"
      >
        <v-row align="center">
          <v-col cols="12" align="center">
            <label class="lbl1 title">ZooPark</label>
          </v-col>

          <v-col :cols="isPhone ? 4 : 12" align="center">
            <v-btn
              class="btnSize"
              :class="active == '/animalcard' ? 'btn1' : 'btn2'"
              @click="choosePages('/animalcard')"
              >AnimalCard</v-btn
            >
          </v-col>
          <v-col :cols="isPhone ? 4 : 12" align="center">
            <v-btn
              class="btnSize"
              :class="active == '/animal' ? 'btn1' : 'btn2'"
              @click="choosePages('/animal')"
              >Animal</v-btn
            >
          </v-col>
          <v-col :cols="isPhone ? 4 : 12" align="center">
            <v-btn
              class="btnSize"
              :class="active == '/user' ? 'btn1' : 'btn2'"
              @click="choosePages('/user')"
              >User list</v-btn
            >
          </v-col>
        </v-row>
      </v-navigation-drawer>
    </v-container>
    <v-container
      ><v-navigation-drawer
        class="card"
        :location="right"
        permanent
        :width="width + 300"
      >
        <div v-if="(!this, User)"><router-view></router-view></div>
      </v-navigation-drawer>
    </v-container>

    <!-- Аворизация -->
    <v-container>
      <v-dialog v-model="userLogin.showModal" max-width="500px" persistent>
        <v-card class="px-5 py-3 color2">
          <v-card-title class="lbl1 title text-center"
            >Authorization</v-card-title
          >
          <v-text-field
            variant="solo"
            placeholder="Email"
            v-model="userLogin.email"
          >
          </v-text-field>
          <v-text-field
            v-model="userLogin.password.value"
            variant="solo"
            placeholder="Password"
            :type="userLogin.password.show ? 'text' : 'password'"
            :append-inner-icon="
              userLogin.password.show ? 'mdi-eye-off' : 'mdi-eye'
            "
            @click:append-inner="
              userLogin.password.show = !userLogin.password.show
            "
          >
          </v-text-field>
          <a
            style="font-size: 0.8em"
            @click="changeModal(userLogin, changingPassword)"
            >Forgot your password? Recover</a
          >
          <v-row v-if="this.userLogin.error"
            ><label class="lbl1 mb-5 ml-3 mt-6">{{
              this.userLogin.error
            }}</label>
          </v-row>
          <v-card-actions>
            <v-col cols="6" class="text-center">
              <a
                style="font-size: 0.8em"
                @click="changeModal(userLogin, userRegist)"
                >Registration</a
              >
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn class="btn1" @click="logIn">Login</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- ChangePassword -->
    <v-container>
      <v-dialog
        v-model="changingPassword.showModal"
        max-width="500px"
        persistent
      >
        <v-card class="px-5 py-3 color2">
          <v-card-title class="lbl1 title text-center"
            >Changing password</v-card-title
          >

          <v-row v-if="changingPassword.progress == 1">
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Enter email</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                variant="solo"
                v-model="changingPassword.email"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="changingPassword.progress == 2">
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Enter code</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                variant="solo"
                v-model="changingPassword.code"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="changingPassword.progress == 3">
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Enter password</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                variant="solo"
                v-model="changingPassword.password"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-col cols="1" class="text-start">
              <v-btn
                class="btn1"
                @click="changeModal(changingPassword, userLogin)"
                >Cancel</v-btn
              >
            </v-col>
            <v-col cols="11" class="text-end">
              <v-btn
                v-if="changingPassword.progress > 1"
                class="btn1 px-5 mx-4"
                @click="changingPassword.progress--"
                >Back</v-btn
              >
              <v-btn class="btn1" @click="changingPassword.progress++"
                >Next</v-btn
              >
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- Profile -->
    <v-container>
      <v-dialog v-model="userProfile.showModal" max-width="500px" persistent>
        <v-card class="color2">
          <v-card-title class="lbl1 color1" style="font-size: 1.3em"
            >Profile</v-card-title
          >
          <div class="px-5 py-3 mt-5">
            <v-row>
              <v-col cols="4" class="text-center nopad">
                <label class="lbl2">Name</label>
              </v-col>
              <v-col cols="8" class="nopad">
                <v-text-field
                  variant="solo"
                  v-model="userProfile.name"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="text-center nopad">
                <label class="lbl2">Email</label>
              </v-col>
              <v-col cols="8" class="nopad">
                <v-text-field
                  variant="solo"
                  v-model="userProfile.email"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="text-center nopad">
                <label class="lbl2">Phone</label>
              </v-col>
              <v-col cols="8" class="nopad">
                <v-text-field
                  variant="solo"
                  v-model="userProfile.phone"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-col cols="6" class="text-center">
                <v-btn class="btn1" @click="userProfile.showModal = false"
                  >Cancel</v-btn
                >
              </v-col>
              <v-col cols="6" class="text-center">
                <v-btn class="btn1" @click="deleteProfile"
                  >Delete Profile</v-btn
                >
              </v-col>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </v-container>

    <!-- Регистрация -->
    <v-container>
      <v-dialog v-model="userRegist.showModal" max-width="500px" persistent>
        <v-card class="px-5 py-3 color2">
          <v-card-title class="lbl1 title text-center"
            >Registration</v-card-title
          >
          <v-row>
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Name</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                variant="solo"
                v-model="userRegist.name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="this.error.name.status"
            ><label class="lbl1 mb-10 ml-6">{{
              this.error.name.message
            }}</label>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Password</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                v-model="userRegist.password.value"
                variant="solo"
                :type="userRegist.password.show ? 'text' : 'password'"
                :append-inner-icon="
                  userRegist.password.show ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="
                  userRegist.password.show = !userRegist.password.show
                "
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="this.error.password.status"
            ><label class="lbl1 mb-10 ml-6">{{
              this.error.password.message
            }}</label>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Password repeat</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                v-model="userRegist.passwordRepeat.value"
                variant="solo"
                :type="userRegist.passwordRepeat.show ? 'text' : 'password'"
                :append-inner-icon="
                  userRegist.passwordRepeat.show ? 'mdi-eye-off' : 'mdi-eye'
                "
                @click:append-inner="
                  userRegist.passwordRepeat.show =
                    !userRegist.passwordRepeat.show
                "
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="this.error.passwordRepeat.status"
            ><label class="lbl1 mb-10 ml-6">{{
              this.error.passwordRepeat.message
            }}</label>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Email</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                variant="solo"
                v-model="userRegist.email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="this.error.email.status"
            ><label class="lbl1 mb-10 ml-6">{{
              this.error.email.message
            }}</label>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-center nopad">
              <label class="lbl2">Phone</label>
            </v-col>
            <v-col cols="8" class="nopad">
              <v-text-field
                variant="solo"
                v-model="userRegist.phone"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="this.error.phone.status"
            ><label class="lbl1 mb-10 ml-6">{{
              this.error.phone.message
            }}</label>
          </v-row>

          <v-card-actions>
            <v-col cols="6" class="text-center">
              <a
                style="font-size: 0.8em"
                @click="changeModal(userRegist, userLogin)"
                >Authorization</a
              >
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn class="btn1" @click="registration">Registration</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import { authorization, registration, deleteProfile } from "./API/userAPI";
import "./index.css";
import { existing, passwordV, emailV, phoneV } from "./Validation";
export default {
  created() {
    if (window.screen.width < window.screen.height) this.isPhone = true;
    this.User = localStorage.getItem("user");
    if (this.User) {
      this.User = JSON.parse(this.User);
      this.userProfile.name = this.User.name;
      this.userProfile.email = this.User.email;
      this.userProfile.phone = this.User.phone;
      this.userLogin.showModal = false;
    }
    this.width = window.screen.width;
    this.active = window.location.href.replace("http://localhost:8080", "");
    this.userLogin.clear = this.clearLogin;
    this.userRegist.clear = this.clearRigistration;
    this.changingPassword.clear = this.clearChangingPassword;
  },
  components: {},

  data: () => ({
    isPhone: false,
    width: 1900,
    active: "/",
    userLogin: {
      showModal: true,
      email: "",
      error: "",
      password: { show: false, value: "" },
      clear: () => {},
    },
    userRegist: {
      showModal: false,
      name: "",
      password: { show: false, value: "" },
      passwordRepeat: { show: false, value: "" },
      email: "",
      phone: "",

      clear: () => {},
    },

    error: {
      name: {
        status: false,
        message: "Name not specified",
      },
      password: {
        status: false,
        message:
          "The password must contain at least 8 characters long, uppercase and lowercase Latin letter, digit and a special character.",
      },
      passwordRepeat: {
        status: false,
        message:
          "Error in password confirmation. The passwords you entered do not match",
      },
      email: {
        status: false,
        message:
          "The email can contain only Latin characters or digits, and '@'.",
      },
      phone: {
        status: false,
        message:
          "The phone can contain only digits and '+' at the beginning. The phone number must consist of 11 number.",
      },
    },

    changingPassword: {
      showModal: false,
      email: "",
      code: "",
      password: "",
      progress: 1,
      clear: () => {},
    },

    userProfile: {
      showModal: false,
      name: "",
      email: "",
      phone: "",
    },
    showModal: false,

    User: null,
  }),

  methods: {
    choosePages(pages) {
      this.$router.push("." + pages);
      this.active = pages;
    },

    async registration() {
      if (
        this.Valid(
          this.userRegist.name,
          this.userRegist.password.value,
          this.userRegist.passwordRepeat.value,
          this.userRegist.email,
          this.userRegist.phone
        )
      )
        return;
      let _user = await registration(
        this.userRegist.name,
        this.userRegist.password.value,
        this.userRegist.email,
        this.userRegist.phone
      );
      if (_user.status != "ok") {
        window.alert(_user.value);
        return;
      }
      localStorage.setItem("user", JSON.stringify(_user.value));
      this.User = _user.value;
      this.userRegist.clear();
      this.userRegist.showModal = false;
    },

    async logIn() {
      if (this.userLogin.email == "" || this.userLogin.password.value == "") {
        this.userLogin.error = "Not all data is filled in";
        return;
      }
      let _user = await authorization(
        this.userLogin.email,
        this.userLogin.password.value
      );
      if (_user.status != "ok") {
        this.userLogin.error = _user.value;
        return;
      }
      localStorage.setItem("user", JSON.stringify(_user.value));
      this.userLogin.showModal = false;
      this.userLogin.clear();
      this.User = _user.value;
      this.userProfile.name = this.User.name;
      this.userProfile.email = this.User.email;
      this.userProfile.phone = this.User.phone;
    },

    deleteProfile() {
      deleteProfile(this.User.id);
      this.logOut();
    },

    Valid(name, password, passwordRepeat, email, phone) {
      this.error.name.status = !existing(name);
      this.error.password.status = !existing(password) || !passwordV(password);
      this.error.passwordRepeat.status = password != passwordRepeat;
      this.error.email.status = !existing(email) || !emailV(email);
      this.error.phone.status = !existing(phone) || !phoneV(phone);

      return (
        this.error.name.status ||
        this.error.password.status ||
        this.error.passwordRepeat.status ||
        this.error.email.status ||
        this.error.phone.status
      );
    },

    logOut() {
      localStorage.removeItem("user");
      this.User = null;
      this.userProfile.name = "";
      this.userProfile.email = "";
      this.userProfile.phone = "";
      this.userLogin.showModal = true;
    },

    changeModal(obj1, obj2) {
      obj1.showModal = false;
      obj1.clear();
      obj2.showModal = true;
    },

    clearLogin() {
      this.userLogin.email = "";
      this.userLogin.password = { show: false, value: "" };
    },

    clearRigistration() {
      this.userRegist.name = "";
      this.userRegist.password = { show: false, value: "" };
      this.userRegist.passwordRepeat = { show: false, value: "" };
      this.userRegist.email = "";
      this.userRegist.phone = "";
    },

    clearChangingPassword() {
      this.changingPassword.email = "";
      this.changingPassword.code = "";
      this.changingPassword.password = "";
      this.changingPassword.progress = 1;
    },
  },
};
</script>
<style src="./index.css" scoped></style>
