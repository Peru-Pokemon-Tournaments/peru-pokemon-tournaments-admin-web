<template>
  <p>
    <base-icon type="fas" icon="sad-tear" class="secondary" /> <br />
    {{ message }}
  </p>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String as PropType<string>,
      default: "Sin elementos",
    },
  },
});
</script>
<style lang="scss" scoped>
p {
  text-align: center;
  color: $app-secondary-color;
  font-size: 0.7rem;
}
</style>
