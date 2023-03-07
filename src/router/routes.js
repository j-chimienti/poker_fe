const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/PokerGameLobby.vue"),
      },
    ],
  },
  {
    name: "table",
    path: "/table/:id",
    component: () => import("pages/PokerGamePage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
]

export default routes
