<template>
  <button :class="buttonClasses" :disabled="disabled" :bind="$attrs">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "BaseButton",
  props: {
    block: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: false,
    },
    color: {
      type: String,
      default: "primary",
      validator: (val: string): boolean => {
        const colors = ["primary", "danger", "success", "warning"];
        return colors.indexOf(val) !== -1;
      },
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: false,
    },
  },
  computed: {
    buttonClasses(): object {
      return {
        "btn-block": this.block,
        [this.color]: true,
      };
    },
  },
});
</script>
<style lang="scss" scoped>
button {
  @include low-shadow;
  height: fit-content;
  min-height: 2rem;
  border-radius: 2px;
  border: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus,
  &:active {
    outline-width: 1px;
  }

  &:disabled {
    cursor: default;
    background-color: $app-disabled-color;
    color: $app-primary-font-color;
  }
}

.btn-block {
  display: block;
  width: 100%;
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
