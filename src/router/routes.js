import { pages } from "src/constants"

const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: pages.lobby,
        component: () => import("components/TexasHoldEmLobby.vue"),
      },
      {
        path: "table/:id",
        name: pages.table,
        component: () => import("pages/PokerGamePage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
]

export default routes
