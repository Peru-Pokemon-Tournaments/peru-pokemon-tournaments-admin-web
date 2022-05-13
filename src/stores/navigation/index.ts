import { routeLinks } from "@/router/index";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import * as Types from "./types";

export const useNavigationStore = defineStore("useNavigation", {
  state(): Types.NavigationState {
    return {
      sidebarLinks: routeLinks as Types.SidebarLink[],
    };
  },
  getters: {
    fullSidebarLinks(): Types.SidebarLink[] {
      return this.sidebarLinks;
    },
  },
});
