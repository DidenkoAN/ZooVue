import { useFetch } from "@vueuse/core";

const url = import.meta.env.VITE_URL_SERVER + "/api/animalCard";

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
    if (!data.value) return { status: "error", message: "Error" };
    return { status: "ok", message: data.value.animalCard };

    return error.value;
  } catch (error) {
    return { status: "error", message: error.value };
  }
}

export async function getAnimalCards() {
  try {
    let { isFetching, error, data } = await useFetch(url + "/get").json();
    return { status: "ok", message: data.value.animalCardsAll };
  } catch (error) {
    return { status: "error", message: error.value };
  }
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
    return { status: "error", message: error.value };
  }
}

export async function Update(id, params) {
  try {
    let formdata = new FormData();
    formdata.append("id", id);

    for (let key in params) {
      formdata.append(key, params[key]);
    }
    let { isFetching, error, data } = await useFetch(url + "/update", {})
      .post(formdata)
      .json();
    return { status: "ok", message: data.value };
  } catch (error) {
    return { status: "error", message: error.value };
  }
}
