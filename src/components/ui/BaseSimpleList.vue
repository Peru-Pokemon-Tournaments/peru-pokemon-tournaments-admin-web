<template>
  <ul :style="baseSimpleListStyles">
    <li v-for="element in elements" :key="element">
      <span v-if="prefix">{{ prefix }}</span> {{ element }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    elements: {
      type: Array as PropType<string[]>,
      required: true,
    },
    maxHeight: {
      type: String as PropType<string>,
      required: false,
    },
    prefix: {
      type: String as PropType<string>,
      required: false,
    },
  },
  computed: {
    baseSimpleListStyles(): object {
      return {
        "max-height": this.maxHeight,
      };
    },
  },
});
</script>
<style lang="scss" scoped>
ul {
  overflow: auto;
}
</style>
