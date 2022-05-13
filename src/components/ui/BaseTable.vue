<template>
  <div class="table-container">
    <table>
      <thead>
        <slot name="head"></slot>
      </thead>
      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}

table {
  width: 100%;
  thead {
    @include low-shadow;
    background-color: $app-primary-color;
    color: $app-secondary-font-color;
  }
}
</style>
