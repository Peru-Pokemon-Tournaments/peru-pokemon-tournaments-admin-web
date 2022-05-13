<template>
  <font-awesome-icon :icon="[prefix, icon]" :key="updateCounter" />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    prefix: {
      type: String as PropType<string>,
      required: false,
      default: "fas",
      validator: (val: string): boolean => {
        const prefixes = ["fas", "far"];
        return prefixes.indexOf(val) !== -1;
      },
    },
    icon: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {
      updateCounter: 0 as number,
    };
  },
  watch: {
    icon(): void {
      this.updateCounter++;
    },
  },
});
</script>
