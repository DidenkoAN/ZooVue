import Vue from "vue";
import VueRouter from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import AnimalPages from "./pages/AnimalPages.vue";
import AnimalCardPages from "./pages/AnimalCardPages.vue";
import UserPages from "./pages/UserPages.vue";

const routes = [
  { path: "/animal", component: AnimalPages },
  { path: "/animalcard", component: AnimalCardPages },
  { path: "/user", component: UserPages },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
