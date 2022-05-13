<template>
  <div :class="buttonClasses">
    <slot></slot>
    <base-icon icon="times" @click="remove" class="icon" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["click-remove"],
  props: {
    block: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    color: {
      type: String as PropType<string>,
      default: "primary",
      validator: (val: string): boolean => {
        const colors = ["primary", "danger", "success", "warning"];
        return colors.indexOf(val) !== -1;
      },
    },
  },
  computed: {
    buttonClasses(): object {
      return {
        block: this.block,
        [this.color]: true,
      };
    },
  },
  methods: {
    remove(): void {
      this.$emit("click-remove");
    },
  },
});
</script>
<style lang="scss" scoped>
div {
  padding: 0.5rem 0.8rem;
  display: inline-block;
  border-radius: 1rem;
  margin: 0.2rem;
}

.block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  cursor: pointer;
  margin-left: 0.5rem;
}

.primary {
  background-color: $app-primary-color;
  color: $app-secondary-font-color;
}

.danger {
  background-color: $app-danger-color;
  color: $app-secondary-font-color;
}

.warning {
  background-color: $app-warning-color;
  color: $app-primary-font-color;
}

.success {
  background-color: $app-success-color;
  color: $app-secondary-font-color;
}
</style>
