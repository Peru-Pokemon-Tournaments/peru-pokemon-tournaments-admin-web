<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    tag: {
      type: String as PropType<string>,
      default: "td",
      validator: (val: string): boolean => {
        const tags = ["td", "th"];
        return tags.indexOf(val) !== -1;
      },
    },
  },
});
</script>
<style lang="scss" scoped>
td,
th {
  padding: 10px;
  text-align: center;
}
</style>
