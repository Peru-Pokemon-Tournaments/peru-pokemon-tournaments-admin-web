<template>
  <option :value="value">
    <slot></slot>
  </option>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    value: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
  },
});
</script>
