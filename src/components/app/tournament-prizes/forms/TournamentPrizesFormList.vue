<template>
  <div class="row">
    <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
      <label>Título</label>
      <base-input v-model="title" />
    </div>
    <div class="form-group col-12 col-sm-12 col-md-9 col-lg-10">
      <label>Descripción</label>
      <base-textarea v-model="description" />
    </div>
    <div class="form-group col-12 col-sm-12 col-md-3 col-lg-2">
      <base-button type="button" @click="addPrize" block :disabled="!canAdd">
        Agregar
      </base-button>
    </div>
  </div>
  <ul class="prizes-list">
    <li v-for="(prize, index) in modelValue" :key="prize.title">
      <base-chip @click-remove="removePrize(index)">
        {{ prize.title }}: {{ prize.description }}
      </base-chip>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<
        {
          id?: string;
          title: string;
          description: string;
        }[]
      >,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      title: "",
      description: "",
    };
  },
  computed: {
    canAdd(): boolean {
      return this.title.trim() !== "" && this.description.trim() !== "";
    },
  },
  methods: {
    addPrize(): void {
      const newPrize = {
        title: this.title,
        description: this.description,
      };
      this.$emit("update:modelValue", [...this.modelValue, newPrize]);
      //this.prizes.push(newPrize);
    },
    removePrize(index: number): void {
      const prizes = [...this.modelValue];
      prizes.splice(index, 1);
      this.$emit("update:modelValue", prizes);
    },
  },
});
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;

.prizes-list > li {
  display: inline-block;
}
</style>
