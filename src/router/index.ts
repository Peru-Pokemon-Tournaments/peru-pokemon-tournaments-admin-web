import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import PeopleView from "@/views/home/views/PeopleView.vue";
import RolesView from "@/views/home/views/RolesView.vue";
import DevicesView from "@/views/home/views/DevicesView.vue";
import GamesView from "@/views/home/views/GamesView.vue";
import GameGenerationsView from "@/views/home/views/GameGenerationsView.vue";
import TournamentRulesView from "@/views/home/views/TournamentRulesView.vue";
import TournamentSystemsView from "@/views/home/views/TournamentSystemsView.vue";
import TournamentTypesView from "@/views/home/views/TournamentTypesView.vue";
import TournamentResultsView from "@/views/home/views/TournamentResultsView.vue";
import TournamentsView from "@/views/home/views/TournamentsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    name: "Login",
    path: "/login",
    component: AuthView,
    meta: {
      inSidebar: false,
    },
  },
  {
    name: "Home",
    path: "/",
    component: HomeView,
    meta: {
      inSidebar: false,
    },
    children: [
      {
        path: "/people",
        name: "People",
        component: PeopleView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "user",
          },
        },
        children: [],
      },
      {
        path: "/roles",
        name: "Roles",
        component: RolesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "key",
          },
        },
        children: [],
      },
      {
        path: "/devices",
        name: "Devices",
        component: DevicesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "chess-bishop",
          },
        },
        children: [],
      },
      {
        path: "/games",
        name: "Games",
        component: GamesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "gamepad",
          },
        },
        children: [],
      },
      {
        path: "/game-generations",
        name: "Game Generations",
        component: GameGenerationsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "list-ol",
          },
        },
        children: [],
      },
      {
        path: "/tournaments/rules",
        name: "Tournament rules",
        component: TournamentRulesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "balance-scale",
          },
        },
        children: [],
      },
      {
        path: "/tournaments/systems",
        name: "Tournament Systems",
        component: TournamentSystemsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "clipboard-check",
          },
        },
        children: [],
      },
      {
        path: "/tournaments/types",
        name: "Tournament Types",
        component: TournamentTypesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "shapes",
          },
        },
        children: [],
      },
      {
        path: "/tournaments/results",
        name: "Tournament Results",
        component: TournamentResultsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "poll",
          },
        },
        children: [],
      },
      {
        path: "/tournaments",
        name: "Tournaments",
        component: TournamentsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "gamepad",
          },
        },
        children: [],
      },
    ],
  },
];

const routeLinks = routes[1].children
  ?.filter((route: RouteRecordRaw) => route?.meta?.inSidebar)
  .map((route: RouteRecordRaw) => ({
    name: route.name,
    path: route.path,
    icon: {
      prefix: (route?.meta?.icon as any)?.prefix as string,
      name: (route?.meta?.icon as any)?.name as string,
    },
  }));

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export { routes, router, routeLinks };
