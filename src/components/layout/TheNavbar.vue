<template>
  <nav>
    <div>
      <h2>The Navbar</h2>
      <ul>
        <li>Ignacio</li>
        <li>Cerrar Sesión</li>
      </ul>
    </div>
  </nav>
</template>
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
