<template>
  <nav>
    <div v-if="isLoggedIn">
      <h2><strong>Perú Pokémon Tournaments Admin</strong></h2>
      <ul>
        <li>
          <base-badge color="success">
            {{ loggedUser.name }}
          </base-badge>
        </li>
        <li>
          <a href="/logout" @click.prevent="logout">
            Salir <base-icon icon="sign-out-alt" />
          </a>
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
  justify-content: space-between;

  h2 {
    font-weight: bold;
  }

  a {
    color: $app-navbar-font-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    li {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
