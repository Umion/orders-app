<template lang="pug">
input.input(
  :style="{...inputStyle}"
  :value="value"
  :placeholder="placeholder"
  @input="$emit('update', $event.target.value)"
)
</template>
<script>
export default {
  props: {
    inputStyle: {
      type: Object,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.4rem 0.2rem;
  font-size: 0.8rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;

  &:focus {
    outline: 0;
  }
}
</style>
