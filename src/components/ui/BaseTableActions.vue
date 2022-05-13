<template>
  <ul>
    <li v-for="action in actions" :key="action.name">
      <a
        :href="action.key.toLowerCase()"
        @click.prevent="selectAction(action.key)"
      >
        <span>{{ action.name }}</span>
        <base-icon :icon="action.icon.name" :type="action.icon.type" />
      </a>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["selectAction"],
  props: {
    actions: {
      type: Array as PropType<
        {
          name: string;
          key: string;
          icon: { name: string; type: string };
        }[]
      >,
      required: true,
    },
  },
  methods: {
    selectAction(actionKey: string) {
      this.$emit("selectAction", actionKey);
    },
  },
});
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  display: block;

  a {
    padding: 0.5rem 1rem;
    color: $app-primary-font-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;

    span {
      white-space: initial;
      text-align: start;
      margin-left: 5px;
    }

    &:hover {
      background-color: $app-primary-color;
      color: $app-secondary-font-color;
    }
  }
}
</style>
