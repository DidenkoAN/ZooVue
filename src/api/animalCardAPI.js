import { useFetch } from "@vueuse/core";

const url = "http://localhost:5000/api/animalCard";

export async function Add(
  photo,
  animal,
  aviary_number,
  birthday,
  moniker,
  description,
  food
) {
  try {
    let formdata = new FormData();
    formdata.append("photo", photo);
    formdata.append("animal", animal);
    formdata.append("aviary_number", aviary_number);
    formdata.append("birthday", birthday);
    formdata.append("moniker", moniker);
    formdata.append("description", description);
    formdata.append("food", food);
    let { isFetching, error, data } = await useFetch(url + "/add", {})
      .post(formdata)
      .json();
    return data;
    // if (!data.value) return "Ошибка";
    // return data.value.animal;

    // return error.value;
  } catch (error) {
    return error.value;
  }
}

export async function getAnimalCards() {
  let { isFetching, error, data } = await useFetch(url + "/get").json();
  return data.value.animalCardsAll;
}

export async function DeleteAnimalCard(id) {
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
