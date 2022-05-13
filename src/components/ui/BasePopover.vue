<template>
  <div class="popover" v-show="open" :style="popoverStyles" ref="popover">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

const TARGET_CLASS_NAME = "popover-target";
export default defineComponent({
  emits: ["click-outside"],
  props: {
    open: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    targetDataId: {
      type: String as PropType<string>,
      required: true,
    },
    location: {
      type: String as PropType<string>,
      default: "bottom",
      validator: (val: string): boolean => {
        const locations = ["top", "bottom", "right", "left"];
        return locations.indexOf(val) !== -1;
      },
    },
    noPadding: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  data() {
    return {
      top: null as number | null,
      left: null as number | null,
      right: null as number | null,
      bottom: null as number | null,
    };
  },
  computed: {
    popoverStyles(): object {
      return {
        ...(this.top && {
          top: `${this.top}px`,
        }),
        ...(this.left && {
          left: `${this.left}px`,
        }),
        ...(this.right && {
          right: `${this.right}px`,
        }),
        ...(this.bottom && {
          bottom: `${this.bottom}px`,
        }),
        ...(this.noPadding && {
          padding: 0,
        }),
      };
    },
  },
  methods: {
    getTargetElement(): Element | null {
      return document.querySelector(
        `.${TARGET_CLASS_NAME}[data-id="${this.targetDataId}"]`
      );
    },
    existsTargetElement(): boolean {
      return !!this.getTargetElement();
    },
    setLocationFromTargetElement(): void {
      if (!this.existsTargetElement()) {
        return console.warn("Target element does not exists");
      }
      this.setBoundaries();
    },
    setBoundaries(): void {
      const targetBCRect = this.getTargetElement()!.getBoundingClientRect();
      const documentHeight = document.documentElement.clientHeight;
      const documentWidth = document.documentElement.clientWidth;

      switch (this.location) {
        case "top":
          this.bottom =
            documentHeight - targetBCRect.bottom + targetBCRect.height;
          this.left = targetBCRect.left;
          break;
        case "bottom":
          this.top = targetBCRect.top + targetBCRect.height;
          this.left = targetBCRect.left;
          break;
        case "right":
          this.top = targetBCRect.top;
          this.left = targetBCRect.left + targetBCRect.width;
          break;
        case "left":
          this.top = targetBCRect.top;
          this.right = documentWidth - targetBCRect.right + targetBCRect.width;
          break;
      }
    },
    handleClickOutside(event: MouseEvent): void {
      if (
        this.open &&
        event.target !== this.getTargetElement() &&
        !(this.$refs["popover"] as HTMLElement).contains(event.target as Node)
      ) {
        this.$emit("click-outside");
      }
    },
  },
  created(): void {
    window.addEventListener("resize", this.setLocationFromTargetElement);
    window.addEventListener("scroll", this.setLocationFromTargetElement);
    window.addEventListener("click", this.handleClickOutside);
  },
  mounted(): void {
    this.$nextTick(() => {
      this.setLocationFromTargetElement();
    });
  },
  unmounted(): void {
    window.removeEventListener("resize", this.setLocationFromTargetElement);
    window.removeEventListener("scroll", this.setLocationFromTargetElement);
    window.removeEventListener("click", this.handleClickOutside);
  },
});
</script>
<style lang="scss" scoped>
$popover-width: 10rem;

.popover {
  @include low-shadow;
  position: fixed;
  z-index: 99;
  background-color: white;
  padding: 1rem;
  width: $popover-width;
}
</style>
