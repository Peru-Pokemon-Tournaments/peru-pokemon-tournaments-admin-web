<template>
  <div class="card">
    <section>
      <header>
        <slot name="header"></slot>
      </header>
      <div class="body">
        <slot></slot>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.card {
  @include high-shadow;
  margin: 0.5rem;
  background-color: $app-content-background-color;

  header {
    padding: 1rem;
    padding-bottom: 0;
  }
}

.body {
  padding: 1rem;
}
</style>
