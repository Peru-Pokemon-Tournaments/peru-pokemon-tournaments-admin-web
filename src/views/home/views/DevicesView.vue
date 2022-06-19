<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Dispositivos</h1>
        </div>
        <base-button
          type="button"
          color="success"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
          @click="toggleCreateModal"
        >
          Nuevo Dispositivo
        </base-button>
      </div>
    </template>
  </base-card>
  <base-card>
    <devices-table />
  </base-card>
  <base-modal
    title="Nuevo Dispositivo"
    type="tiny"
    :open="isCreateModalOpen"
    @close="toggleCreateModal"
  >
    <create-or-edit-device-form @after-submit="closeModal" />
  </base-modal>
</template>
<script lang="ts">
import DevicesTable from "@/components/app/devices/tables/DevicesTable.vue";
import CreateOrEditDeviceForm from "@/components/app/devices/forms/CreateOrEditDeviceForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    DevicesTable,
    CreateOrEditDeviceForm,
  },
  data() {
    return {
      isCreateModalOpen: false,
    };
  },
  methods: {
    toggleCreateModal() {
      this.isCreateModalOpen = !this.isCreateModalOpen;
    },
    closeModal(): void {
      this.toggleCreateModal();
    },
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
