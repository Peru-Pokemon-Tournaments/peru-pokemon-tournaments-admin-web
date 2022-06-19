<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nombre</label>
        <base-input
          v-model="roleDTO.name"
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
import { useRolesStore } from "@/stores/roles";
import { mapActions, mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { CreateOrEditRoleDTO } from "./interfaces/CreateOrEditRoleDTO";

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
      roleDTO: {
        name: "" as string,
      } as CreateOrEditRoleDTO,
      isSubmitted: false,
    };
  },
  computed: {
    ...mapState(useRolesStore, [
      "selectedRole",
      "isCreateRoleLoading",
      "isGetSelectedRoleLoading",
      "isUpdateSelectedRoleLoading",
    ]),
    isLoading(): boolean {
      return (
        this.isCreateRoleLoading ||
        this.isGetSelectedRoleLoading ||
        this.isUpdateSelectedRoleLoading
      );
    },
    isValidName(): boolean {
      if (this.isSubmitted) {
        return this.roleDTO.name !== "";
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
      return this.isEditing ? "Modificar Rol" : "Crear Rol";
    },
  },
  methods: {
    ...mapActions(useRolesStore, [
      "createRole",
      "selectRole",
      "updateSelectedRole",
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
          data: { ...this.roleDTO },
        });
      } else {
        await this.updateSelectedRole({ name: this.roleDTO.name });
      }
    },
    async handleCreate(): Promise<void> {
      if (this.noHandleSubmit) {
        this.$emit("submit-create", {
          data: { ...this.roleDTO },
        });
      } else {
        await this.createRole({ name: this.roleDTO.name });
      }
    },
  },
  watch: {
    selectedRole(): void {
      if (this.selectedRole) {
        this.roleDTO.name = this.selectedRole.name;
      }
    },
  },
  mounted(): void {
    if (this.isEditing) {
      this.selectRole(this.currentId as string);
    }
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
