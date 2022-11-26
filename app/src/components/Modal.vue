<template lang="pug">
.modal(v-if="show")
  .modal__content
    .modal__content-close(@click="$emit('close')")
      img(:src="icons.closeIcon")
    .modal__body
      h4(v-if="title") {{title}}
      .modal__slot(v-if="$slots.default")
        slot
    .modal__footer 
      Button(
        :label="$t('modal.btn_cancel')"
        transparent
        :buttonStyle="{marginRight: '10px'}"
        @click="$emit('close')"
      )
      Button(
        :label="$t('modal.btn_confirm')"
        @click="$emit('confirm')"
      )
</template>

<script>
import Button from "@/components/Button";
import closeIcon from "@/assets/images/close.png";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
  },
  components: {
    Button,
  },
  computed: {
    icons() {
      return {
        closeIcon,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    position: relative;
    width: 500px;
    padding: 20px;
    background: #fff;

    &-close {
      padding: 5px;
      width: 25px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;

      img {
        width: 100%;
      }
    }

    h4 {
      margin-bottom: 20px;
    }
  }

  &__body {
    margin-bottom: 20px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
