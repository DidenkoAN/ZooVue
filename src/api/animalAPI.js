import axios from "axios";
const url = process.env.VUE_APP_URL_SERVER + "/api/animal";

export async function getAnimals() {
  let animals;
  try {
    await axios
      .get(url + "/get")
      .then((res) => (animals = res.data.animalsAll))
      .catch((error) => {
        return { status: "error", value: error.message };
      });
    if (!animals) return { status: "error", value: "Error" };
    return { status: "ok", value: animals };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function addAnimal(kind_of_animal, description) {
  let animal;
  try {
    await axios
      .post(url + "/add", {
        kind_of_animal: kind_of_animal,
        description: description,
      })
      .then((res) => (animal = res.data.animal))
      .catch((error) => {
        return { status: "error", value: error.message };
      });
    if (!animal) return { status: "error", value: "Error" };
    return { status: "ok", value: animal };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function deleteAnimal(id) {
  try {
    await axios
      .delete(url + "/delete", {
        data: {
          id: id,
        },
      })
      .then()
      .catch((error) => {
        return { status: "error", value: error.message };
      });
    return { status: "ok", value: animal };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function editAnimal(id, params) {
  try {
    await axios
      .post(url + "/update", {
        id: id,
        params: params,
      })
      .then()
      .catch((error) => {
        return { status: "error", value: error.message };
      });
    return { status: "ok", value: "" };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}
