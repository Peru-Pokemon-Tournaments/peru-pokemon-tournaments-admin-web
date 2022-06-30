<template>
  <multiple-finder-input
    @input="filterOptions"
    v-model="selectedOptions"
    :options="tournamentRuleOptions"
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
      filteredTournamentRules: [] as { id: string; name: string }[],
    };
  },
  computed: {
    ...mapState(useAppOptionsStore, ["tournamentRules"]),
    tournamentRuleOptions(): { key: string; value: string }[] {
      return this.filteredTournamentRules.map(({ id, name }) => ({
        key: id,
        value: name,
      }));
    },
  },
  methods: {
    ...mapActions(useAppOptionsStore, ["fetchTournamentRules"]),
    filterOptions(input: string): void {
      this.filteredTournamentRules = this.tournamentRules.filter(({ name }) =>
        name.toLowerCase().includes(input.toLowerCase())
      );
    },
    loadInitialSelectedOptions(): void {
      this.selectedOptions = this.tournamentRules
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
      const selectedTournamentRules = value.map(({ key }) => ({ id: key }));
      this.$emit("update:modelValue", selectedTournamentRules);
    },
  },
  async mounted(): Promise<void> {
    await this.fetchTournamentRules();
    this.filteredTournamentRules = this.tournamentRules;
    this.loadInitialSelectedOptions();
  },
});
</script>
