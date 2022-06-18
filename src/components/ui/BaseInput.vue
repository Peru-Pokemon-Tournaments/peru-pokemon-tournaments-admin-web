<template>
  <input
    :type="type"
    :value="modelValue"
    @input="changeModelValue"
    :bind="$attrs"
    @blur="focusOut"
    @focus="focusIn"
    step="any"
    :disabled="disabled"
  />
  <div class="error" v-if="!isValid">
    <slot name="error">
      <span>El campo es inválido</span>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["update:modelValue", "blur", "focus"],
  props: {
    modelValue: {
      required: false,
      default: null,
      validator: (val): boolean =>
        val === null || typeof val === "string" || typeof val === "number",
    },
    type: {
      type: String as PropType<string>,
      default: "text",
      required: false,
    },
    isValid: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  methods: {
    changeModelValue(event: InputEvent): void {
      let value: string | number = (event.target as HTMLInputElement).value;
      if (this.type === "number") {
        value = Number(value);
      }
      this.$emit("update:modelValue", value);
    },
    focusOut(event: InputEvent): void {
      this.$emit("blur", event);
    },
    focusIn(event: InputEvent): void {
      this.$emit("focus", event);
    },
  },
});
</script>
<style lang="scss" scoped>
input {
  @include input-border;
  @include low-shadow;
  height: 1.5rem;
  padding: 1;
  width: 100%;

  &:focus,
  &:active {
    outline-color: $app-primary-color;
    outline-style: solid;
  }

  &:disabled {
    border-color: $app-disabled-color;
    background-color: $app-disabled-color;
    color: $app-primary-font-color;
  }
}

.error {
  color: $app-danger-color;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
</style>
