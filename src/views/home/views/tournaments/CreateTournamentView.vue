<template>
  <create-or-edit-tournament-form />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CreateOrEditTournamentForm from "@/components/app/tournaments/forms/CreateOrEditTournamentForm.vue";

export default defineComponent({
  components: {
    CreateOrEditTournamentForm,
  },
});
</script>
