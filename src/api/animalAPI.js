import { useFetch } from "@vueuse/core";

const url = import.meta.env.VITE_URL_SERVER + "/api/animal";

export async function Add(type, description) {
  try {
    let { isFetching, error, data } = await useFetch(url + "/add", {})
      .post({
        type: type,
        description: description,
      })
      .json();
    if (!data.value) return { status: "error", message: "Ошибка" };
    return { status: "ok", message: data.value.animal };

    // return error.value;
  } catch (error) {
    return { status: "error", message: error.value };
  }
}

export async function getAnimals() {
  try {
    let { isFetching, error, data } = await useFetch(url + "/get").json();
    return { status: "ok", message: data.value.animalsAll };
  } catch (error) {
    return { status: "error", message: error.value };
  }
}

export async function DeleteAnimal(id) {
  try {
    let { isFetching, error, data } = await useFetch(
      url + "/delete",
      {}
    ).delete({
      id: id,
    }).json;
  } catch (error) {
    return { status: "error", message: error.value };
  }
}

export async function Update(id, params) {
  try {
    let { isFetching, error, data } = await useFetch(url + "/update", {})
      .post({ id: id, params: params })
      .json();
  } catch (error) {
    return { status: "error", message: error.value };
  }
}
