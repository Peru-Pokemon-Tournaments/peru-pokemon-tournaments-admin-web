<template>
  <multiple-finder-input
    @input="filterOptions"
    v-model="selectedOptions"
    :options="tournamentSystemOptions"
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
      filteredTournamentSystems: [] as { id: string; name: string }[],
    };
  },
  computed: {
    ...mapState(useAppOptionsStore, ["tournamentSystems"]),
    tournamentSystemOptions(): { key: string; value: string }[] {
      return this.filteredTournamentSystems.map(({ id, name }) => ({
        key: id,
        value: name,
      }));
    },
  },
  methods: {
    ...mapActions(useAppOptionsStore, ["fetchTournamentSystems"]),
    filterOptions(input: string): void {
      this.filteredTournamentSystems = this.tournamentSystems.filter(
        ({ name }) => name.toLowerCase().includes(input.toLowerCase())
      );
    },
    loadInitialSelectedOptions(): void {
      this.selectedOptions = this.tournamentSystems
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
      const selectedTournamentSystems = value.map(({ key }) => ({ id: key }));
      this.$emit("update:modelValue", selectedTournamentSystems);
    },
  },
  async mounted(): Promise<void> {
    await this.fetchTournamentSystems();
    this.filteredTournamentSystems = this.tournamentSystems;
    this.loadInitialSelectedOptions();
  },
});
</script>
