<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Juegos</h1>
        </div>
        <base-button
          type="button"
          color="success"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Juego
        </base-button>
      </div>
    </template>
  </base-card>
  <base-card>
    <games-table />
  </base-card>
</template>
<script lang="ts">
import GamesTable from "@/components/app/games/tables/GamesTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    GamesTable,
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
h1 {
  font-size: 1.5rem;
  font-weight: 300;
}
</style>
