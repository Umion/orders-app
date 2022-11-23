<template lang="pug">
.toast(v-if="show")
  img.toast__icon(:src="icons(type)")
  p.toast__title(v-if="title" :class="toastType") {{ title }}
</template>

<script>
import CloseIcon from "@/assets/images/toast_close.svg";
import WarningIcon from "@/assets/images/toast_warning.svg";
import SuccessIcon from "@/assets/images/toast_success.svg";

export default {
  props: {
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      color: null,
    };
  },
  computed: {
    toastType() {
      return this.type;
    },
  },
  methods: {
    icons(type) {
      const icon = {
        success: SuccessIcon,
        info: WarningIcon,
        close: CloseIcon,
      };
      return icon[type];
    },
  },
};
</script>

<style lang="scss">
.toast {
  position: fixed;
  right: 10px;
  top: 10px;
  width: 300px;
  padding: 10px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 8px 24px rgba(183, 184, 185, 0.2);
  z-index: 9999;
  display: flex;
  align-items: center;

  &__icon {
    width: 30px;
    margin-right: 10px;
  }

  &__title {
    flex-grow: 1;
    font-size: 13px;

    &.warning {
      color: #ed7575;
    }

    &.success {
      color: #0fb57c;
    }
  }
}
</style>
