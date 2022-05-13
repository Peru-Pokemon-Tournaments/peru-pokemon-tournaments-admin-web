<template>
  <span class="base-badge" :class="badgeClasses">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    color: {
      type: String as PropType<string>,
      default: "primary",
      validator: (val: string): boolean => {
        const colors = ["primary", "secondary", "success", "danger", "warning"];
        return colors.indexOf(val) !== -1;
      },
    },
  },
  computed: {
    badgeClasses(): object {
      return {
        [this.color]: !!this.color,
      };
    },
  },
});
</script>
<style lang="scss" scoped>
.base-badge {
  @include low-shadow;
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
}

.primary {
  background-color: $app-primary-color;
  color: $app-secondary-font-color;
}

.secondary {
  background-color: $app-secondary-color;
  color: $app-secondary-font-color;
}

.success {
  background-color: $app-success-color;
  color: $app-secondary-font-color;
}

.warning {
  background-color: $app-warning-color;
  color: $app-secondary-font-color;
}

.danger {
  background-color: $app-danger-color;
  color: $app-secondary-font-color;
}
</style>
