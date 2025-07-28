import { useFetch } from "@vueuse/core";

const url = "http://localhost:5000/api/animal";

export async function Add(type, description) {
  try {
    let { isFetching, error, data } = await useFetch(url + "/add", {})
      .post({
        type: type,
        description: description,
      })
      .json();
    if (!data.value) return "Ошибка";
    return data.value.animal;

    // return error.value;
  } catch (error) {
    return error.value;
  }
}

export async function getAnimals() {
  let { isFetching, error, data } = await useFetch(url + "/get").json();
  return data.value.animalsAll;
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
    return error.value;
  }
}

export async function Update(id, params) {
  let { isFetching, error, data } = await useFetch(url + "/update", {})
    .post({ id: id, params: params })
    .json();
}
