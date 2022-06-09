<template>
  <nav>
    <div v-if="isLoggedIn">
      <h2>The Navbar</h2>
      <ul>
        <li>{{ loggedUser.name }}</li>
        <li>
          <a href="/logout" @click.prevent="logout">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { mapActions, mapState } from "pinia";
import Vue, { defineComponent } from "vue";
export default defineComponent({
  computed: {
    ...mapState(useAuthStore, ["loggedUser", "isLoggedIn"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
  },
});
</script>
<style lang="scss" scoped>
nav div {
  background-color: $app-navbar-color;
  color: $app-navbar-font-color;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

ul {
  display: flex;
  flex-direction: row;
}
</style>
