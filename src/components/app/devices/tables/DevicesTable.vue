<template>
  <div class="center" v-if="isLoadingDevices">Cargando...</div>
  <base-table v-else>
    <template #head>
      <base-cell tag="th">Nº</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(device, index) in paginatedDevices"
        :key="device.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ orderNumber(index) }}
        </base-cell>
        <base-cell tag="td">
          {{ device.name }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${device.id}-devices-actions`"
            :data-id="`${device.id}-devices-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedDevice.id === device.id"
            :target-data-id="`${device.id}-devices-actions`"
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
    v-if="!isLoadingDevices"
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="loadDevices"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { Device } from "@/models/device.model";
import { useDevicesStore } from "@/stores/devices";

export default defineComponent({
  data() {
    return {
      selectedDevice: null as Device | null,
      isPopoverOpen: false,
      tableActions: [
        {
          key: "devices/edit",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
        },
        {
          key: "devices/delete",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
        },
      ],
    };
  },
  computed: {
    ...mapState(useDevicesStore, [
      "paginatedDevices",
      "totalPages",
      "currentPage",
      "perPage",
      "isLoadingDevices",
    ]),
  },
  methods: {
    ...mapActions(useDevicesStore, ["fetchDevices"]),
    orderNumber(index: number): number {
      return index + 1 + this.perPage * (this.currentPage - 1);
    },
    loadDevices(pageNumber: number): void {
      this.fetchDevices(pageNumber);
    },
    setSelectedDevice(device?: Device): void {
      if (device) {
        this.selectedDevice = device;
      }
    },
    clearSelectedDevice(): void {
      this.selectedDevice = null;
    },
    openPopover(index: number): void {
      const device = this.paginatedDevices[index];
      this.setSelectedDevice(device);
      this.isPopoverOpen = true;
    },
    closePopover(): void {
      this.clearSelectedDevice();
      this.isPopoverOpen = false;
    },
    onSelectAction(actionKey: string): void {
      switch (actionKey) {
        case "device/edit":
          // TODO: Handler edit
          break;
        case "device/delete":
          // TODO: Handler delete
          break;
      }
      this.isPopoverOpen = false;
    },
  },
  mounted(): void {
    this.fetchDevices();
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
