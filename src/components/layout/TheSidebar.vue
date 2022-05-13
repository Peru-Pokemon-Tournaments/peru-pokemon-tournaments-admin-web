<template>
  <aside>
    <ul>
      <li v-for="link in fullSidebarLinks" :key="link.name">
        <router-link :to="link.path" :class="buildClasses(link)">
          <span>{{ link.name }}</span>
          <base-icon :prefix="link.icon.prefix" :icon="link.icon.name" />
        </router-link>
      </li>
    </ul>
  </aside>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useNavigationStore } from "@/stores/navigation";
import { SidebarLink } from "@/stores/navigation/types";

export default defineComponent({
  computed: {
    ...mapState(useNavigationStore, ["fullSidebarLinks"]),
  },
  methods: {
    buildClasses(link: SidebarLink): { "selected-link": boolean } {
      return {
        "selected-link": link.path === this.$route.path,
      };
    },
  },
  mounted() {
    console.log(this.fullSidebarLinks);
  },
});
</script>
<style lang="scss" scoped>
aside {
  background-color: $app-sidebar-color;
  color: $app-sidebar-font-color;
  padding: 1rem;

  ul {
    list-style: none;

    li {
      margin-bottom: 0.2rem;
    }

    a {
      padding: 0.8rem 1rem;
      color: $app-sidebar-font-color;
      opacity: 0.5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      &:hover {
        opacity: 1;
      }
    }
  }
}

.selected-link {
  background-color: $app-primary-color;
  opacity: 1;
}
</style>
