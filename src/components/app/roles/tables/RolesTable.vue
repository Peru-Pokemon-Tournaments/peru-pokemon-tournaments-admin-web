<template>
  <div class="center" v-if="isLoadingRoles">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(role, index) in paginatedRoles"
        :key="role.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ role.name }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${role.id}-roles-actions`"
            :data-id="`${role.id}-roles-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedRole.id === role.id"
            :target-data-id="`${role.id}-roles-actions`"
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
    v-if="!isLoadingRoles"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadRoles"
  />
  <base-modal
    title="Editar Rol"
    type="tiny"
    :open="isEditModalOpen"
    @close="isEditModalOpen = false"
  >
    <create-or-edit-role-form
      :current-id="currentId"
      @after-submit="toggleEditModal"
    />
  </base-modal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { Role } from "@/models/role.model";
import { useRolesStore } from "@/stores/roles";
import CreateOrEditRoleForm from "../forms/CreateOrEditRoleForm.vue";

export default defineComponent({
  components: {
    CreateOrEditRoleForm,
  },
  data() {
    return {
      selectedRole: null as Role | null,
      isPopoverOpen: false,
      isEditModalOpen: false,
      tableActions: [
        {
          key: "roles/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "roles/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useRolesStore, [
      "paginatedRoles",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingRoles",
      "rolesHasChanged",
    ]),
    currentId(): string | null {
      if (this.selectedRole && this.isEditModalOpen) {
        return this.selectedRole.id;
      }

      return null;
    },
  },
  methods: {
    ...mapActions(useRolesStore, ["fetchRoles"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadRoles(pageNumber: number): void {
      this.fetchRoles(pageNumber);
    },
    setSelectedRole(role?: Role): void {
      if (role) {
        this.selectedRole = role;
      }
    },
    clearSelectedRole(): void {
      this.selectedRole = null;
    },
    openPopover(index: number): void {
      const role = this.paginatedRoles[index];
      this.setSelectedRole(role);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedRole();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "roles/edit":
          this.toggleEditModal();
          break;
        case "roles/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
    toggleEditModal(): void {
      this.isEditModalOpen = !this.isEditModalOpen;
    },
  },
  watch: {
    rolesHasChanged(changed: boolean): void {
      if (changed) {
        this.fetchRoles();
      }
    },
  },
  mounted(): void {
    this.fetchRoles();
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
