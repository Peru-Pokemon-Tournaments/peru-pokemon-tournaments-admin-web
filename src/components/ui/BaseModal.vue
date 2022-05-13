<template>
  <teleport to="body">
    <div v-if="open" id="backdrop" @click="$emit('close')"></div>
    <transition name="modal">
      <dialog open v-if="open" :class="classStyles">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
            <base-icon
              type="fas"
              icon="times"
              class="times"
              @click="$emit('close')"
            />
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="footered">
          <slot name="actions"> </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["close"],
  props: {
    title: {
      type: String as PropType<string>,
      required: false,
    },
    open: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    type: {
      type: String as PropType<string>,
      required: false,
      default: "medium",
      validator: (val: string): boolean => {
        const values = ["tiny", "small", "medium", "large"];
        return values.indexOf(val) !== -1;
      },
    },
    footered: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
  computed: {
    classStyles(): object {
      return {
        [this.type]: !!this.type,
      };
    },
  },
});
</script>
<style lang="scss" scoped>
$top-modal: 2rem;
$bottom-modal: 2rem;

#backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  @include low-shadow;
  position: fixed;
  top: $top-modal;
  width: 80%;
  max-height: calc(100vh - #{$top-modal} - #{$bottom-modal});
  z-index: 100;
  border-radius: 2px;
  border: none;
  padding: 1rem;
  margin: 0 auto;
  overflow-y: auto;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .times {
    color: $app-danger-color;
    cursor: pointer;
    font-size: 1rem;
  }
}

menu {
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}

.modal-leave-active {
  animation: modal 0.3s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.tiny {
  max-width: 300px;
}

.small {
  max-width: 576px;
}

.medium {
  max-width: 768px;
}

.large {
  max-width: 1200px;
}
</style>
