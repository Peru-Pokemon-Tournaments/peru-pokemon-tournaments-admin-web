<template>
  <multiple-finder-input
    @input="filterOptions"
    v-model="selectedOptions"
    @change="updateModelValue"
    :options="deviceOptions"
  />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { mapActions, mapState } from "pinia";
import { useAppOptionsStore } from "@/stores/app-options";
import MultipleFinderInput from "@/components/custom/finders/MultipleFinderInput.vue";

export default defineComponent({
  emits: ["update:modelValue"],
  components: {
    MultipleFinderInput,
  },
  props: {
    modelValue: {
      type: Array as PropType<{ id: string }[]>,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      selectedOptions: [] as { key: string; value: string }[],
      filteredDevices: [] as { id: string; name: string }[],
    };
  },
  computed: {
    ...mapState(useAppOptionsStore, ["devices"]),
    deviceOptions(): { key: string; value: string }[] {
      return this.filteredDevices.map(({ id, name }) => ({
        key: id,
        value: name,
      }));
    },
  },
  methods: {
    ...mapActions(useAppOptionsStore, ["fetchDevices"]),
    filterOptions(input: string): void {
      this.filteredDevices = this.devices.filter(({ name }) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
    },
    loadInitialSelectedOptions(): void {
      this.selectedOptions = this.devices
        .filter(
          ({ id }) =>
            [...this.modelValue].map(({ id }) => id).indexOf(id) !== -1
        )
        .map(({ id, name }) => ({
          key: id,
          value: name,
        }));
    },
    updateModelValue(value: { key: string; value: string }[]): void {
      const selectedDevices = value.map(({ key }) => ({ id: key }));
      this.$emit("update:modelValue", selectedDevices);
    },
  },
  watch: {
    modelValue() {
      this.loadInitialSelectedOptions();
    },
  },
  async mounted(): Promise<void> {
    await this.fetchDevices();
    this.filteredDevices = this.devices;
  },
});
</script>
