<template>
  <div id="auth">
    <base-card>
      <template #header>
        <h1>Ingresar</h1>
      </template>
      <form>
        <div class="form-group">
          <label>Email</label>
          <base-input type="email" />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <base-input type="password" />
        </div>
        <div class="center">
          <base-button>Iniciar Sesión</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>
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
