<template>
  <select :value="modelValue" @input="changeModelValue($event)">
    <slot></slot>
  </select>
  <div class="error" v-if="!isValid">
    <slot name="error">
      <span>El campo es inválido</span>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number>,
    },
    isValid: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  methods: {
    changeModelValue(event: InputEvent): void {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
  },
});
</script>
<style lang="scss" scoped>
select {
  @include low-shadow;
  @include input-border;
  height: 1.5rem;
  line-height: 1rem;
  width: 100%;

  &:focus,
  &:active {
    outline-color: $app-primary-color;
    outline-style: solid;
  }
}

.error {
  color: $app-danger-color;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
</style>
