<template>
  <div class="center" v-if="isLoadingPeople">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Nombres</base-cell>
      <base-cell tag="th">Apellidos</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(person, index) in paginatedPeople"
        :key="person.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          {{ person.firstName }}
        </base-cell>
        <base-cell tag="td">
          {{ person.lastName }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${person.id}-people-actions`"
            :data-id="`${person.id}-people-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedPerson.id === person.id"
            :target-data-id="`${person.id}-people-actions`"
            @click-outside="closePopover"
            location="left"
            no-padding
          >
            <base-table-actions
              :actions="tableActions"
              @select-action="onSelectAction"
            />
          </base-popover>
        </base-cell>
      </tr>
    </template>
  </base-table>
  <base-pagination
    v-if="!isLoadingPeople"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadPeople"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { Person } from "@/models/person.model";
import { usePeopleStore } from "@/stores/people";

export default defineComponent({
  data() {
    return {
      selectedPerson: null as Person | null,
      isPopoverOpen: false,
      isDeleteIngredientModalOpen: false,
      tableActions: [
        {
          key: "people/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "people/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(usePeopleStore, [
      "paginatedPeople",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingPeople",
    ]),
  },
  methods: {
    ...mapActions(usePeopleStore, ["fetchPeople"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadPeople(pageNumber: number): void {
      this.fetchPeople(pageNumber);
    },
    setSelectedPerson(person?: Person): void {
      if (person) {
        this.selectedPerson = person;
      }
    },
    clearSelectedPerson(): void {
      this.selectedPerson = null;
    },
    openPopover(index: number): void {
      const person = this.paginatedPeople[index];
      this.setSelectedPerson(person);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedPerson();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "person/edit":
          // TODO: Handler edit
          break;
        case "person/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
  },
  mounted(): void {
    this.fetchPeople();
  },
});
</script>
<style lang="scss" scoped>
.striped-row {
  background-color: $app-striped-row-color;
  color: $app-striped-row-font-color;
}

th {
  padding: 10px;
}
</style>
