<template>
  <create-or-edit-tournament-form :currentId="tournamentId" />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import CreateOrEditTournamentForm from "@/components/app/tournaments/forms/CreateOrEditTournamentForm.vue";

export default defineComponent({
  props: {
    tournamentId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    CreateOrEditTournamentForm,
  },
});
</script>
