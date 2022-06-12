<template>
  <div id="auth">
    <base-card>
      <template #header>
        <picture class="center">
          <img :src="logoImageAsset" height="150" />
        </picture>
      </template>
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Email</label>
          <base-input type="email" v-model="email" />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <base-input type="password" v-model="password" />
        </div>
        <div class="center">
          <span v-if="isLoadingLogin">Ingresando...</span>
          <base-button v-else>Iniciar Sesión</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn", "isLoadingLogin"]),
    logoImageAsset() {
      return require("@/assets/img/logo.png");
    },
  },
  methods: {
    ...mapActions(useAuthStore, ["loginUser"]),
    async submit(): Promise<void> {
      await this.loginUser({
        email: this.email,
        password: this.password,
      });
    },
    clearForm(): void {
      this.email = "";
      this.password = "";
    },
  },
  watch: {
    isLoggedIn() {
      this.clearForm();
      this.$router.push({
        name: "Home",
      });
    },
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include layout;

#auth {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $app-login-background-color;
}
</style>
