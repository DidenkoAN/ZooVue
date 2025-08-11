import axios from "axios";
const url = process.env.VUE_APP_URL_SERVER + "/api/animalCard";

export async function getAnimalCards() {
  let animalCards;
  try {
    await axios
      .get(url + "/get")
      .then((res) => (animalCards = res.data.animalCardsAll))
      .catch((error) => {
        return { status: "error", value: error.message };
      });
    if (!animalCards) return { status: "error", value: "Error" };
    return { status: "ok", value: animalCards };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function addAnimalCard(
  animal,
  birthday,
  aviary_number,
  moniker,
  food,
  description,
  photo
) {
  let animalCard;
  try {
    let formdata = new FormData();
    formdata.append("photo", photo);
    formdata.append("animal", animal.value);
    formdata.append("aviary_number", aviary_number);
    formdata.append("birthday", birthday);
    formdata.append("moniker", moniker);
    formdata.append("description", description);
    formdata.append("food", food);
    await axios
      .post(url + "/add", formdata)
      .then((res) => (animalCard = res.data.animalCard))
      .catch((error) => {
        return { status: "error", value: error.message };
      });
    if (!animalCard) return { status: "error", value: "Error" };
    return { status: "ok", value: animalCard };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}

export async function deleteAnimalCard(id) {
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

export async function editAnimalCard(id, params) {
  try {
    let _photo = "";
    let formdata = new FormData();
    formdata.append("id", id);

    for (let key in params) {
      formdata.append(key, params[key]);
    }
    await axios
      .post(url + "/update", formdata)
      .then((res) => (_photo = res.data))
      .catch((error) => {
        return { status: "error", value: error.message };
      });
    return { status: "ok", value: _photo };
  } catch (error) {
    return { status: "error", value: error.value };
  }
}
