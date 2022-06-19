<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nombre</label>
        <base-input
          v-model="deviceDTO.name"
          :is-valid="isValidName"
          :disabled="isLoading"
        />
      </div>
    </div>
    <div class="flex-end">
      <base-button
        type="submit"
        :color="submitButtonColor"
        :disabled="isLoading"
      >
        {{ submitButtonText }}
      </base-button>
    </div>
  </form>
</template>
<script lang="ts">
import { useDevicesStore } from "@/stores/devices";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { CreateOrEditDeviceDTO } from "./interfaces/CreateOrEditDeviceDTO";

export default defineComponent({
  emits: ["submit-create", "submit-edit", "after-submit"],
  props: {
    currentId: {
      type: String as PropType<string | null>,
    },
    noHandleSubmit: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  data() {
    return {
      deviceDTO: {
        name: "" as string,
      } as CreateOrEditDeviceDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useDevicesStore, [
      "selectedDevice",
      "isCreateDeviceLoading",
      "isGetSelectedDeviceLoading",
      "isUpdateSelectedDeviceLoading",
    ]),
    isLoading(): boolean {
      return (
        this.isCreateDeviceLoading ||
        this.isGetSelectedDeviceLoading ||
        this.isUpdateSelectedDeviceLoading
      );
    },
    isValidName(): boolean {
      if (this.isSubmitted) {
        return this.deviceDTO.name !== "";
      }
      return true;
    },
    isValidForm(): boolean {
      return this.isValidName;
    },
    isEditing(): boolean {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "string"
      );
    },
    submitButtonColor(): string {
      return this.isEditing ? "success" : "primary";
    },
    submitButtonText(): string {
      return this.isEditing ? "Modificar Dispositivo" : "Crear Dispositivo";
    },
  },
  methods: {
    ...mapActions(useDevicesStore, [
      "createDevice",
      "selectDevice",
      "updateSelectedDevice",
    ]),
    async submitForm(): Promise<void> {
      this.isSubmitted = true;

      if (!this.isValidForm) {
        return;
      }

      if (this.isEditing) {
        await this.handleUpdate();
      } else {
        await this.handleCreate();
      }
      this.$emit("after-submit");
    },
    async handleUpdate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-edit", {
          id: this.currentId,
          data: { ...this.deviceDTO },
        });
      } else {
        await this.updateSelectedDevice({ name: this.deviceDTO.name });
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.deviceDTO },
        });
      } else {
        await this.createDevice({ name: this.deviceDTO.name });
      }
    },
  },
  watch: {
    selectedDevice(): void {
      if (this.selectedDevice) {
        this.deviceDTO.name = this.selectedDevice.name;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectDevice(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
