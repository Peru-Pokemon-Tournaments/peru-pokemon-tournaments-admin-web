<template>
  <textarea
    :value="modelValue"
    @input="changeModelValue"
    :bind="$attrs"
    :rows="rows"
    @blur="focusOut"
  ></textarea>
  <div class="error" v-if="!isValid">
    <slot name="error">
      <span>El campo es inválido</span>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["update:modelValue", "blur"],
  props: {
    modelValue: {
      required: false,
      default: null,
      validator: (val: any): boolean =>
        val === null || typeof val === "string" || typeof val === "number",
    },
    isValid: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    rows: {
      type: Number as PropType<number>,
      default: 3,
    },
  },
  methods: {
    changeModelValue(event: InputEvent): void {
      this.$emit(
        "update:modelValue",
        (event.target as HTMLTextAreaElement).value
      );
    },
    focusOut(): void {
      this.$emit("blur");
    },
  },
});
</script>
<style lang="scss" scoped>
textarea {
  @include input-border;
  @include low-shadow;
  //   height: 1.5rem;
  //   padding: 1;
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
