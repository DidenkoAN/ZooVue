import { useFetch } from "@vueuse/core";

const url = import.meta.env.VITE_URL_SERVER + "/api/user";

export async function Authorization(email, password) {
  try {
    console.log();
    let { isFetching, error, data } = await useFetch(url + "/authorization", {})
      .post({
        email: email,
        password: password,
      })
      .json();
    if (!data.value)
      return { status: "error", message: "User not found" };
    if (data.value.user) {
      localStorage.setItem("user", JSON.stringify(data.value.user));
      return { status: "ok", message: "User found" };
    } else return { status: "error", message: "User not found" };
  } catch (error) {
    return { status: "error", message: error.value };
  }
}

export async function DeleteProfile() {
  try {
    const id = JSON.parse(localStorage.getItem("user")).id;
    let { isFetching, error, data } = await useFetch(
      url + "/delete",
      {}
    ).delete({
      id: id,
    }).json;
    localStorage.removeItem("user");
  } catch (error) {
    return { status: "error", message: error.value };
  }
}

export async function getUsers() {
  let { isFetching, error, data } = await useFetch(url + "/get").json();
  return { status: "ok", message: data.value.usersAll };
}

export async function Registration(name, password, email, phone) {
  try {
    let { isFetching, error, data } = await useFetch(url + "/registration", {})
      .post({
        name: name,
        password: password,
        email: email,
        phone: phone,
      })
      .json();

    if (!data.value)
      return { status: "error", message: "User not found" };
    if (data.value.user) {
      localStorage.setItem("user", JSON.stringify(data.value.user));
      return { status: "ok", message: "User found" };
    } else return { status: "error", message: "User not found" };
  } catch (error) {
    return { status: "error", message: error.value };
  }
}
