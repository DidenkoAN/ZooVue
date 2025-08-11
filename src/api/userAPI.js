import { password } from "@/Validation";
import axios from "axios";
const url = process.env.VUE_APP_URL_SERVER + "/api/user";

export async function getUsers() {
  let users;
  try {
    await axios
      .get(url + "/get")
      .then((res) => (users = res.data.usersAll))
      .catch((error) => {
        return { status: "error", value: error.message };
      });

    if (!users) return { status: "error", value: "Error" };
    return { status: "ok", value: users };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function registration(name, password, email, phone) {
  try {
    let user;
    let errorMess;
    await axios
      .post(url + "/registration", {
        name: name,
        password: password,
        email: email,
        phone: phone,
      })
      .then((res) => (user = res.data.user))
      .catch((error) => (errorMess = error.response.data.error));
    if (errorMess) return { status: "error", value: errorMess };
    if (!user) return { status: "error", value: "Error" };
    return { status: "ok", value: user };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function authorization(email, password) {
  try {
    let user;
    let errorMess;
    await axios
      .post(url + "/authorization", {
        password: password,
        email: email,
      })

      .then((res) => (user = res.data.user))
      .catch((error) => (errorMess = error.response.data.error));
    if (errorMess) return { status: "error", value: errorMess };
    if (!user) return { status: "error", value: "Error" };
    return { status: "ok", value: user };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function deleteProfile(id) {
  try {
    let errorMess;
    await axios
      .delete(url + "/delete", {
        data: {
          id: id,
        },
      })
      .then()
      .catch((error) => (errorMess = error.response.data.error));
    if (errorMess) return { status: "error", value: errorMess };
    if (!user) return { status: "error", value: "Error" };
    return { status: "ok", value: user };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}
