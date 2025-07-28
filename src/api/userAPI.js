import { useFetch } from "@vueuse/core";

const url = "http://localhost:5000/api/user";

export async function Authorization(email, password) {
  try {
    let { isFetching, error, data } = await useFetch(url + "/authorization", {})
      .post({
        email: email,
        password: password,
      })
      .json();
    if (!data.value) return "Ошибка";
    if (data.value.user)
      localStorage.setItem("user", JSON.stringify(data.value.user));
    else return error.value;
  } catch (error) {
    return error.value;
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
    return error.value;
  }
}

export async function getUsers() {
  let { isFetching, error, data } = await useFetch(url + "/get").json();
  return data.value.usersAll;
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
    if (!data.value) return "Ошибка";
    if (data.value.user)
      localStorage.setItem("user", JSON.stringify(data.value.user));
    else return error.value;
  } catch (error) {
    return error.value;
  }
}
