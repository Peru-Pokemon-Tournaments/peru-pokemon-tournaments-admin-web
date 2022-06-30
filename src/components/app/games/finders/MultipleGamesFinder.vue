<template>
  <multiple-finder-input
    @input="filterOptions"
    v-model="selectedOptions"
    :options="gameOptions"
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
      filteredGames: [] as { id: string; name: string }[],
    };
  },
  computed: {
    ...mapState(useAppOptionsStore, ["games"]),
    gameOptions(): { key: string; value: string }[] {
      return this.filteredGames.map(({ id, name }) => ({
        key: id,
        value: name,
      }));
    },
  },
  methods: {
    ...mapActions(useAppOptionsStore, ["fetchGames"]),
    filterOptions(input: string): void {
      this.filteredGames = this.games.filter(({ name }) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
    },
    loadInitialSelectedOptions(): void {
      this.selectedOptions = this.games
        .filter(
          ({ id }) =>
            [...this.modelValue].map(({ id }) => id).indexOf(id) !== -1
        )
        .map(({ id, name }) => ({
          key: id,
          value: name,
        }));
    },
  },
  watch: {
    selectedOptions(value: { key: string; value: string }[]): void {
      const selectedGames = value.map(({ key }) => ({ id: key }));
      this.$emit("update:modelValue", selectedGames);
    },
  },
  async mounted(): Promise<void> {
    await this.fetchGames();
    this.filteredGames = this.games;
    this.loadInitialSelectedOptions();
  },
});
</script>
