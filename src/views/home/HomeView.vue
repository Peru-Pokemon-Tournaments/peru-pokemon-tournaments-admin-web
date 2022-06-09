<template>
  <div id="home-view">
    <the-navbar id="navbar" />
    <main>
      <the-sidebar id="sidebar" />
      <div id="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import TheSidebar from "@/components/layout/TheSidebar.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";
import { useAuthStore } from "@/stores/auth";
import { mapActions, mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TheNavbar,
    TheSidebar,
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["tryLogInFromCache"]),
  },
  watch: {
    isLoggedIn(): void {
      if (!this.isLoggedIn) {
        this.$router.push({ name: "Login" });
      }
    },
  },
  beforeMount(): void {
    this.tryLogInFromCache();
    if (!this.isLoggedIn) {
      this.$router.push({ name: "Login" });
    }
  },
});
</script>
<style lang="scss" scoped>
#home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    display: flex;
    flex-direction: row;
  }
}
#sidebar {
  width: 10rem;
}
#content {
  width: calc(100% - 10rem);
  padding: 1rem;
  background-color: $app-content-background-color;
}
</style>
