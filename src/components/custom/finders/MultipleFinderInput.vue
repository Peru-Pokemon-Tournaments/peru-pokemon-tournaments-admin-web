<template>
  <finder-input
    @update:modelValue="addSelectedOption"
    @input="handleInput"
    :options="unselectedOptions"
    :is-valid="isValid"
  />
  <ul v-if="modelValue">
    <li v-for="(option, index) in modelValue" :key="option.key">
      <base-chip @click-remove="removeSelectedOption(index)" :color="chipColor">
        {{ option.value }}
      </base-chip>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import FinderInput from "./FinderInput.vue";

export default defineComponent({
  emits: ["update:modelValue", "input"],
  components: {
    FinderInput,
  },
  props: {
    modelValue: {
      type: Array as PropType<{ key: string; value: string }[]>,
      required: false,
      default: null,
    },
    options: {
      type: Array as PropType<{ key: string; value: string }[]>,
    },
    chipColor: {
      type: String as PropType<string>,
      required: false,
      default: "primary",
    },
    isValid: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
  },
  computed: {
    unselectedOptions(): { key: string; value: string }[] {
      const options = this.options;
      const selectedOptions = this.modelValue;
      const filteredOptions =
        selectedOptions !== null && (selectedOptions as []).length > 0
          ? options?.filter(
              (option) =>
                (selectedOptions as []).find(
                  (selectedOption: { key: string; value: string }) =>
                    selectedOption.key === option.key
                ) === undefined
            )
          : options;
      return filteredOptions ?? [];
    },
  },
  methods: {
    addSelectedOption(option: { key: string; value: string }) {
      this.updateModelValue([...this.modelValue, option]);
    },
    removeSelectedOption(index: number) {
      const selectedOptions = this.modelValue.map(
        (option: { key: string; value: string }) => {
          return {
            key: option.key,
            value: option.value,
          };
        }
      );
      selectedOptions.splice(index, 1);
      this.updateModelValue(selectedOptions);
    },
    handleInput(value: { key: string; value: string }[]): void {
      this.$emit("input", value);
    },
    updateModelValue(value: { key: string; value: string }[]): void {
      this.$emit("update:modelValue", value);
    },
  },
});
</script>
<style lang="scss" scoped>
li {
  display: inline-block;
}
</style>
