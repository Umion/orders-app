<template lang="pug">
.button(
  :class="{transparent}"
  :style="{...buttonStyle}"
  @click="$emit('click')"
  ) {{label}}

</template>

<script>
export default {
  emits: ["click"],
  props: {
    label: {
      type: String,
    },
    buttonStyle: {
      type: Object,
    },
    transparent: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  padding: 6px 30px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 3px;
  border: 2px solid transparent;
  background: #e26a6a;
  color: #fff;
  cursor: pointer;

  &.transparent {
    border: 2px solid #ccc;
    background: transparent;
    color: #ccc;
  }
}
</style>
